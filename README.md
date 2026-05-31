# cv-markdown

[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)](https://www.typescriptlang.org)

Write in Markdown. Get a beautifully designed resume.

**Live demo → [styled-resume.vercel.app](https://styled-resume.vercel.app/)**

### Preview

![cv-markdown overview](docs/screenshots/overview.png)

| Shadcn | Retro | Awesome | Plain | Claude | Terminal | Editorial |
|--------|-------|---------|-------|--------|----------|-----------|
| ![Shadcn](docs/screenshots/Shadcn.png) | ![Retro](docs/screenshots/Retro.png) | ![Awesome](docs/screenshots/Awesome.png) | ![Plain](docs/screenshots/Plain.png) | ![Claude](docs/screenshots/Claude.png) | ![Terminal](docs/screenshots/Terminal.png) | ![Editorial](docs/screenshots/Editorial.png) |
| Clean & minimal | CRT amber terminal | Curated showcase | Print-friendly PDF | Warm & professional | Retro hacker | Newspaper editorial |

### What is this?

Most markdown resume tools produce the same plain output. cv-markdown is different — it turns your markdown into resumes that actually look designed.

One markdown file, seven distinct visual styles. Switch templates instantly, export as PDF or HTML, or share a link that renders your resume in the browser.

### Features

- **7 Designed Templates** — Shadcn (clean), Retro (CRT terminal), Awesome (curated showcase), Plain (print-friendly), Claude (warm), Terminal (retro hacker), Editorial (newspaper bento grid)
- **Live Preview** — Edit markdown on the left, see the result on the right, instantly
- **PDF Export** — Single-page continuous PDF via browser print, no server needed
- **HTML Export** — Download a self-contained HTML file, deploy anywhere
- **Share Link** — Generate a compressed URL, anyone can view your resume in the browser
- **Auto Save** — Your work is saved to localStorage automatically
- **i18n** — Auto-detects browser language, manual toggle between languages

### Quick Start

```bash
git clone git@github.com:aayurt/cv-markdown.git
cd cv-markdown
npm install
npm run dev
```

Open `http://localhost:5174` and start editing.

### How It Works

```
Markdown  →  Parser  →  Template  →  PDF / HTML / Share Link
                           ↑
                     7 visual styles
```

Write your resume in markdown following a simple structure (name, title, experience, projects, skills, etc.). The parser converts it to structured data, and the template engine renders it with the style you choose.

### Tech Stack

React · Vite · TypeScript · Tailwind CSS · lz-string
