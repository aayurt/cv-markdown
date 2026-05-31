# styled-resume

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/YUHAO-corn/styled-resume?style=social)](https://github.com/YUHAO-corn/styled-resume/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YUHAO-corn/styled-resume?style=social)](https://github.com/YUHAO-corn/styled-resume/network/members)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)](https://www.typescriptlang.org)

**[English](#english)** | **[中文](#中文)**

[Live Demo / 在线体验](https://styled-resume.pages.dev)

---

<a id="english"></a>

## English

Write in Markdown. Get a beautifully designed resume.

### Preview

![styled-resume overview](docs/screenshots/overview.png)

| Shadcn | Claude | Terminal | Editorial |
|--------|--------|----------|-----------|
| ![Shadcn](docs/screenshots/Shadcn.png) | ![Claude](docs/screenshots/Claude.png) | ![Terminal](docs/screenshots/Terminal.png) | ![Editorial](docs/screenshots/Editorial.png) |
| Clean & minimal | Warm & professional | Retro hacker | Newspaper editorial |

### What is this?

Most markdown resume tools produce the same plain output. styled-resume is different — it turns your markdown into resumes that actually look designed.

One markdown file, four distinct visual styles. Switch templates instantly, export as PDF or HTML, or share a link that renders your resume in the browser.

### Features

- **4 Designed Templates** — Shadcn (clean), Claude (warm), Terminal (retro), Editorial (newspaper bento grid)
- **Live Preview** — Edit markdown on the left, see the result on the right, instantly
- **PDF Export** — Single-page continuous PDF via browser print, no server needed
- **HTML Export** — Download a self-contained HTML file, deploy anywhere
- **Share Link** — Generate a compressed URL, anyone can view your resume in the browser
- **Auto Save** — Your work is saved to localStorage automatically
- **i18n** — Auto-detects browser language, manual toggle between Chinese and English

### Quick Start

```bash
git clone https://github.com/YUHAO-corn/styled-resume.git
cd styled-resume
npm install
npm run dev
```

Open `http://localhost:5174` and start editing.

### How It Works

```
Markdown  →  Parser  →  Template  →  PDF / HTML / Share Link
                           ↑
                    4 visual styles
```

Write your resume in markdown following a simple structure (name, title, experience, projects, skills, etc.). The parser converts it to structured data, and the template engine renders it with the style you choose.

### Tech Stack

React · Vite · TypeScript · Tailwind CSS · lz-string

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YUHAO-corn/styled-resume&type=Date)](https://star-history.com/#YUHAO-corn/styled-resume&Date)

---

<a id="中文"></a>

## 中文

用 Markdown 写简历，获得有设计感的输出。

### 预览

![styled-resume 概览](docs/screenshots/overview.png)

| Shadcn | Claude | Terminal | Editorial |
|--------|--------|----------|-----------|
| ![Shadcn](docs/screenshots/Shadcn.png) | ![Claude](docs/screenshots/Claude.png) | ![Terminal](docs/screenshots/Terminal.png) | ![Editorial](docs/screenshots/Editorial.png) |
| 简洁极简 | 温暖专业 | 复古黑客 | 报纸编辑 |

### 这是什么？

大多数 Markdown 简历工具的输出千篇一律。styled-resume 不一样 — 它让你的 Markdown 变成真正有设计感的简历。

一份 Markdown，四种视觉风格。一键切换模板，导出 PDF 或 HTML，或者生成一个分享链接让别人直接在浏览器里查看。

### 功能

- **4 套设计模板** — Shadcn（简洁）、Claude（温暖）、Terminal（复古）、Editorial（报纸 Bento Grid）
- **实时预览** — 左边写 Markdown，右边即时看到效果
- **PDF 导出** — 浏览器端单页连续 PDF，无需服务器
- **HTML 导出** — 下载自包含 HTML 文件，部署到任何地方
- **分享链接** — 生成压缩 URL，对方打开就能看到你的简历
- **自动保存** — 内容自动存储到 localStorage
- **国际化** — 自动检测浏览器语言，支持中英文手动切换

### 快速开始

```bash
git clone https://github.com/YUHAO-corn/styled-resume.git
cd styled-resume
npm install
npm run dev
```

打开 `http://localhost:5174` 开始编辑。

### 工作原理

```
Markdown  →  解析器  →  模板渲染  →  PDF / HTML / 分享链接
                          ↑
                     4 种视觉风格
```

用简单的 Markdown 结构写简历（姓名、职位、经历、项目、技能等），解析器将其转为结构化数据，模板引擎用你选择的风格渲染输出。

### 技术栈

React · Vite · TypeScript · Tailwind CSS · lz-string

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YUHAO-corn/styled-resume&type=Date)](https://star-history.com/#YUHAO-corn/styled-resume&Date)

---

## License

MIT © [YUHAO-corn](https://github.com/YUHAO-corn)
