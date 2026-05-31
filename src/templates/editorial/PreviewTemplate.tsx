import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';

function Tag({ children, dark }: { children: string; dark?: boolean }) {
  return <span className={`ed-tag${dark ? " ed-tag--dark" : ""}`}>{children}</span>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ed-bullets">
      {items.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  );
}

function TechRow({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="ed-tech-row">
      {items.map((tech, i) => <span key={i} className="ed-tech-chip">{tech}</span>)}
    </div>
  );
}

function ContactItem({ icon, href, children }: { icon: string; href?: string; children: string }) {
  const inner = (<><span className="ed-contact-icon">{icon}</span>{children}</>);
  if (href) return <a className="ed-contact-item" href={href} target="_blank" rel="noreferrer">{inner}</a>;
  return <span className="ed-contact-item">{inner}</span>;
}

export default function EditorialPreview({ data, locale = 'en', theme = 'dark' }: { data: ResumeData; locale?: Locale; theme?: 'light' | 'dark' }) {
  const h = data.header;
  const SPANS = { pair: [7, 5], pairFlip: [5, 7] };

  const projectRows = () => {
    if (!data.projects?.length) return null;
    const rows: React.ReactNode[] = [];
    for (let i = 0; i < data.projects.length; i += 2) {
      const flip = (i / 2) % 2 === 1;
      const spans = flip ? SPANS.pairFlip : SPANS.pair;
      const p1 = data.projects[i], p2 = data.projects[i + 1];
      rows.push(
        <div className="ed-section" key={`proj-${i}`}>
          <div className={`ed-card ed-span-${p2 ? spans[0] : 12}`}>
            <Tag>Project</Tag>
            <div className="ed-project__head">
              <span className="ed-project__name">{p1.name}</span>
              {p1.repo && <a className="ed-project__link" href={`https://${p1.repo}`} target="_blank" rel="noreferrer">↗ Repo</a>}
            </div>
            {p1.overview && <p className="ed-project__summary">{p1.overview}</p>}
            {p1.bullets && <Bullets items={p1.bullets} />}
            {p1.techStack && <TechRow items={p1.techStack} />}
          </div>
          {p2 && (
            <div className={`ed-card ed-span-${spans[1]}`}>
              <Tag>Project</Tag>
              <div className="ed-project__head">
                <span className="ed-project__name">{p2.name}</span>
                {p2.repo && <a className="ed-project__link" href={`https://${p2.repo}`} target="_blank" rel="noreferrer">↗ Repo</a>}
              </div>
              {p2.overview && <p className="ed-project__summary">{p2.overview}</p>}
              {p2.bullets && <Bullets items={p2.bullets} />}
              {p2.techStack && <TechRow items={p2.techStack} />}
            </div>
          )}
        </div>
      );
    }
    return rows;
  };

  const workRows = () => {
    if (!data.experience?.length) return null;
    const rows: React.ReactNode[] = [];
    const q = [...data.experience];
    let idx = 0;
    while (q.length > 0) {
      const cur = q.shift()!;
      if (cur.bullets?.length) {
        const ci = q.findIndex(w => !w.bullets?.length);
        const compact = ci !== -1 ? q.splice(ci, 1)[0] : null;
        rows.push(
          <div className="ed-section" key={`work-${idx}`}>
            <div className={`ed-card ed-card--work-detailed ed-span-${compact ? 8 : 12}`}>
              <Tag>Experience</Tag>
              <div className="ed-work__company">{cur.company}</div>
              <div className="ed-work__meta">
                <span className="ed-work__role">{cur.position}</span>
                <span className="ed-work__sep">·</span><span>{cur.period}</span>
              </div>
              {cur.overview && <p className="ed-work__summary">{cur.overview}</p>}
              <Bullets items={cur.bullets} />
            </div>
            {compact && (
              <div className="ed-card ed-card--compact ed-span-4">
                <Tag>Intern</Tag>
                <div className="ed-compact__company">{compact.company}</div>
                <div className="ed-compact__role">{compact.position}</div>
                <div className="ed-compact__time">{compact.period}</div>
              </div>
            )}
          </div>
        );
      } else {
        rows.push(
          <div className="ed-section" key={`work-${idx}`}>
            <div className="ed-card ed-card--compact ed-span-4">
              <Tag>Experience</Tag>
              <div className="ed-compact__company">{cur.company}</div>
              <div className="ed-compact__role">{cur.position}</div>
              <div className="ed-compact__time">{cur.period}</div>
            </div>
          </div>
        );
      }
      idx++;
    }
    return rows;
  };

  return (
    <div className={`ed-wrapper${theme === 'dark' ? ' ed-wrapper--dark' : ''}`}>
      <style>{EDITORIAL_CSS + (theme === 'dark' ? EDITORIAL_CSS_DARK : '') + EDITORIAL_CSS_2}</style>
      <div className="ed-page">
        {/* Masthead */}
        <div className="ed-masthead">
          <div className="ed-masthead__name">{h.name}</div>
          <div className="ed-masthead__subtitle">{h.title}</div>
          <div className="ed-masthead__rule">{h.status || "Resume"}</div>
        </div>

        {/* Hero + Contact */}
        <div className="ed-section">
          <div className="ed-card ed-card--hero ed-span-8">
            <Tag dark>Profile</Tag>
            <div className="ed-hero__headline">{t('jobIntention', locale)}</div>
            <div className="ed-hero__name">{h.title}</div>
            {h.status && (
              <div className="ed-hero__badge"><span className="ed-hero__badge-dot" />{h.status}</div>
            )}
          </div>
          <div className="ed-card ed-card--contact ed-span-4">
            <Tag>Contact</Tag>
            <ul className="ed-contact-list">
              {h.github && <ContactItem icon="⌘" href={`https://${h.github}`}>{h.github}</ContactItem>}
              {h.website && <ContactItem icon="◎" href={`https://${h.website}`}>{h.website}</ContactItem>}
              {h.phone && <ContactItem icon="☎">{h.phone}</ContactItem>}
              {h.email && <ContactItem icon="✉" href={`mailto:${h.email}`}>{h.email}</ContactItem>}
            </ul>
          </div>
        </div>

        {/* Bio + Skills */}
        {(data.summary || data.skills?.length) && (
          <div className="ed-section">
            {data.summary && (
              <div className={`ed-card ed-span-${data.skills?.length ? 7 : 12}`}>
                <Tag>About</Tag>
                <p className="ed-bio-text">{data.summary}</p>
              </div>
            )}
            {data.skills && data.skills.length > 0 && (
              <div className={`ed-card ed-card--skills-red ed-span-${data.summary ? 5 : 12}`}>
                <Tag dark>Skills</Tag>
                <div className="ed-skills-wrap">
                  {data.skills.map((s, i) => <span key={i} className="ed-skill-pill">{s}</span>)}
                </div>
              </div>
            )}
          </div>
        )}

        {projectRows()}
        {workRows()}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="ed-section">
            {data.education.map((edu, i) => {
              const span = data.education!.length === 1 ? 5 : data.education!.length === 2 ? (i === 0 ? 5 : 7) : 4;
              return (
                <div key={i} className={`ed-card ed-span-${span}`}>
                  <Tag>Education</Tag>
                  <div className="ed-edu__school">{edu.school}</div>
                  <div className="ed-edu-rows">
                    <div className="ed-edu-row"><span className="ed-edu-key">{t('degree', locale)}</span><span className="ed-edu-val">{edu.degree}</span></div>
                    <div className="ed-edu-row"><span className="ed-edu-key">{t('major', locale)}</span><span className="ed-edu-val">{edu.major}</span></div>
                    <div className="ed-edu-row"><span className="ed-edu-key">{t('period', locale)}</span><span className="ed-edu-val">{edu.period}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Appendix */}
        {data.appendix && data.appendix.length > 0 && (() => {
          const rows: React.ReactNode[] = [];
          for (let i = 0; i < data.appendix.length; i += 2) {
            const spans = data.appendix.length === 1 ? [12] : (i / 2) % 2 === 0 ? [7, 5] : [5, 7];
            const a1 = data.appendix[i], a2 = data.appendix[i + 1];
            rows.push(
              <div className="ed-section" key={`app-${i}`}>
                <div className={`ed-card ed-span-${a2 ? spans[0] : 12}`}>
                  <Tag>Appendix</Tag>
                  <div className="ed-appendix__title">{a1.title}</div>
                  {a1.description && <p className="ed-appendix__desc">{a1.description}</p>}
                  {a1.imageUrl ? <img className="ed-appendix__img" src={a1.imageUrl} alt={a1.title} /> : <div className="ed-appendix__placeholder">Image Placeholder</div>}
                </div>
                {a2 && (
                  <div className={`ed-card ed-span-${spans[1]}`}>
                    <Tag>Appendix</Tag>
                    <div className="ed-appendix__title">{a2.title}</div>
                    {a2.description && <p className="ed-appendix__desc">{a2.description}</p>}
                    {a2.imageUrl ? <img className="ed-appendix__img" src={a2.imageUrl} alt={a2.title} /> : <div className="ed-appendix__placeholder">Image Placeholder</div>}
                  </div>
                )}
              </div>
            );
          }
          return rows;
        })()}

        <div className="ed-colophon">Typeset with care</div>
      </div>
    </div>
  );
}

const EDITORIAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:wght@400;500;600&display=swap');

.ed-wrapper {
  --bg: #f5f0e8;
  --bg-paper: #fffdf8;
  --bg-paper-alt: #f9f5ed;
  --bg-ink: #1a1714;
  --bg-red: #c03020;
  --bg-red-soft: rgba(192, 48, 32, 0.06);
  --text-1: #1a1714;
  --text-2: #4a453d;
  --text-3: #8a8478;
  --text-red: #c03020;
  --text-on-ink: #f5f0e8;
  --border: #ddd6c8;
  --border-strong: #c8c0b0;
  --rule: #1a1714;
  --rule-light: #c8c0b0;
  --shadow-paper: 0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05);
  --shadow-paper-hover: 0 2px 4px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.07);
  --r: 4px;
  --r-sm: 3px;
  --gap: 10px;
  --pad: 24px;
  --pad-sm: 18px;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Source Serif 4', serif;
  --font-sans: 'DM Sans', sans-serif;

  background: var(--bg);
  color: var(--text-1);
  font-family: var(--font-body);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  position: relative;
}

.ed-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 10;
}

.ed-page {
  max-width: 794px;
  margin: 0 auto;
  padding: 20px 20px 0;
  position: relative;
  z-index: 1;
}

/* Masthead */
.ed-masthead {
  text-align: center;
  padding: 20px 0 16px;
  margin-bottom: 6px;
  border-bottom: 3px double var(--rule);
  position: relative;
}
.ed-masthead::before {
  content: '';
  display: block;
  height: 3px;
  background: var(--bg-red);
  margin-bottom: 16px;
}
.ed-masthead__name {
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 800;
  letter-spacing: 2px;
  line-height: 1.1;
  color: var(--text-1);
  text-transform: uppercase;
}
.ed-masthead__subtitle {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-3);
  margin-top: 8px;
}
.ed-masthead__rule {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 14px;
  font-family: var(--font-sans);
  font-size: 10px;
  color: var(--text-3);
  letter-spacing: 1px;
}
.ed-masthead__rule::before,
.ed-masthead__rule::after {
  content: '';
  flex: 1;
  height: 0.5px;
  background: var(--rule-light);
}
`;

const EDITORIAL_CSS_DARK = `
.ed-wrapper--dark {
  --bg: #141210;
  --bg-paper: #1e1c18;
  --bg-paper-alt: #24221e;
  --bg-ink: #0a0a08;
  --text-1: #e0d8cc;
  --text-2: #a8a090;
  --text-3: #7a7262;
  --border: #3a3632;
  --border-strong: #5a5650;
  --rule: #e0d8cc;
  --rule-light: #3a3632;
  --shadow-paper: 0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.3);
  --shadow-paper-hover: 0 2px 4px rgba(0,0,0,0.25), 0 8px 32px rgba(0,0,0,0.35);
}
`;

const EDITORIAL_CSS_2 = `
/* Section grid */
.ed-section {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap);
  margin-bottom: var(--gap);
}

/* Card */
.ed-card {
  background: var(--bg-paper);
  border-radius: var(--r);
  padding: var(--pad);
  box-shadow: var(--shadow-paper);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
}
.ed-card:hover {
  box-shadow: var(--shadow-paper-hover);
  transform: translateY(-1px);
}

/* Span helpers */
.ed-span-12 { grid-column: span 12; }
.ed-span-8  { grid-column: span 8; }
.ed-span-7  { grid-column: span 7; }
.ed-span-6  { grid-column: span 6; }
.ed-span-5  { grid-column: span 5; }
.ed-span-4  { grid-column: span 4; }
.ed-span-3  { grid-column: span 3; }

/* Tag */
.ed-tag {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--text-red);
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  display: block;
}
.ed-tag--dark {
  color: rgba(255,255,255,0.4);
  border-color: rgba(255,255,255,0.12);
}

/* Hero */
.ed-card--hero {
  background: var(--bg-ink);
  color: var(--text-on-ink);
  padding: 30px var(--pad) 28px;
}
.ed-card--hero::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--bg-red);
}
.ed-hero__headline {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 400;
  font-style: italic;
  color: rgba(255,255,255,0.5);
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}
.ed-hero__name {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}
.ed-hero__title {
  font-family: var(--font-body);
  font-size: 14px;
  color: rgba(255,255,255,0.55);
}
.ed-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 16px;
  padding: 4px 14px;
  background: var(--bg-red);
  border-radius: 2px;
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
}
.ed-hero__badge-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #fff;
  animation: ed-blink 2s ease-in-out infinite;
}
@keyframes ed-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Contact */
.ed-card--contact { background: var(--bg-paper-alt); }
.ed-contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ed-contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sans);
  font-size: 11.5px;
  color: var(--text-2);
  text-decoration: none;
  padding: 5px 6px;
  border-radius: 3px;
  transition: background 0.2s, color 0.2s;
}
a.ed-contact-item:hover {
  background: var(--bg-red-soft);
  color: var(--text-red);
}
.ed-contact-icon {
  width: 26px; height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-red-soft);
  color: var(--text-red);
  border-radius: 3px;
  font-size: 11px;
  flex-shrink: 0;
}

/* Bio */
.ed-bio-text {
  font-family: var(--font-body);
  font-size: 13.5px;
  line-height: 1.9;
  color: var(--text-2);
}
.ed-bio-text::first-letter {
  font-family: var(--font-display);
  float: left;
  font-size: 48px;
  font-weight: 700;
  line-height: 0.85;
  padding-right: 8px;
  padding-top: 4px;
  color: var(--text-red);
}

/* Skills red card */
.ed-card--skills-red {
  background: var(--bg-red);
  color: #fff;
}
.ed-card--skills-red .ed-tag {
  color: rgba(255,255,255,0.45);
  border-color: rgba(255,255,255,0.15);
}
.ed-skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.ed-skill-pill {
  padding: 5px 14px;
  border-radius: 2px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  transition: transform 0.2s;
}
.ed-skill-pill:hover { transform: translateY(-1px); }

/* Project */
.ed-project__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.ed-project__name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--text-1);
  letter-spacing: -0.2px;
}
.ed-project__link {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 600;
  color: var(--text-3);
  text-decoration: none;
  padding: 3px 9px;
  border: 1px solid var(--border-strong);
  border-radius: 2px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.ed-project__link:hover {
  border-color: var(--text-red);
  color: var(--text-red);
}
.ed-project__summary {
  font-family: var(--font-body);
  font-size: 12px;
  font-style: italic;
  color: var(--text-3);
  margin-bottom: 12px;
  line-height: 1.6;
}

/* Bullets */
.ed-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
  margin: 0;
}
.ed-bullets li {
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-2);
  padding-left: 14px;
  position: relative;
}
.ed-bullets li::before {
  content: '■';
  position: absolute;
  left: 0; top: 0;
  font-size: 5px;
  line-height: 2.6;
  color: var(--text-red);
}

/* Tech chips */
.ed-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 12px;
}
.ed-tech-chip {
  padding: 2px 9px;
  background: var(--bg-red-soft);
  border-radius: 2px;
  font-family: var(--font-sans);
  font-size: 9.5px;
  font-weight: 600;
  color: var(--text-red);
  letter-spacing: 0.3px;
}

/* Work */
.ed-work__company {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 3px;
  letter-spacing: -0.2px;
}
.ed-work__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--text-3);
  margin-bottom: 10px;
}
.ed-work__role { color: var(--text-2); font-weight: 500; }
.ed-work__sep { opacity: 0.3; }
.ed-work__summary {
  font-family: var(--font-body);
  font-size: 12.5px;
  color: var(--text-2);
  margin-bottom: 10px;
  line-height: 1.75;
  font-style: italic;
}
.ed-card--work-detailed .ed-bullets {
  column-count: 2;
  column-gap: 24px;
  column-rule: 0.5px solid var(--border);
}
.ed-card--work-detailed .ed-bullets li {
  break-inside: avoid;
  margin-bottom: 6px;
}

/* Compact work card */
.ed-card--compact {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--bg-paper-alt);
  border-left: 3px solid var(--bg-red);
}
.ed-compact__company {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
}
.ed-compact__role {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--text-2);
}
.ed-compact__time {
  font-family: var(--font-sans);
  font-size: 10.5px;
  color: var(--text-3);
  margin-top: 4px;
}

/* Education */
.ed-edu__school {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
}
.ed-edu-rows { display: flex; flex-direction: column; gap: 5px; }
.ed-edu-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 12px;
}
.ed-edu-key {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-3);
  width: 36px;
  flex-shrink: 0;
}
.ed-edu-val {
  font-family: var(--font-body);
  color: var(--text-2);
}

/* Appendix */
.ed-appendix__title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}
.ed-appendix__desc {
  font-family: var(--font-body);
  font-size: 12px;
  font-style: italic;
  color: var(--text-3);
  margin-bottom: 14px;
  line-height: 1.65;
}
.ed-appendix__img {
  width: 100%;
  border-radius: var(--r-sm);
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid var(--border);
}
.ed-appendix__placeholder {
  width: 100%;
  border-radius: var(--r-sm);
  aspect-ratio: 2.2 / 1;
  background: repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(192,48,32,0.03) 8px, rgba(192,48,32,0.03) 16px);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--text-3);
}

/* Colophon */
.ed-colophon {
  text-align: center;
  padding: 24px 0 48px;
  font-family: var(--font-sans);
  font-size: 9px;
  color: var(--text-3);
  letter-spacing: 3px;
  text-transform: uppercase;
  border-top: 1px solid var(--border);
  margin-top: 8px;
}
`;
