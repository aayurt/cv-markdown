import { useState } from 'react';
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

const AGENT_PROMPT = `Generate a resume in the EXACT markdown format shown below. Replace the example content with the user's real information.

RULES:
- Frontmatter between --- lines: name, title, phone, email, github, website, status
- Sections start with ## (accepted: Summary, Experience, Projects, Education, Skills, Appendix)
- Entries within sections start with ###, fields separated by |
- Bullet points start with "- "
- Overview/context lines start with "> "
- Tech tags in backticks like \`React\` \`TypeScript\`
- Images use markdown: ![alt](url)

FORMAT (keep this exact structure):
\`\`\`
---
name: Jane Doe
title: Senior Software Engineer
phone: "+1 555 123 4567"
email: jane@example.com
github: github.com/janedoe
website: janedoe.com
status: Open to work
---

## Summary

Full-stack engineer with 6+ years building scalable web applications, distributed systems, and developer tools. Passionate about clean architecture and developer experience.

## Experience

### Acme Corp | Senior Software Engineer | Jan 2022 – Present
> Led the platform team building real-time infrastructure

- Designed and deployed a WebSocket-based notification system handling 50k+ concurrent connections
- Migrated legacy monolith to microservices, reducing deployment time by 80%
- Mentored 4 junior engineers through structured code review and pair programming

\`React\` \`Node.js\` \`TypeScript\` \`WebSockets\` \`Redis\`

### Beta Inc | Software Engineer | Mar 2019 – Dec 2021
- Built RESTful APIs serving 1M+ daily requests with 99.9% uptime
- Implemented CI/CD pipeline reducing release cycle from 2 weeks to daily

\`Python\` \`Django\` \`PostgreSQL\` \`Docker\`

## Projects

### Payload CMS Starter | github.com/janedoe/payload-starter
> A production-ready starter template for Payload CMS

- Built authentication, RBAC, and multi-tenant support out of the box
- 500+ GitHub stars and used by 3 production applications

\`TypeScript\` \`Payload CMS\` \`React\`

## Education

### MIT | MSc | Computer Science | 2017 – 2019
### UC Berkeley | BSc | Electrical Engineering | 2013 – 2017

## Skills

- TypeScript / JavaScript
- React, Next.js
- Node.js, Python
- PostgreSQL, Redis
- Docker, AWS
- System Design

## Appendix

### AWS Solutions Architect Certification

Professional level certification covering distributed system design on AWS.

![certificate](https://example.com/cert.png)
\`\`\`

Generate ONLY the markdown block above — no introductory text, no explanation, no commentary. Replace the example content with the user's actual information.`;

export default function HelpModal({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleCopyStructure = async () => {
    try {
      await navigator.clipboard.writeText(STRUCTURE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#18181b", margin: 0 }}>
            {t('helpStructure', locale)}
          </h3>
          <button
            onClick={handleCopyStructure}
            style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              padding: "4px 10px", borderRadius: "6px", border: "1px solid #d4d4d8",
              background: "#fafafa", color: "#52525b",
              fontSize: "11px", fontWeight: 600, cursor: "pointer",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Copy
          </button>
        </div>
        <pre style={{
          background: "#f4f4f5", borderRadius: "8px",
          padding: "16px", fontSize: "12px", lineHeight: 1.6,
          fontFamily: '"JetBrains Mono", monospace',
          overflow: "auto", color: "#3f3f46",
          whiteSpace: "pre", margin: "0 0 24px",
        }}>
          {STRUCTURE}
        </pre>

        <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 12px" }}>
          {t('helpAgentDesc', locale)}
        </p>
        {/* Agent Prompt */}
        <div style={{
          border: "2px solid #18181b", borderRadius: "12px",
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 16px", background: "#18181b",
          }}>
            <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#fafafa", margin: 0, fontFamily: '"Inter", sans-serif' }}>
              {t('helpAgentPrompt', locale)}
            </h3>
            <button
              onClick={handleCopy}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "6px 16px", borderRadius: "6px", border: "none",
                background: copied ? "#22c55e" : "#fafafa",
                color: copied ? "#fff" : "#18181b",
                fontSize: "12px", fontWeight: 600, cursor: "pointer",
                fontFamily: '"Inter", sans-serif',
                transition: "all 0.2s",
              }}
            >
              {copied ? '✓ Copied!' : 'Copy to clipboard'}
            </button>
          </div>
          <pre
            onClick={handleCopy}
            style={{
              background: "#09090b", padding: "16px",
              fontSize: "12px", lineHeight: 1.65,
              fontFamily: '"JetBrains Mono", monospace',
              overflow: "auto", color: "#e4e4e7",
              whiteSpace: "pre-wrap", margin: 0,
              cursor: "pointer", userSelect: "all",
            }}
          >
            {AGENT_PROMPT}
          </pre>
        </div>
      </div>
    </div>
  );
}
