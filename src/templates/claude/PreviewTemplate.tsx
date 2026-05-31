import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';

const claudeLogo = `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>`;

function ClaudeAvatar() {
  return (
    <div className="cl-avatar">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: claudeLogo }} />
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="cl-block cl-msg-user">
      <div className="cl-bubble">{text}</div>
    </div>
  );
}

function SectionLabel({ title }: { title: string }) {
  return <div className="cl-section-label">{title}</div>;
}

function ContactChip({ icon, text, href }: { icon: string; text: string; href?: string }) {
  return (
    <a href={href || "#"} target="_blank" rel="noopener noreferrer" className="cl-contact-chip">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" dangerouslySetInnerHTML={{ __html: icon }} />
      {text}
    </a>
  );
}

const icons = {
  github: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>`,
  mail: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`,
};

export default function ClaudePreview({ data, locale = 'en', theme = 'dark' }: { data: ResumeData; locale?: Locale; theme?: 'light' | 'dark' }) {
  const d = data;
  return (
    <div className={`cl-root${theme === 'dark' ? ' cl-root--dark' : ''}`}>
      <style>{CLAUDE_CSS}</style>

      <div className="cl-container">
        {/* Top Bar */}
        <div className="cl-topbar">
          <div className="cl-topbar-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: claudeLogo }} />
          </div>
          <div className="cl-topbar-text">
            <strong>Claude</strong> · Resume
          </div>
        </div>

        {/* User: intro prompt */}
        <UserBubble text={t('askIntro', locale)} />

        {/* Header */}
        <div className="cl-block cl-msg-claude">
          <ClaudeAvatar />
          <div className="cl-resume-header">
            <div className="cl-resume-name">{d.header.name}</div>
            <div className="cl-resume-title">{d.header.title}</div>
            <div className="cl-contact-row">
              {d.header.github && <ContactChip icon={icons.github} text={d.header.github} href={`https://${d.header.github}`} />}
              {d.header.website && <ContactChip icon={icons.globe} text={d.header.website} href={d.header.website.startsWith("http") ? d.header.website : `https://${d.header.website}`} />}
              {d.header.phone && <ContactChip icon={icons.phone} text={d.header.phone} href={`tel:${d.header.phone.replace(/[-\s]/g, "")}`} />}
              {d.header.email && <ContactChip icon={icons.mail} text={d.header.email} href={`mailto:${d.header.email}`} />}
            </div>
          </div>
        </div>

        {/* Summary */}
        {d.summary && (
          <div className="cl-block cl-msg-claude">
            <SectionLabel title={t('summary', locale)} />
            <p className="cl-bio-text">{d.summary}</p>
          </div>
        )}

        {/* Projects */}
        {d.projects && d.projects.length > 0 && (
          <>
            <UserBubble text={t('askProjects', locale)} />
            <div className="cl-block cl-msg-claude">
              <ClaudeAvatar />
              <SectionLabel title={t('projects', locale)} />
              {d.projects.map((proj, i) => (
                <div key={i} className="cl-project-card">
                  <div className="cl-project-header">
                    <div className="cl-project-name">{proj.name}</div>
                    {proj.repo && (
                      <a href={`https://${proj.repo}`} target="_blank" rel="noopener noreferrer" className="cl-project-repo">
                        ↗ {proj.repo}
                      </a>
                    )}
                  </div>
                  {proj.overview && <div className="cl-project-summary">{proj.overview}</div>}
                  {proj.bullets && (
                    <ul className="cl-project-bullets">
                      {proj.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                  {proj.techStack && (
                    <div className="cl-tech-stack">
                      {proj.techStack.map((tech, k) => <span key={k} className="cl-tech-tag">{tech}</span>)}
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
            <UserBubble text={t('askExperience', locale)} />
            <div className="cl-block cl-msg-claude">
              <ClaudeAvatar />
              <SectionLabel title={t('experience', locale)} />
              {d.experience.map((exp, i) => (
                <div key={i} className="cl-work-item">
                  <div className="cl-work-top">
                    <span className="cl-work-company">{exp.company}</span>
                    <span className="cl-work-date">{exp.period}</span>
                  </div>
                  <div className="cl-work-role">{exp.position}</div>
                  {exp.overview && <div className="cl-work-desc">{exp.overview}</div>}
                  {exp.bullets && (
                    <ul className="cl-work-bullets">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Education */}
        {d.education && d.education.length > 0 && (
          <div className="cl-block cl-msg-claude">
            <SectionLabel title={t('education', locale)} />
            {d.education.map((edu, i) => (
              <div key={i} className="cl-edu-item">
                <div>
                  <div className="cl-edu-school">{edu.school}</div>
                  <div className="cl-edu-detail">{edu.degree} · {edu.major}</div>
                </div>
                <div className="cl-edu-date">{edu.period}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {d.skills && d.skills.length > 0 && (
          <div className="cl-block cl-msg-claude">
            <SectionLabel title={t('skills', locale)} />
            <div className="cl-skills-grid">
              {d.skills.map((skill, i) => <span key={i} className="cl-skill-pill">{skill}</span>)}
            </div>
          </div>
        )}

        {/* Appendix */}
        {d.appendix && d.appendix.length > 0 && (
          <>
            <UserBubble text={t('askAppendix', locale)} />
            <div className="cl-block cl-msg-claude">
              <ClaudeAvatar />
              <SectionLabel title={t('appendix', locale)} />
              {d.appendix.map((item, i) => (
                <div key={i} className="cl-appendix-card">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="cl-appendix-img" />
                  ) : (
                    <div className="cl-appendix-img-placeholder">📊 {t('imgPlaceholder', locale)}</div>
                  )}
                  <div className="cl-appendix-body">
                    <div className="cl-appendix-name">{item.title}</div>
                    {item.description && <div className="cl-appendix-desc">{item.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* End cursor */}
        <div className="cl-block cl-msg-claude">
          <div className="cl-end-line">
            {t('thanksReading', locale)}<span className="cl-cursor-blink" />
          </div>
        </div>

        {/* Footer */}
        <div className="cl-footer resume-footer">
          CRAFTED WITH CLAUDE STYLE
          <span className="cl-dot" />
          2026
        </div>
      </div>
    </div>
  );
}

const CLAUDE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');

.cl-root {
  --bg-primary: #F5F0E8;
  --bg-secondary: #EDE7DB;
  --bg-card: #FFFFFF;
  --bg-code: #F9F5ED;
  --text-primary: #1A1612;
  --text-secondary: #6B5E4F;
  --text-tertiary: #9A8C7B;
  --accent: #D97706;
  --accent-light: #FEF3C7;
  --border: #DDD5C8;
  --border-light: #EDE7DB;
  --font-display: 'Libre Baskerville', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.7;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

.cl-container { max-width: 780px; margin: 0 auto; padding: 40px 24px 80px; }

/* Top bar */
.cl-topbar {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 48px; padding-bottom: 20px;
  border-bottom: 1px solid var(--border-light);
}
.cl-topbar-logo {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #F59E0B);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cl-topbar-logo svg { width: 18px; height: 18px; fill: white; }
.cl-topbar-text { font-size: 13px; color: var(--text-tertiary); letter-spacing: 0.02em; }
.cl-topbar-text strong { color: var(--text-secondary); font-weight: 500; }

/* Message blocks */
.cl-block { margin-bottom: 36px; animation: cl-slideUp 0.5s ease both; }
.cl-block:nth-child(2) { animation-delay: 0.08s; }
.cl-block:nth-child(3) { animation-delay: 0.16s; }
.cl-block:nth-child(4) { animation-delay: 0.24s; }
.cl-block:nth-child(5) { animation-delay: 0.32s; }
.cl-block:nth-child(6) { animation-delay: 0.40s; }
.cl-block:nth-child(7) { animation-delay: 0.48s; }
.cl-block:nth-child(8) { animation-delay: 0.56s; }

.cl-msg-user { display: flex; justify-content: flex-end; margin-bottom: 32px; }
.cl-bubble {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 20px 20px 4px 20px; padding: 14px 20px;
  max-width: 70%; font-size: 14.5px; color: var(--text-primary);
  box-shadow: 0 1px 2px rgba(26,22,18,0.04);
}

.cl-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #F59E0B);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 12px; flex-shrink: 0;
}
.cl-avatar svg { width: 15px; height: 15px; fill: white; }

/* Header */
.cl-resume-name {
  font-family: var(--font-display); font-size: 42px; font-weight: 700;
  color: var(--text-primary); line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 6px;
}
.cl-resume-title { font-size: 17px; color: var(--accent); font-weight: 500; margin-bottom: 20px; }
.cl-contact-row { display: flex; flex-wrap: wrap; gap: 6px; }
.cl-contact-chip {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--bg-code); border: 1px solid var(--border-light);
  border-radius: 100px; padding: 5px 14px; font-size: 12.5px;
  color: var(--text-secondary); text-decoration: none;
  transition: all 0.2s ease; font-family: var(--font-mono);
}
.cl-contact-chip:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
.cl-contact-chip svg { width: 13px; height: 13px; opacity: 0.55; flex-shrink: 0; }
.cl-contact-chip:hover svg { opacity: 1; }

/* Section label */
.cl-section-label {
  font-family: var(--font-mono); font-size: 11.5px; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--text-tertiary); margin-bottom: 16px;
  display: flex; align-items: center; gap: 8px;
}
.cl-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border-light); }

/* Bio */
.cl-bio-text { font-size: 15.5px; line-height: 1.75; color: var(--text-primary); max-width: 640px; }

/* Project card */
.cl-project-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 12px; padding: 24px; margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(26,22,18,0.04);
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}
.cl-project-card:hover { box-shadow: 0 4px 12px rgba(26,22,18,0.06); border-color: var(--accent); }
.cl-project-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
.cl-project-name { font-family: var(--font-display); font-size: 18px; font-weight: 700; }
.cl-project-repo {
  font-family: var(--font-mono); font-size: 11.5px; color: var(--accent);
  text-decoration: none; background: var(--accent-light);
  padding: 3px 10px; border-radius: 100px; white-space: nowrap; transition: background 0.2s;
}
.cl-project-repo:hover { background: #FDE68A; }
.cl-project-summary { font-size: 14px; color: var(--text-secondary); margin-bottom: 14px; font-style: italic; font-family: var(--font-display); }
.cl-project-bullets { list-style: none; padding: 0; }
.cl-project-bullets li { position: relative; padding-left: 18px; margin-bottom: 8px; font-size: 14px; line-height: 1.65; }
.cl-project-bullets li::before { content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
.cl-tech-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-light); }
.cl-tech-tag { font-family: var(--font-mono); font-size: 11px; background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-secondary); padding: 3px 10px; border-radius: 4px; }

/* Work experience */
.cl-work-item {
  position: relative; padding-left: 24px; margin-bottom: 28px;
  padding-bottom: 28px; border-bottom: 1px solid var(--border-light);
}
.cl-work-item:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
.cl-work-item::before {
  content: ''; position: absolute; left: 0; top: 6px;
  width: 10px; height: 10px; border: 2px solid var(--accent);
  border-radius: 50%; background: var(--bg-primary);
}
.cl-work-item::after {
  content: ''; position: absolute; left: 4px; top: 20px;
  width: 2px; height: calc(100% - 14px); background: var(--border-light);
}
.cl-work-item:last-child::after { display: none; }
.cl-work-top { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px 16px; margin-bottom: 2px; }
.cl-work-company { font-family: var(--font-display); font-size: 17px; font-weight: 700; }
.cl-work-date { font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); }
.cl-work-role { font-size: 14px; color: var(--accent); font-weight: 500; margin-bottom: 10px; }
.cl-work-desc { font-size: 14px; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.6; }
.cl-work-bullets { list-style: none; padding: 0; }
.cl-work-bullets li { position: relative; padding-left: 16px; margin-bottom: 6px; font-size: 13.5px; line-height: 1.6; }
.cl-work-bullets li::before { content: '—'; position: absolute; left: 0; color: var(--text-tertiary); font-size: 12px; }

/* Education */
.cl-edu-item { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--border-light); }
.cl-edu-item:last-child { border-bottom: none; }
.cl-edu-school { font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 2px; }
.cl-edu-detail { font-size: 13.5px; color: var(--text-secondary); }
.cl-edu-date { font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); white-space: nowrap; padding-top: 3px; }

/* Skills */
.cl-skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.cl-skill-pill {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 100px; padding: 8px 18px; font-size: 13.5px;
  box-shadow: 0 1px 2px rgba(26,22,18,0.04); transition: all 0.2s ease;
}
.cl-skill-pill:hover { border-color: var(--accent); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,22,18,0.06); }

/* Appendix */
.cl-appendix-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
.cl-appendix-img { width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid var(--border-light); }
.cl-appendix-img-placeholder {
  width: 100%; height: 220px; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-code));
  color: var(--text-tertiary); font-size: 13px; font-family: var(--font-mono);
  border-bottom: 1px solid var(--border-light);
}
.cl-appendix-body { padding: 18px 22px; }
.cl-appendix-name { font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.cl-appendix-desc { font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; }

/* Footer & cursor */
.cl-end-line { display: flex; align-items: center; gap: 6px; color: var(--text-tertiary); font-size: 13px; font-family: var(--font-mono); }
.cl-cursor-blink { display: inline-block; width: 2px; height: 18px; background: var(--accent); animation: cl-blink 1s step-end infinite; }
.cl-footer {
  margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border-light);
  text-align: center; font-size: 12px; color: var(--text-tertiary);
  font-family: var(--font-mono); letter-spacing: 0.03em;
}
.cl-dot { display: inline-block; width: 4px; height: 4px; background: var(--accent); border-radius: 50%; margin: 0 10px; vertical-align: middle; }

.cl-root--dark {
  --bg-primary: #1a1612;
  --bg-secondary: #221e1a;
  --bg-card: #2a2622;
  --bg-code: #221e1a;
  --text-primary: #e8e0d8;
  --text-secondary: #a89e90;
  --text-tertiary: #7a7062;
  --accent: #f59e0b;
  --accent-light: #3a3020;
  --border: #4a4438;
  --border-light: #3a3428;
}

/* Animations */
@keyframes cl-slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cl-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
`;
