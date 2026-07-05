# SupaGravity

An AI-powered, real-time collaborative code editor built for seamless multi-user coding sessions.

> 🚧 **Status: Under active development.** Core real-time editing is functional. AI features are currently being implemented. More details, setup instructions, and documentation will be added as development progresses.

---

## ✨ Overview

SupaGravity aims to bring together real-time collaboration and AI assistance into a single lightweight code editor — think of it as a self-hosted, AI-enhanced alternative to tools like CodeSandbox Live Share or VS Code Live Share.

Multiple users will be able to join the same session, edit code together in real time, and (soon) get AI-powered suggestions, explanations, and code assistance directly inside the editor.

---

## 🧱 Tech Stack

| Layer            | Technology                                     |
|------------------|-------------------------------------------------|
| Editor           | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| Real-time Sync   | [Yjs](https://docs.yjs.dev/)                    |
| Frontend         | React + Vite                                    |
| Backend          | Express (Node.js)                               |
| Containerization | Docker                                          |
| AI Layer         | 🚧 In progress                                   |

---

## 📂 Project Structure

SupaGravity/
├── backend/
│   ├── public/                  # Built frontend served by Express (static assets)
│   │   ├── assets/
│   │   │   ├── index-*.js
│   │   │   └── index-*.css
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── index.html
│   ├── server.js                 # Express server + Yjs sync/WebSocket logic
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.jsx            # Root React component (Monaco + Yjs editor UI)
│   │   │   └── App.css
│   │   └── main.jsx                # React app entry point
│   ├── vite.config.js               # Vite bundler config
│   ├── eslint.config.js
│   ├── package.json
│   └── .gitignore
│
├── dockerfile                       # Docker build configuration
├── .dockerignore
└── README.md
> `backend/public/` currently holds the production-built frontend bundle served statically by Express. As the project grows, this may be replaced by a proper reverse-proxy/dev-server setup.

---

## 🚀 Features

### ✅ Implemented
- Real-time collaborative editing using **Yjs** as the CRDT sync engine
- **Monaco Editor** integration for a VS Code-like editing experience
- **Express** backend to handle sync/WebSocket connections
- **React + Vite** frontend
- **Dockerized** setup for consistent local development

### 🔜 Planned
- AI-powered code assistance (in progress)
- Multi-room / multi-session support
- User presence & cursor tracking
- Authentication & session persistence
- Syntax-aware AI suggestions and code explanations

---

## 🛠️ Getting Started

> Full setup instructions will be added once the backend and frontend are stable enough for external use.

### Prerequisites
- Node.js
- Docker

### Run with Docker

````bash
# Clone the repo
git clone https://github.com/Rustam-xx7/SupaGravity.git
cd SupaGravity

# Build and run with Docker
docker build -t supagravity .
docker run -p 3000:3000 supagravity
````

### Run Locally (Dev Mode)

````bash
# Backend
cd backend
npm install
node server.js

# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev
````

> Detailed environment variable configuration and dev workflow docs will be added soon.

---

## 🗺️ Roadmap

* [x] Real-time sync with Yjs
* [x] Monaco editor integration
* [x] Express backend
* [x] React + Vite frontend
* [x] Dockerize the project
* [ ] AI integration (in progress)
* [ ] Multi-user presence indicators
* [ ] Persistent storage for documents
* [ ] Authentication system
* [ ] Deployment guide

---

## 🤝 Contributing

This project is in early development and evolving rapidly. Contribution guidelines will be added once the core architecture stabilizes.

---

## 📄 License

License to be added.

---

## 📬 Contact

Maintained by [Rustam-xx7](https://github.com/Rustam-xx7). Feel free to open an issue for questions, suggestions, or bugs.

````

Let me know once the AI module is further along and I can update the Features/Tech Stack sections to reflect it.
````