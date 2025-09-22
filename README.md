# CodeCraftAI 🧑‍💻⚡

**CodeCraftAI** is an AI‑powered application builder that uses **LangChain**, **LangGraph**, and **Groq LLMs** to convert your ideas into working code. It helps you go from prompt → plan → architecture → code, with tools & debugging support.

---

## 📸 Screenshot

Here’s a sample of a generated project output:

![Generated Project Output](<img width="1911" height="969" alt="image" src="https://github.com/user-attachments/assets/35b4e9f8-7743-4058-9b3e-47167348ec05" />
.png)  
> *Replace the above path with your actual screenshot file in the repo.*

---

## 🚀 Features

- **Planning Agent**: Generates structured project plans from user prompts  
- **Architect Agent**: Breaks down those plans into concrete implementation steps  
- **Coder Agent**: Uses ReAct‑style reasoning + tools (`read_file`, `write_file`, etc.) to generate and update files step by step  
- **Node Debugger**: Logs each node’s input & output in clean terminal format for easy tracing  
- **Environment Security**: Uses `.env` files to handle sensitive credentials securely  

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Programming Language | Python 3.10+ |
| Agent / Chain Framework | LangChain, LangGraph |
| Model | Groq (via ChatGroq) |
| Tools | File I/O, directory listing, etc. |
| Local Dev Environment | VS Code / Terminal |

---

## 📂 Project Structure

```
CodeCraftAI/
├── agent/
├── prompts/
├── tools/
├── state/
├── .env.example
├── README.md
├── graph.py
├── requirements.txt
```

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/Vijay8428/CodeCraftAI.git
cd CodeCraftAI

# Create virtual environment
python -m venv .venv
# Activate:
# On Windows:
.\.venv\Scriptsctivate
# On Unix/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup your environment variables
cp .env.example .env
# Edit .env to add your API keys etc.
```

---

## ▶️ Usage

```bash
python graph.py --prompt "create a to do list app"
```

Example workflow:

1. Planner generates a project plan  
2. Architect breaks that into tasks  
3. Coder generates code step by step  

---

## 🧪 Example Terminal Output

```
============================================================
🔹 Step 1: Executing Node [Planner Agent]
============================================================
🟦 Current State:
{
    "user_prompt": "create a to do list"
}

🟩 Node Output:
{
    "plan": {
        "tasks": [
            "Set up project structure",
            "Create UI module",
            "Implement backend logic",
            "Write tests"
        ]
    }
}
============================================================

============================================================
🔹 Step 2: Executing Node [Architect Agent]
============================================================
🟦 Current State:
{
    "user_prompt": "create a to do list",
    "plan": {
        "tasks": [...]
    }
}

🟩 Node Output:
{
    "task_plan": { ... }
}
============================================================
```

---

## 🌟 Roadmap

- Add a web UI so users can input prompts via browser  
- Add support for more tools (database setup, API endpoints, UI frameworks)  
- Add automated tests & CI integration  
- Allow exporting complete project structure ready for deployment  

---

## 🤝 Contributing

1. Fork this repository  
2. Create a new branch: `git checkout -b feature/<name>`  
3. Make changes and commit: `git commit -m "Add <feature>"`  
4. Push: `git push origin feature/<name>`  
5. Open a Pull Request  

---

## 📜 License

MIT License © 2025 Vijay Kumar
