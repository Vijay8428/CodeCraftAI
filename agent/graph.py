from langchain_groq import ChatGroq
from langchain.globals import set_verbose, set_debug
from state import *
from prompts import *
from tools import *
from dotenv import load_dotenv
import json
from pydantic.json import pydantic_encoder
from langgraph.graph import StateGraph,END
from langgraph.checkpoint.memory  import MemorySaver
from langgraph.prebuilt import create_react_agent

load_dotenv()

set_debug(True)
set_verbose(True)

llm = ChatGroq(model='openai/gpt-oss-120b')

def planner_agent(state: dict)->dict:
    user_prompt = state["user_prompt"]
    res =llm.with_structured_output(plan).invoke(planner_prompt(user_prompt))
    if res is None:
        raise ValueError("Planner did not return a valid response")
    return {"plan": res}

def architect_agent(state: dict)-> dict:
    plan = state["plan"]
    res = llm.with_structured_output(TaskPlan).invoke(architect_prompt(plan))
    if res is None:
        raise ValueError("Architect did not return a valid response")
    return {"task_plan": res}

def coder_agent(state: dict) -> dict:
    """LangGraph tool-using coder agent."""
    coder_state: CoderState = state.get("coder_state")
    if coder_state is None:
        coder_state = CoderState(task_plan=state["task_plan"], current_step_idx=0)

    steps = coder_state.task_plan.implementation_steps
    if coder_state.current_step_idx >= len(steps):
        return {"coder_state": coder_state, "status": "DONE"}

    current_task = steps[coder_state.current_step_idx]
    existing_content = read_file.run(current_task.filepath)

    system_prompt = coder_system_prompt()
    user_prompt = (
        f"Task: {current_task.task_description}\n"
        f"File: {current_task.filepath}\n"
        f"Existing content:\n{existing_content}\n"
        "Use write_file(path, content) to save your changes."
    )

    coder_tools = [read_file, write_file, list_files, get_current_directory]
    react_agent = create_react_agent(llm, coder_tools)

    react_agent.invoke({"messages": [{"role": "system", "content": system_prompt},
                                     {"role": "user", "content": user_prompt}]})

    coder_state.current_step_idx += 1
    return {"coder_state": coder_state}


class NodeDebugger:
    def __init__(self):
        self.step = 0

    def wrap(self, name, fn):
        """Wrap any node function with structured debug prints."""
        def wrapper(state):
            self.step += 1
            print("\n" + "=" * 60)
            print(f"🔹 Step {self.step}: Executing Node [{name}]")
            print("=" * 60)
            print("🟦 Current State:")
            print(json.dumps(state, indent=4, default=pydantic_encoder))
            output = fn(state)
            print("\n🟩 Node Output:")
            print(json.dumps(output, indent=4, default=pydantic_encoder))
            print("=" * 60)
            return output
        return wrapper


def build_graph():
    debugger = NodeDebugger()

    # Build graph
    graph = StateGraph(dict)
    graph.add_node("Planner",debugger.wrap("Planner Agent", planner_agent))
    graph.add_node("Architect",debugger.wrap("Architect Agent",architect_agent))
    graph.add_node("Coder",debugger.wrap("Coder Agent",coder_agent))
    graph.add_edge("Planner","Architect")
    graph.add_edge("Architect","Coder")
    graph.add_conditional_edges("Coder", lambda s: "END" if s.get("status") == "DONE" else "Coder",
    {"END": END, "Coder": "Coder"} )

    graph.set_entry_point("Planner")


    return graph.compile()
    
    
    
user_prompt = "create a tic tac toe"

if __name__ == "__main__":
    agent = build_graph()
    res = agent.invoke({"user_prompt":user_prompt},{"recursion_limit": 100})
    print("\n🎯 FINAL RESULT:")
    print(json.dumps(res, indent=4, default=pydantic_encoder))


# res =llm.with_structured_output(plan).invoke(planner_prompt(user_prompt))

# print(json.dumps(res, indent=4, default=pydantic_encoder))