import { t } from '../i18n';
import type { Locale } from '../i18n';

const STRUCTURE = `---
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
\`Tag1\` \`Tag2\` \`Tag3\`

### Next Company | Position | Period
...

## Projects

### Project Name | github.com/you/repo
> Overview (optional)

- Did X which resulted in Y
\`React\` \`Node.js\`

## Education

### University Name | Degree | Major | Period

## Skills

- Skill One
- Skill Two

## Appendix

### Certification Name

Description text here.

![image](https://example.com/cert.png)
`;

const AGENT_PROMPT = `You are a resume markdown generator. Generate a resume in the exact format below.
Use real-looking placeholder content. The user will provide their details — fill them in.

Format rules:
- Frontmatter between --- lines: name, title, phone, email, github, website, status
- Sections start with ## (accepted: Summary, Experience, Projects, Education, Skills, Appendix)
- Entries within sections start with ###, fields separated by |
- Bullet points start with "- "
- Overview/context lines start with "> "
- Tech tags are backtick-wrapped like \`React\` \`TypeScript\`
- Images use markdown: ![alt](url)

Template:
\`\`\`
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
\`<tech>\` \`<tech>\`

## Education

### <School> | <Degree> | <Major> | <Period>

## Skills

- <skill>
- <skill>
\`\`\`

Generate ONLY valid markdown — no explanation, no commentary.`;

export default function HelpModal({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "12px",
          maxWidth: "680px", width: "100%", maxHeight: "90vh",
          overflow: "auto", padding: "32px",
          fontFamily: '"Inter", -apple-system, sans-serif',
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "12px", right: "16px",
            background: "none", border: "none",
            fontSize: "20px", cursor: "pointer", color: "#a1a1aa",
            lineHeight: 1, padding: "4px",
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#18181b", margin: "0 0 4px" }}>
          {t('helpTitle', locale)}
        </h2>
        <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 24px" }}>
          {t('helpSubtitle', locale)}
        </p>

        {/* Structure */}
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#18181b", margin: "0 0 8px" }}>
          {t('helpStructure', locale)}
        </h3>
        <pre style={{
          background: "#f4f4f5", borderRadius: "8px",
          padding: "16px", fontSize: "12px", lineHeight: 1.6,
          fontFamily: '"JetBrains Mono", monospace',
          overflow: "auto", color: "#3f3f46",
          whiteSpace: "pre", margin: "0 0 24px",
        }}>
          {STRUCTURE}
        </pre>

        {/* Agent Prompt */}
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#18181b", margin: "0 0 8px" }}>
          {t('helpAgentPrompt', locale)}
        </h3>
        <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 8px" }}>
          {t('helpAgentDesc', locale)}
        </p>
        <pre style={{
          background: "#18181b", borderRadius: "8px",
          padding: "16px", fontSize: "12px", lineHeight: 1.6,
          fontFamily: '"JetBrains Mono", monospace',
          overflow: "auto", color: "#e4e4e7",
          whiteSpace: "pre-wrap", margin: "0",
        }}>
          {AGENT_PROMPT}
        </pre>
      </div>
    </div>
  );
}
