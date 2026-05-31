# 开源发布准备 — 任务清单

> 2026-02-12

## Phase 1: 必做（发布前）

### 1.1 确定项目名和品牌
- [ ] 定一个正式名字（当前 package.json 里是 `temp-scaffold`）
- [ ] 候选：`md-resume`、`resume-md`、`markresume` 等
- [ ] 确认 npm / GitHub 上没有重名

### 1.2 修 package.json 元数据
- [ ] name → 正式项目名
- [ ] description → 一句话介绍
- [ ] author → 你的信息
- [ ] license → "MIT"
- [ ] repository → GitHub 仓库地址
- [ ] keywords → ["resume", "markdown", "template", "pdf", "react"]
- [ ] 去掉 `"private": true`

### 1.3 添加 LICENSE 文件
- [ ] MIT License（最常见，对开源友好）

### 1.4 写 README.md
- [ ] 项目一句话介绍 + 亮点
- [ ] 截图或 GIF 演示
- [ ] 功能列表（4 模板、Markdown 编辑、PDF 导出、HTML 导出、分享链接）
- [ ] 快速开始（clone → install → dev）
- [ ] 技术栈说明
- [ ] License 声明

### 1.5 清理根目录
- [ ] 移走 HTML 原型文件（`resume-claude.html`、`terminal-resume.html`、`bento-resume-editorial.html`、`bento-resume-final.html`）→ `docs/prototypes/` 或直接删除
- [ ] 确认没有多余文件

### 1.6 补充 .gitignore
- [ ] 加 `.env*`、`*.log`、`coverage/`

## Phase 2: 建议做（提升质量）

### 2.1 截图
- [ ] 每个模板一张截图，放 `docs/screenshots/`
- [ ] README 里引用展示

### 2.2 在线 Demo
- [ ] 部署到 GitHub Pages 或 Vercel
- [ ] README 里放 demo 链接

### 2.3 基础 CI
- [ ] GitHub Actions workflow：`tsc --noEmit` + `eslint` + `vite build`
- [ ] 加 badge 到 README

## Phase 3: 可以后做

### 3.1 CONTRIBUTING.md
- [ ] 贡献指南（如何提 issue、PR 规范、开发环境搭建）

### 3.2 单元测试
- [ ] markdown-parser 的测试
- [ ] share.ts 压缩/解压的测试

### 3.3 i18n
- [ ] UI 文案中英文切换（工具栏按钮、toast 等）
