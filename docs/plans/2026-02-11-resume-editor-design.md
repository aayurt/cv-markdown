# 简历编辑器 — 设计决策记录

## 产品定位

**Q: 我们要做什么？**
A: 一款基于 Markdown 的简历编辑工具。用户用 Markdown 编写简历内容，工具将其渲染为美观的模板化简历，并支持 PDF 下载。传统简历用 Word/WPS 排版千篇一律，简历本身应该是一份产品，体现用户体验、信息架构和视觉设计的理解。

---

## 技术决策

**Q: 工具的形态？**
A: 纯前端 SPA。所有逻辑跑在浏览器端，无需后端。Markdown 解析、模板渲染、PDF 生成全在客户端完成。部署简单，隐私友好（简历数据不离开用户浏览器）。

**Q: 技术栈？**
A: React 18 + Vite + TypeScript + Tailwind CSS。

**Q: PDF 导出方案？**
A: ~~`@react-pdf/renderer`~~ → 改为 `window.print()` + `@media print` CSS。

**变更原因：** @react-pdf/renderer 的 CSS 兼容性差（border 简写不支持、rgba() 不支持），导致 PDF 输出与 HTML 预览视觉差异大，需要维护两套模板且难以保证一致性。

**最终方案：** 打开一个只包含简历预览的新窗口，自动触发 `window.print()`，用户在浏览器打印对话框中选"另存为 PDF"。
- 优点：视觉与预览 100% 一致（复用同一套 HTML/CSS 渲染），文字可选中/搜索，只需维护一套模板
- 缺点：用户需在打印对话框中手动点"另存为 PDF"（多一步操作）
- 实现：新窗口加载简历 HTML + `@media print` 样式优化（隐藏动画、调整边距等）→ 自动调用 `window.print()`

**Q: 编辑器交互形态？**
A: 左右分栏 — 左边 Markdown 编辑，右边实时预览。经典的所见即所得体验。

**Q: 编辑器组件？**
A: 简单 textarea。简历内容不长，不需要 CodeMirror/Monaco 这类重量级编辑器，不需要语法高亮。

**Q: Markdown 格式约定？**
A: YAML frontmatter + Markdown sections。基本信息放 frontmatter，各板块用 `## 标题` 分隔。解析规则：
- YAML frontmatter → 头部信息（姓名、联系方式等）
- `## 标题` → section 分隔符
- `### 标题` → 条目，用 `|` 分隔字段（如 `### 公司 | 职位 | 时间`）
- `> 引用` → 条目概述
- `- 列表项` → 具体成果
- 行内代码 `` `技术` `` → 技术栈标签
- `![alt](url)` → 附录图片

**Q: 附录区如何处理？**
A: 无内容则隐藏，有内容则展示。Markdown 中无 `## 附录` section 时，`ResumeData.appendix` 为 `undefined`，模板不渲染该区域。附录使用标准 Markdown 图片语法，每个条目包含标题 + 描述文字 + 图片链接：
```markdown
## 附录
### 产品架构图 — AI 智能客服平台
展示系统整体架构与核心模块交互关系
![架构图](https://example.com/arch.png)
```
图片来源为外部 URL 或 base64 data URL（纯前端无文件上传服务器）。

**Q: 模板策略？**
A: 先做一个 shadcn 风格模板（还原现有 prototype），架构上预留模板切换能力。后期增加 claude 风格模板。模板通过 registry 注册，新增模板只需注册 `{ id, name, PreviewComponent }`。PDF 导出复用 PreviewComponent（通过 window.print），无需单独的 PDF 组件。

---

## 架构设计

**数据流：**
```
Markdown 文本 → 解析器 (parser) → ResumeData 结构化数据 → HTML 模板组件（预览 + PDF 共用）
```

**项目结构：**
```
src/
├── App.tsx                    # 主布局：Toolbar + 左右分栏
├── main.tsx                   # 入口
├── types/
│   └── resume.ts              # ResumeData 类型定义
├── parser/
│   └── markdown-parser.ts     # Markdown → ResumeData 解析器（纯字符串，零依赖）
├── data/
│   ├── sample.ts              # 示例 ResumeData（硬编码，用于测试）
│   └── default-markdown.ts    # 默认 Markdown 内容
├── templates/
│   ├── registry.ts            # 模板注册表（支持切换，预留）
│   └── shadcn/
│       ├── PreviewTemplate.tsx # HTML/CSS 预览组件（PDF 也复用此组件）
│       └── icons.tsx          # SVG 图标组件
└── hooks/
    └── useResumeData.ts       # Markdown → 解析 → 状态管理（预留）
```

**核心类型：**
```typescript
interface ResumeData {
  header: {
    name: string;
    title: string;
    phone?: string;
    email?: string;
    github?: string;
    website?: string;
    status?: string;        // "Open to work" 等
  };
  summary?: string;
  projects?: ProjectItem[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
  skills?: string[];
  appendix?: AppendixItem[];
}

interface ProjectItem {
  name: string;
  repo?: string;            // github.com/xxx/yyy
  overview?: string;
  bullets?: string[];
  techStack?: string[];
}

interface ExperienceItem {
  company: string;
  position: string;
  period: string;           // "2022.03 – 至今"
  overview?: string;
  bullets?: string[];
}

interface EducationItem {
  school: string;
  degree: string;
  major: string;
  period: string;
}

interface AppendixItem {
  title: string;
  description?: string;
  imageUrl?: string;
}
```

**依赖清单：**
- react + react-dom
- tailwindcss + @tailwindcss/vite
- 无其他外部依赖（Markdown 解析器为纯字符串处理，零依赖）

---

## 页面设计

**Q: 产品有几个页面？**
A: 单页面 SPA。整个产品就是一个编辑器页面，没有首页、没有登录、没有设置页。所有操作在一个页面内完成。极简到底。

**Q: 编辑器产品本身的 UI 风格？**
A: 极简开发者工具风，类似 StackBlitz / CodeSandbox。深色侧边栏 + 浅色编辑区，紧凑布局，功能导向。和 shadcn 简历模板的气质一致。

**Q: 页面布局结构？**
A: 三个一级模块：Toolbar、EditorPanel、PreviewPanel。无 StatusBar，字数统计轻量放在编辑区右下角。

```
┌─────────────────────────────────────────────────────────┐
│  Toolbar                                                │
│  ┌──────┐  ┌──────────┐           ┌──────────────────┐  │
│  │ Logo │  │ 模板选择  │           │  下载 PDF        │  │
│  └──────┘  └──────────┘           └──────────────────┘  │
├────────────────────────┬────────────────────────────────┤
│  Editor Panel          │  Preview Panel                 │
│                        │                                │
│  ┌──────────────────┐  │  ┌────────────────────────┐    │
│  │                  │  │  │                        │    │
│  │   textarea       │  │  │   简历实时预览          │    │
│  │   (Markdown)     │  │  │   (HTML 渲染)          │    │
│  │                  │  │  │                        │    │
│  │                  │  │  │                        │    │
│  │          128 字  │  │  │                        │    │
│  └──────────────────┘  │  └────────────────────────┘    │
│                        │                                │
└────────────────────────┴────────────────────────────────┘
```

**Q: 组件树？**
A:
```
App
├── Toolbar
│   ├── Logo
│   ├── TemplateSelector        # 预留
│   └── PdfExportButton
└── WorkspacePanel
    ├── EditorPanel
    │   └── textarea            # 右下角显示字数
    └── PreviewPanel
        └── TemplateRenderer
```

---

## MVP 范围

- 左右分栏编辑 + 实时预览
- shadcn 风格模板（还原 prototype）
- PDF 下载（文字可选中）
- localStorage 自动保存
- 默认填充示例 Markdown

---

## 实现策略

**Q: 如何确保最终预览效果与 prototype 一致？**
A: 直接复用 `resume.jsx` 的代码，不是"参考重写"。把 JSX 结构、样式、图标组件原封不动搬到 `PreviewTemplate.tsx`，唯一改动是将硬编码的 `RESUME_DATA` 替换为 `props.data: ResumeData`。inline styles 先保留不动，功能跑通后再考虑是否迁移 Tailwind。

**Q: 开发策略？**
A: 采用 Vertical Slice 开发。先验证最核心的视觉输出，再逐步扩展功能。每个 slice 交付一个可验收的完整功能切片。

### Slice 1: 预览渲染（验证视觉还原） ✅ 已完成
- 搭建 Vite + React + TypeScript 项目骨架
- 定义 `ResumeData` 类型（types/resume.ts）
- 将 resume.jsx 重构为 `ShadcnPreview` 组件，接收 `ResumeData` props
- 提取 SVG 图标组件到独立文件
- 用硬编码的示例数据（与 resume.jsx 中 RESUME_DATA 一致）驱动渲染
- **验收标准：浏览器中渲染效果与 resume.jsx prototype 完全一致**

### Slice 2: Markdown 解析 + 编辑器 ✅ 已完成
- 实现 Markdown 解析器（纯字符串处理，零外部依赖，替换了 gray-matter/remark）
- 编写示例 Markdown（覆盖所有 section）
- 添加 textarea 编辑器 + 左右分栏布局
- 接通数据流：textarea → parser → ShadcnPreview
- **验收标准：编辑 Markdown 后右侧预览实时更新，内容正确** ✅

### Slice 3: PDF 导出（方案已变更）
- ~~用 @react-pdf/renderer 重写模板~~ → 改为 window.print() + @media print
- 实现：点击"下载 PDF"按钮 → 打开新窗口（只含简历预览）→ 自动触发 window.print()
- 添加 @media print CSS：隐藏动画、去掉阴影/圆角、调整 A4 边距、隐藏 hover 效果
- 删除 @react-pdf/renderer 依赖和 PdfTemplate.tsx
- **验收标准：打印预览中简历排版正确，文字可选中，样式干净**

### Slice 4: 收尾打磨
- localStorage 自动保存 + 恢复
- 默认填充示例 Markdown
- 模板 registry 架构（预留切换能力）
- Toolbar 完善（Logo、模板选择器占位、PDF 按钮）
- 编辑区字数统计
- **验收标准：刷新不丢数据，首次打开有示例内容，整体体验完整**

