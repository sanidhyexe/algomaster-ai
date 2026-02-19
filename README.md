<div align="center">

# 🚀 AlgoMaster AI

**An AI-Powered Interactive Learning Platform for Mastering Data Structures & Algorithms**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**AlgoMaster AI** is a next-generation educational platform that combines interactive coding, AI-powered tutoring, and comprehensive progress tracking to help developers master Data Structures and Algorithms. Whether you're preparing for FAANG interviews or strengthening your fundamentals, AlgoMaster AI provides an engaging, hands-on learning experience.

### 🎯 Key Highlights

- 🤖 **AI-Powered Assistant** - Get contextual hints and guidance using Gemini 2.5 Flash
- 💻 **Multi-Language Support** - Code in JavaScript, TypeScript, Python, Java, and C++
- 🏃 **In-Browser Execution** - Run code instantly without any backend setup
- 📊 **Progress Analytics** - Track your learning journey with detailed metrics
- 🎓 **Interview Prep** - FAANG-focused problem sets and mock scenarios
- 👥 **Community Features** - Share solutions and learn from peers

---

## ✨ Features

### 1. **Interactive Code Editor**

- Monaco Editor integration with syntax highlighting
- Auto-indentation, bracket matching, and code completion
- Per-language code persistence using localStorage
- Support for 5 programming languages

### 2. **Code Execution Engine**

- **JavaScript/TypeScript**: Sandboxed iframe execution
- **Python**: Pyodide-based WASM interpreter
- Real-time output console with error handling
- No server required - runs entirely in the browser

### 3. **AI Coding Assistant**

- Powered by Google Gemini 2.5 Flash
- Context-aware hints based on your current problem
- Socratic teaching method - guides without spoiling
- Complexity analysis and optimization suggestions

### 4. **Comprehensive DSA Curriculum**

- 10+ algorithm topics (Arrays, Trees, Graphs, DP, etc.)
- 100+ curated problems with difficulty ratings
- Detailed explanations and example test cases
- Language-specific starter templates

### 5. **Learning Analytics Dashboard**

- Problems solved tracker
- Current streak and activity heatmap
- Skill distribution charts (using Recharts)
- Topic-wise progress breakdown

### 6. **Community & Discussion**

- Share solutions and coding approaches
- Like, comment, and follow other learners
- Build your coding reputation

### 7. **FAANG Interview Preparation**

- Company-specific problem banks
- Timed mock interview sessions
- Interview constraint simulations

---

## 🎬 Demo
<img width="1349" height="684" alt="image" src="https://github.com/user-attachments/assets/5b12853e-795b-4f3f-adea-437b103f40d5" />


---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/algomaster-ai.git
   cd algomaster-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

---

## 🛠️ Tech Stack

### Frontend

- **React 19.2** - UI framework
- **TypeScript 5.8** - Type-safe JavaScript
- **Vite 6.2** - Lightning-fast build tool
- **Monaco Editor** - VS Code-powered code editor
- **Recharts** - Data visualization for analytics

### AI & Execution

- **Google Gemini 2.5 Flash** - AI assistant backend
- **Pyodide** - Python WASM runtime
- **Sandboxed iframes** - JavaScript execution

### Storage

- **localStorage** - Client-side data persistence (no backend required)

---

## 📂 Project Structure

```
algomaster-ai/
├── components/           # React components
│   ├── About.tsx
│   ├── Community.tsx
│   ├── Curriculum.tsx
│   ├── FAANGPrep.tsx
│   ├── ProblemSolver.tsx
│   └── Profile.tsx
├── services/
│   └── geminiService.ts  # AI service integration
├── App.tsx               # Main application component
├── types.ts              # TypeScript type definitions
├── constants.ts          # App constants and data
├── index.tsx             # Application entry point
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

---

## 🎮 Usage

### Solving Problems

1. **Browse Curriculum** - Select a topic (Arrays, Trees, etc.)
2. **Choose a Problem** - Pick based on difficulty (Easy/Medium/Hard)
3. **Write Code** - Use the multi-language editor
4. **Run & Test** - Execute your code in the browser
5. **Get AI Help** - Ask the assistant for hints if stuck
6. **Track Progress** - See your stats update in real-time

### Using the AI Assistant

- Click the chat icon while solving a problem
- Ask questions like:
  - "What approach should I use for this problem?"
  - "Can you explain the optimal solution?"
  - "How can I optimize my time complexity?"
- The AI provides hints without giving away the full solution

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🌐 Deployment

This app can be deployed to any static hosting platform:

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the `dist` folder
```

### GitHub Pages

```bash
npm run build
# Deploy the `dist` folder to gh-pages branch
```

**Important**: Don't forget to set your `VITE_GEMINI_API_KEY` in the hosting platform's environment variables.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI assistant capabilities
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Pyodide](https://pyodide.org/) - Python in the browser
- [Recharts](https://recharts.org/) - Charting library

---

## 📧 Contact

For questions or feedback, please open an issue or reach out to the maintainers.

---

<div align="center">

**Made with ❤️ for developers preparing for their dream jobs**

⭐ Star this repo if you find it helpful!

</div>
