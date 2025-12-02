<div align="center">

  <img src="frontend/public/image.svg" alt="MyTute AI Logo" width="120" height="120" />

# MyTute AI

**Your Personal Contextual Learning Assistant**

  <p>
    Upload PDFs, lecture notes, and YouTube videos. <br />
    Get instant answers, summaries, and quizzes tailored to your curriculum.
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#api-reference">API Reference</a>
  </p>

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

</div>

---

## 📸 Screenshot

<div align="center">
  <!-- Replace this with your actual screenshot path or URL -->
  <img src="https://mytute.dsasnippets.xyz/Screenshot1.png" alt="MyTute Dashboard" width="800" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
</div>

---

## 🚀 Features

- **📚 Document Analysis:** Upload PDFs (textbooks, notes) and chat with them instantly.
- **📺 YouTube Integration:** Paste a video URL; the AI fetches the transcript and lets you query the video content.
- **🧠 Contextual RAG:** Uses Retrieval-Augmented Generation to provide answers cited directly from your materials.
- **🔐 Secure Authentication:** Powered by **Clerk** for seamless sign-in and session management.
- **⚡ Ephemeral Sessions:** User data is stored in isolated **Qdrant** collections and cleared automatically upon session end.
- **🎨 Modern UI:** Built with React, Tailwind CSS, and Framer Motion for a smooth, responsive experience.

---

## 🛠 Tech Stack

<table align="center">
  <tr>
    <td align="center" width="33%"><strong>Frontend</strong></td>
    <td align="center" width="33%"><strong>Backend</strong></td>
    <td align="center" width="33%"><strong>AI & Database</strong></td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /><br>
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /><br>
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" /><br>
      <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /><br>
      <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express" /><br>
      <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" /><br>
      <img src="https://img.shields.io/badge/Multer-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Multer" />
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" /><br>
      <img src="https://img.shields.io/badge/Qdrant-D50000?style=for-the-badge&logo=qdrant&logoColor=white" alt="Qdrant" /><br>
      <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    </td>
  </tr>
</table>

---

## 🏗 Architecture

1.  **Ingestion:** User uploads a PDF or YouTube Link.
2.  **Processing:** Backend splits text into chunks using `RecursiveCharacterTextSplitter`.
3.  **Embedding:** Chunks are converted to vectors using `text-embedding-3-large`.
4.  **Storage:** Vectors are stored in a **User-Specific Collection** in Qdrant (`MyTute-RAG-{userId}`).
5.  **Retrieval:** User asks a question -> System searches Qdrant for relevant chunks.
6.  **Generation:** Context + Question is sent to GPT-4o/Gemini for the final answer.

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (for Qdrant)
- OpenAI API Key
- Clerk Account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mytute.git
cd mytute
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the [`backend`](backend) folder:

```env
PORT=3000
OPENAI_API_KEY=sk-proj-...
QDRANT_URL=http://localhost:6333
# Optional: Redis URL if using queues
REDIS_URL=redis://localhost:6379
```

Start Qdrant (Vector DB):

```bash
docker run -p 6333:6333 qdrant/qdrant
```

Run the server:

```bash
npm run dev
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the [`frontend`](frontend) folder:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BACKEND_URL=http://localhost:3000
```

Run the client:

```bash
npm run dev
```

---

## 🔌 API Reference

| Method   | Endpoint        | Description                                    |
| :------- | :-------------- | :--------------------------------------------- |
| `POST`   | `/upload/pdf`   | Uploads and embeds a PDF file.                 |
| `POST`   | `/yt`           | Fetches transcript and embeds a YouTube video. |
| `POST`   | `/chat`         | Sends a query and retrieves a RAG response.    |
| `DELETE` | `/delete-embed` | Clears the current user's vector collection.   |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/karanchoudhary">Karan Choudhary</a></p>
</div>
