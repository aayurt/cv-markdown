import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';

function Prompt({ path, cmd, args, flags }: { path: string; cmd: string; args?: string; flags?: string }) {
  return (
    <div className="tm-prompt">
      <span className="tm-prompt-user">visitor</span>
      <span className="tm-prompt-at">@</span>
      <span className="tm-prompt-host">resume</span>
      <span className="tm-prompt-sep">:</span>
      <span className="tm-prompt-path">{path}</span>
      <span className="tm-prompt-dollar">$</span>
      <span className="tm-prompt-cmd">{cmd}</span>
      {flags && <> <span className="tm-prompt-flag">{flags}</span></>}
      {args && <> <span className="tm-prompt-arg">{args}</span></>}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <div className="tm-section-header">[ {title} ]</div>;
}

const contactCfg: Record<string, { render: (v: string) => React.ReactNode }> = {
  phone: { render: (v) => <span className="tm-hl">"{v}"</span> },
  email: { render: (v) => <a className="tm-link" href={`mailto:${v}`}>{v}</a> },
  github: { render: (v) => <a className="tm-link" href={`https://${v}`} target="_blank" rel="noopener noreferrer">{v}</a> },
  website: { render: (v) => <a className="tm-link" href={v.startsWith("http") ? v : `https://${v}`} target="_blank" rel="noopener noreferrer">{v}</a> },
  linkedin: { render: (v) => <a className="tm-link" href={`https://${v}`} target="_blank" rel="noopener noreferrer">{v}</a> },
};

export default function TerminalPreview({ data, locale = 'en', theme = 'dark' }: { data: ResumeData; locale?: Locale; theme?: 'light' | 'dark' }) {
  const d = data;
  return (
    <div className={`tm-root${theme === 'light' ? ' tm-root--light' : ''}`}>
      <style>{TERMINAL_CSS}</style>

      <div className="tm-window">
        {/* Titlebar */}
        <div className="tm-titlebar">
          <div className="tm-titlebar-dots">
            <span className="tm-dot tm-dot--close" />
            <span className="tm-dot tm-dot--mini" />
            <span className="tm-dot tm-dot--expand" />
          </div>
          <div className="tm-titlebar-text">resume.sh — bash — 120×45</div>
        </div>

        <div className="tm-body">
          {/* Boot sequence */}
          <div className="tm-boot">BIOS v3.3.1 ... <span className="tm-boot-ok">[OK]</span></div>
          <div className="tm-boot">Loading kernel modules ... <span className="tm-boot-ok">[OK]</span></div>
          <div className="tm-boot">Mounting /dev/career ... <span className="tm-boot-ok">[OK]</span></div>
          <div className="tm-boot tm-boot-hl">System ready. Welcome to resume.sh</div>

          {/* Header as JSON */}
          <Prompt path="~" cmd="cat" args="header.json" />
          <div className="tm-output">
            <div className="tm-line"><span className="tm-dim">{"{"}</span></div>
            <div className="tm-line">  <span className="tm-cyan">"name"</span><span className="tm-dim">:</span>    <span className="tm-bright">"{d.header.name}"</span><span className="tm-dim">,</span></div>
            <div className="tm-line">  <span className="tm-cyan">"title"</span><span className="tm-dim">:</span>   <span className="tm-accent">"{d.header.title}"</span><span className="tm-dim">,</span></div>
            {d.header.contacts?.map((contact, i) => {
              const cfg = contactCfg[contact.type];
              if (!cfg) return null;
              return (
                <div key={i} className="tm-line">  <span className="tm-cyan">"{contact.type}"</span><span className="tm-dim">:</span> {cfg.render(contact.value)}</div>
              );
            })}
            <div className="tm-line"><span className="tm-dim">{"}"}</span></div>
          </div>

          {/* Summary */}
          {d.summary && (
            <>
              <hr className="tm-divider" />
              <Prompt path="~" cmd="echo" args="$ABOUT_ME" />
              <div className="tm-output">
                <div className="tm-line" style={{ maxWidth: "72ch" }}>{d.summary}</div>
              </div>
            </>
          )}

          {/* Projects */}
          {d.projects && d.projects.length > 0 && (
            <>
              <hr className="tm-divider" />
              <Prompt path="~/projects" cmd="ls" flags="-la" />
              <div className="tm-output">
                <SectionHeader title={t('projects', locale)} />
                {d.projects.map((proj, i) => (
                  <div key={i} className="tm-card">
                    <div className="tm-card-title">{proj.name}</div>
                    {proj.repo && (
                      <div className="tm-card-meta">
                        <span className="tm-dim">repo:</span>{" "}
                        <a className="tm-link" href={`https://${proj.repo}`} target="_blank" rel="noopener noreferrer">{proj.repo}</a>
                      </div>
                    )}
                    {proj.overview && <div className="tm-card-desc">// {proj.overview}</div>}
                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul className="tm-bullets">
                        {proj.bullets.map((b, j) => <li key={j} className="tm-bullet">{b}</li>)}
                      </ul>
                    )}
                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="tm-tags">
                        {proj.techStack.map((tech, k) => <span key={k} className="tm-tag">{tech}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Experience */}
          {d.experience && d.experience.length > 0 && (
            <>
              <hr className="tm-divider" />
              <Prompt path="~/experience" cmd="git" args="log" flags="--oneline" />
              <div className="tm-output">
                <SectionHeader title={t('experience', locale)} />
                {d.experience.map((exp, i) => (
                  <div key={i} className="tm-card">
                    <div className="tm-card-title">{exp.company}</div>
                    <div className="tm-card-meta">
                      <span><span className="tm-dim">role:</span> {exp.position}</span>
                      <span><span className="tm-dim">date:</span> {exp.period}</span>
                    </div>
                    {exp.overview && <div className="tm-card-desc">// {exp.overview}</div>}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="tm-bullets">
                        {exp.bullets.map((b, j) => <li key={j} className="tm-bullet">{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Education */}
          {d.education && d.education.length > 0 && (
            <>
              <hr className="tm-divider" />
              <Prompt path="~/education" cmd="cat" args="degree.txt" />
              <div className="tm-output">
                <SectionHeader title={t('education', locale)} />
                {d.education.map((edu, i) => (
                  <div key={i} className="tm-card">
                    <div className="tm-card-title">{edu.school}</div>
                    <div className="tm-card-meta">
                      <span><span className="tm-dim">degree:</span> {edu.degree} — {edu.major}</span>
                      <span><span className="tm-dim">date:</span> {edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Skills */}
          {d.skills && d.skills.length > 0 && (
            <>
              <hr className="tm-divider" />
              <Prompt path="~" cmd="neofetch" flags="--skills" />
              <div className="tm-output">
                <SectionHeader title={t('techStack', locale)} />
                <div className="tm-tags">
                  {d.skills.map((s, i) => <span key={i} className="tm-tag">{s}</span>)}
                </div>
              </div>
            </>
          )}

          {/* Appendix */}
          {d.appendix && d.appendix.length > 0 && (
            <>
              <hr className="tm-divider" />
              <Prompt path="~/appendix" cmd="open" args="attachments/" />
              <div className="tm-output">
                <SectionHeader title={t('appendix', locale)} />
                {d.appendix.map((item, i) => (
                  <div key={i} className="tm-card">
                    <div className="tm-card-title">{item.title}</div>
                    {item.description && <div className="tm-card-desc">// {item.description}</div>}
                    <div className="tm-appendix-img">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} />
                      ) : (
                        <div className="tm-appendix-placeholder">[ {t('imgPlaceholder', locale)} ]</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Final cursor */}
          <hr className="tm-divider" />
          <div className="tm-prompt">
            <span className="tm-prompt-user">visitor</span>
            <span className="tm-prompt-at">@</span>
            <span className="tm-prompt-host">resume</span>
            <span className="tm-prompt-sep">:</span>
            <span className="tm-prompt-path">~</span>
            <span className="tm-prompt-dollar">$</span>
            <span className="tm-cursor" />
          </div>
        </div>

        {/* Status bar */}
        <div className="tm-statusbar">
          <div className="tm-statusbar-group">
            <span className="tm-statusbar-active">● NORMAL</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
          <div className="tm-statusbar-group">
            <span>bash 5.2</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const TERMINAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

.tm-root {
  --bg: #020a02; --bg-card: #041504; --border: #0e380e; --border-hover: #1a6b1a;
  --green-faint: #0d2e0d; --green-dim: #1a5c1a; --green: #33ff33; --green-mid: #22cc22;
  --green-muted: #2d8a2d; --green-comment: #1e6b1e;
  --amber: #ccaa22; --cyan: #22ffcc; --white: #ccffcc;
  --text: #33ff33; --text-dim: #1e8a1e; --text-faint: #145014;
  --font-mono: 'JetBrains Mono', 'Share Tech Mono', 'Courier New', monospace;
  --glow-sm: 0 0 4px rgba(51,255,51,0.3);
  --glow-md: 0 0 8px rgba(51,255,51,0.2), 0 0 20px rgba(51,255,51,0.1);
  --glow-lg: 0 0 15px rgba(51,255,51,0.3), 0 0 40px rgba(51,255,51,0.1);
  --glow-text: 0 0 8px rgba(51,255,51,0.6);

  font-family: var(--font-mono); background: var(--bg); color: var(--text);
  line-height: 1.65; font-size: 13.5px; min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* CRT scanlines */
.tm-root::after {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px);
}
/* Phosphor vignette */
.tm-root::before {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9998;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%);
}

/* Window chrome */
.tm-window {
  max-width: 880px; margin: 2rem auto; border: 1px solid var(--border);
  border-radius: 10px; overflow: hidden;
  box-shadow: var(--glow-lg), 0 20px 60px rgba(0,0,0,0.8);
}
.tm-titlebar {
  background: var(--bg-card); border-bottom: 1px solid var(--border);
  padding: 11px 16px; display: flex; align-items: center; gap: 12px; user-select: none;
}
.tm-titlebar-dots { display: flex; gap: 7px; }
.tm-dot { width: 11px; height: 11px; border-radius: 50%; }
.tm-dot--close { background: #ff5f56; }
.tm-dot--mini { background: #ffbd2e; }
.tm-dot--expand { background: #27c93f; }
.tm-titlebar-text { flex: 1; text-align: center; color: var(--text-dim); font-size: 0.78rem; letter-spacing: 0.5px; }

/* Body */
.tm-body { background: var(--bg); padding: 28px 32px; animation: tm-flicker 8s infinite; }
@keyframes tm-flicker { 0%,100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.88; } 94% { opacity: 1; } }

/* Boot */
.tm-boot { color: var(--text-dim); font-size: 0.78rem; line-height: 1.8; }
.tm-boot-ok { color: var(--green-mid); }
.tm-boot-hl { color: var(--green); text-shadow: var(--glow-text); }

/* Prompt */
.tm-prompt { display: flex; flex-wrap: wrap; align-items: baseline; margin-top: 20px; margin-bottom: 4px; }
.tm-prompt-user { color: var(--green); text-shadow: var(--glow-sm); }
.tm-prompt-at { color: var(--text-dim); }
.tm-prompt-host { color: var(--cyan); }
.tm-prompt-sep { color: var(--text-faint); }
.tm-prompt-path { color: var(--green-mid); }
.tm-prompt-dollar { color: var(--text-dim); margin-right: 8px; }
.tm-prompt-cmd { color: var(--amber); }
.tm-prompt-arg { color: var(--white); }
.tm-prompt-flag { color: var(--cyan); }

/* Output */
.tm-output { margin: 6px 0 0; padding-left: 2px; }
.tm-line { line-height: 1.75; font-size: 0.92rem; }
.tm-dim { color: var(--text-dim); }
.tm-cyan { color: var(--cyan); }
.tm-bright { color: var(--white); font-weight: 600; text-shadow: var(--glow-sm); }
.tm-accent { color: var(--amber); }
.tm-hl { color: var(--green); text-shadow: var(--glow-sm); }
.tm-link { color: var(--cyan); text-decoration: none; border-bottom: 1px dashed var(--green-dim); transition: all 0.2s; }
.tm-link:hover { color: var(--green); border-bottom-color: var(--green); text-shadow: var(--glow-sm); }

/* Divider & section header */
.tm-divider { border: none; border-top: 1px dashed var(--border); margin: 24px 0; }
.tm-section-header {
  color: var(--green); font-weight: 700; font-size: 0.88rem; text-shadow: var(--glow-text);
  letter-spacing: 1px; display: flex; align-items: center; gap: 10px;
  margin-bottom: 14px; text-transform: uppercase;
}
.tm-section-header::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, var(--green-dim), transparent 80%); }

/* Card */
.tm-card {
  border: 1px solid var(--border); border-radius: 6px; padding: 16px 20px;
  margin-bottom: 14px; background: var(--bg-card); transition: border-color 0.3s, box-shadow 0.3s;
}
.tm-card:hover { border-color: var(--border-hover); box-shadow: var(--glow-md); }
.tm-card-title { color: var(--green); font-weight: 600; font-size: 0.95rem; text-shadow: var(--glow-sm); margin-bottom: 4px; }
.tm-card-meta { color: var(--text-dim); font-size: 0.8rem; display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 6px; }
.tm-card-desc { color: var(--green-muted); font-size: 0.84rem; font-style: italic; margin: 6px 0; }

/* Bullets */
.tm-bullets { list-style: none; margin: 8px 0; }
.tm-bullet { position: relative; padding-left: 22px; font-size: 0.84rem; line-height: 1.85; color: var(--green-mid); }
.tm-bullet::before { content: '>'; position: absolute; left: 4px; color: var(--green); text-shadow: var(--glow-sm); font-weight: 700; }

/* Tags */
.tm-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.tm-tag { background: var(--green-faint); color: var(--green-mid); padding: 2px 10px; border-radius: 3px; font-size: 0.72rem; border: 1px solid var(--border); letter-spacing: 0.5px; }

/* Appendix */
.tm-appendix-img { margin: 12px 0; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; max-width: 420px; }
.tm-appendix-img img { width: 100%; display: block; filter: saturate(0.6) brightness(0.85); }
.tm-appendix-placeholder { width: 100%; height: 180px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; color: var(--text-faint); font-size: 0.78rem; }

/* Cursor */
.tm-cursor { display: inline-block; width: 9px; height: 17px; background: var(--green); box-shadow: var(--glow-sm); margin-left: 2px; vertical-align: text-bottom; animation: tm-blink 1s steps(1) infinite; }
@keyframes tm-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

/* Status bar */
.tm-statusbar { background: var(--bg-card); border-top: 1px solid var(--border); padding: 6px 16px; display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-faint); }
.tm-statusbar-group { display: flex; gap: 16px; }
.tm-statusbar-active { color: var(--green); text-shadow: var(--glow-sm); }

.tm-root--light {
  --bg: #f5f0e8;
  --bg-card: #fffdf8;
  --border: #d4cdc0;
  --border-hover: #a09888;
  --green-faint: #e8e0d0;
  --green-dim: #5a7a4a;
  --green: #2d6a1e;
  --green-mid: #3a7a2a;
  --green-muted: #5a8a4a;
  --green-comment: #7a9a6a;
  --amber: #8a7a20;
  --cyan: #1a6a7a;
  --white: #1a1a12;
  --text: #2d6a1e;
  --text-dim: #6a8060;
  --text-faint: #9aa890;
  --glow-sm: none;
  --glow-md: none;
  --glow-lg: 0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04);
  --glow-text: none;
}
.tm-root--light .tm-body { animation: none; }
.tm-root--light::after { display: none; }
.tm-root--light::before { display: none; }
.tm-root--light .tm-card:hover { border-color: var(--border-hover); box-shadow: none; }
`;
