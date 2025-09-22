# CodeCraftAI 🧑‍💻⚡

**CodeCraftAI** is an **AI-powered application builder** that uses **LangChain, LangGraph, and Groq LLMs** to plan, architect, and generate code for applications.  
It’s designed to streamline the process of going from **idea → design → code** inside VS Code or terminal.

---

## 🚀 Features

- **AI Planning Agent** → Converts user prompts into structured project plans  
- **AI Architect Agent** → Breaks plans into task-level implementation steps  
- **AI Coder Agent** → Uses ReAct-style reasoning with tools (`read_file`, `write_file`, etc.) to generate & refine code  
- **Node Debugger** → Step-by-step terminal outputs for easy debugging  
- **Supports `.env` configuration** → Keeps API keys and configs secure  

---

## 🛠️ Tech Stack

- **Python 3.10+**  
- [LangChain](https://www.langchain.com/)  
- [LangGraph](https://www.langchain.com/langgraph)  
- [Groq LLMs](https://groq.com/) (`ChatGroq`)  
- **VS Code / Terminal Execution**  

---

## 📂 Project Structure

```
CodeCraftAI/
│── agent/             # Core agent logic
│── prompts/           # LLM prompts for planner, architect, coder
│── state/             # Pydantic models and state management
│── tools/             # File I/O and utility tools
│── .env.example       # Example environment config (no secrets)
│── requirements.txt   # Python dependencies
│── graph.py           # Main LangGraph pipeline
```

---

## ⚙️ Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/Vijay8428/CodeCraftAI.git
cd CodeCraftAI
```

2. **Create virtual environment & install dependencies**

```bash
python -m venv .venv
source .venv/bin/activate   # (Linux/Mac)
.venv\Scripts\activate      # (Windows)

pip install -r requirements.txt
```

3. **Setup `.env` file**

```bash
cp .env.example .env
```

Fill in your API keys (Groq, OpenAI, etc.).

---

## ▶️ Usage

Run the agent in terminal:

```bash
python agent/graph.py
```

Example:

```text
User Prompt: "Create a To-Do list app"
```

Output:

- Planner generates project plan  
- Architect breaks into tasks  
- Coder writes code step-by-step with debug logs  

---

## 📊 Example Terminal Output

```
============================================================
🔹 Step 1: Executing Node [Planner Agent]
============================================================
🟦 Current State:
{ "user_prompt": "create a to do list" }

🟩 Node Output:
{ "plan": { ... } }
============================================================
```

---

## 🌟 Roadmap

- [ ] Add UI with **Streamlit** for non-technical users  
- [ ] Add multi-agent collaboration for frontend/backend separation  
- [ ] Extend toolset (Git, API testing, DB connectors)  
- [ ] Deploy apps directly from agent workflow  

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Add feature"`)  
4. Push branch (`git push origin feature-name`)  
5. Open Pull Request 🚀  

---

## 📜 License

MIT License © 2025 [Vijay Kumar](https://github.com/Vijay8428)
