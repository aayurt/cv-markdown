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

### Markdown Structure

```
---
name: Your Name
title: Your Job Title
phone: "+977 1234567890"
email: you@email.com
github: github.com/you
website: yoursite.com
status: Open to work
---

## Summary

A short paragraph about yourself.

## Experience

### Company Name | Your Position | Start – End
> Brief overview of your role (optional)

- Bullet point describing an achievement
- Another bullet point
`Tag1` `Tag2` `Tag3`

## Projects

### Project Name | github.com/you/repo
> Overview (optional)

- Did X which resulted in Y
`React` `Node.js`

## Education

### University Name | Degree | Major | Period

## Skills

- Skill One
- Skill Two

## Appendix

### Certification Name

Description text here.

![image](https://example.com/cert.png)
```

**Field rules:**
- **Frontmatter** (between `---`) — fields: `name`, `title`, `phone`, `email`, `github`, `website`, `status`
- **Sections** — use `## Section Name` (accepted: Summary, Experience, Projects, Education, Skills, Appendix)
- **Entries** — use `### Name | Field2 | Field3 | Field4` with `|` separators
- **Bullets** — lines starting with `- `
- **Overview/context** — lines starting with `> `
- **Tech tags** — backtick-wrapped like `` `React` ``
- **Images** — markdown format: `![alt](url)`

### Agent Prompt

Give this prompt to any AI agent (Claude, ChatGPT, etc.) to generate resume markdown in the correct format:

```
You are a resume markdown generator. Generate a resume in the exact format below.
Use real-looking placeholder content.

Format rules:
- Frontmatter between --- lines: name, title, phone, email, github, website, status
- Sections start with ## (accepted: Summary, Experience, Projects, Education, Skills, Appendix)
- Entries within sections start with ###, fields separated by |
- Bullet points start with "- "
- Overview/context lines start with "> "
- Tech tags are backtick-wrapped like `React` `TypeScript`
- Images use markdown: ![alt](url)

Template:
---
name: <name>
title: <job title>
phone: "<phone>"
email: <email>
github: github.com/<handle>
website: <website>
status: Open to work
---

## Summary

<1-2 sentence professional summary>

## Experience

### <Company> | <Position> | <Start> – <End>
> <optional role overview>

- <achievement bullet>
- <achievement bullet>
`<tech>` `<tech>`

## Education

### <School> | <Degree> | <Major> | <Period>

## Skills

- <skill>
- <skill>

Generate ONLY valid markdown — no explanation, no commentary.
```

### Tech Stack

React · Vite · TypeScript · Tailwind CSS · lz-string
