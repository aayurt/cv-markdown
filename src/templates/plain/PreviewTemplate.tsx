import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';

interface SC {
  pageBg: string;
  cardBg: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  dimText: string;
  veryDimText: string;
  border: string;
  sectionLine: string;
  tagSeparator: string;
  tagText: string;
}

const LIGHT: SC = {
  pageBg: "#ffffff",
  cardBg: "#ffffff",
  headingText: "#000000",
  bodyText: "#000000",
  mutedText: "#333333",
  dimText: "#444444",
  veryDimText: "#555555",
  border: "#000000",
  sectionLine: "#000000",
  tagSeparator: "#999999",
  tagText: "#333333",
};

const DARK: SC = {
  pageBg: "#1a1a1a",
  cardBg: "#1a1a1a",
  headingText: "#e4e4e7",
  bodyText: "#d4d4d8",
  mutedText: "#a1a1aa",
  dimText: "#71717a",
  veryDimText: "#52525b",
  border: "#3f3f46",
  sectionLine: "#3f3f46",
  tagSeparator: "#52525b",
  tagText: "#a1a1aa",
};

function SectionLine({ title, c }: { title: string; c: SC }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h2 style={{
        fontSize: "13px", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.08em", color: c.headingText,
        margin: 0, padding: 0,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}>
        {title}
      </h2>
      <hr style={{ border: "none", borderTop: `1.5px solid ${c.sectionLine}`, margin: "4px 0 0 0" }} />
    </div>
  );
}

function Bullet({ text, c }: { text: string; c: SC }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "6px",
      marginBottom: "2px", fontSize: "11.5px", lineHeight: 1.55,
      color: c.bodyText, fontFamily: '"Times New Roman", Times, Georgia, serif',
    }}>
      <span style={{ flexShrink: 0 }}>•</span>
      <span>{text}</span>
    </div>
  );
}

function TechTags({ tags, c }: { tags: string[]; c: SC }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "3px", marginBottom: "4px" }}>
      {tags.map((t, i) => (
        <span key={i} style={{
          fontSize: "10px", color: c.tagText,
          fontFamily: '"Courier New", Courier, monospace',
        }}>
          {t}{i < tags.length - 1 ? <span style={{ color: c.tagSeparator }}>  |  </span> : null}
        </span>
      ))}
    </div>
  );
}

export default function PlainPreview({ data, locale = 'en', theme = 'dark' }: { data: ResumeData; locale?: Locale; theme?: 'light' | 'dark' }) {
  const d = data;
  const c = theme === 'dark' ? DARK : LIGHT;

  return (
    <div style={{
      background: c.pageBg,
      fontFamily: '"Times New Roman", Times, Georgia, serif',
      padding: "24px 28px",
      maxWidth: "700px",
      margin: "0 auto",
    }}>
      <style>{`
        @media print {
          @page { margin: 0.6in 0.8in; }
          body { font-size: 11pt; line-height: 1.4; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom: "18px" }}>
        <h1 style={{
          fontSize: "22px", fontWeight: 700, letterSpacing: "0.02em",
          margin: 0, color: c.headingText,
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}>
          {d.header.name}
        </h1>
        <p style={{
          fontSize: "12px", color: c.mutedText, margin: "2px 0 0 0",
          fontFamily: '"Times New Roman", Times, Georgia, serif',
        }}>
          {d.header.title}
        </p>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0 16px",
          marginTop: "6px", fontSize: "10.5px", color: c.dimText,
          fontFamily: '"Times New Roman", Times, Georgia, serif',
        }}>
          {d.header.phone && <span>{d.header.phone}</span>}
          {d.header.email && <span>{d.header.email}</span>}
          {d.header.github && <span>{d.header.github}</span>}
          {d.header.website && <span>{d.header.website}</span>}
        </div>
        {d.header.status && (
          <span style={{
            display: "inline-block", marginTop: "6px",
            fontSize: "10px", fontWeight: 600, color: c.dimText,
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            textTransform: "uppercase", letterSpacing: "0.04em",
          }}>
            {d.header.status}
          </span>
        )}
      </div>

      <hr style={{ border: "none", borderTop: `1px solid ${c.border}`, margin: "0 0 14px 0" }} />

      {/* Summary */}
      {d.summary && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('summary', locale)} c={c} />
          <p style={{
            fontSize: "11.5px", lineHeight: 1.55, color: c.bodyText, margin: 0,
            fontFamily: '"Times New Roman", Times, Georgia, serif',
          }}>
            {d.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {d.experience && d.experience.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('experience', locale)} c={c} />
          {d.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                  <span style={{
                    fontSize: "12.5px", fontWeight: 700, color: c.headingText,
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}>
                    {exp.company}
                  </span>
                  <span style={{ fontSize: "11px", color: c.dimText, fontStyle: "italic" }}>
                    {exp.position}
                  </span>
                </div>
                <span style={{
                  fontSize: "10.5px", color: c.veryDimText,
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                }}>
                  {exp.period}
                </span>
              </div>
              {exp.overview && (
                <p style={{
                  fontSize: "11px", fontStyle: "italic", color: c.dimText,
                  margin: "2px 0 3px 0",
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                }}>
                  {exp.overview}
                </p>
              )}
              {exp.bullets && (
                <div style={{ marginTop: "2px" }}>
                  {exp.bullets.map((b, j) => (
                    <Bullet key={j} text={b} c={c} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {d.projects && d.projects.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('projects', locale)} c={c} />
          {d.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                  <span style={{
                    fontSize: "12.5px", fontWeight: 700, color: c.headingText,
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}>
                    {proj.name}
                  </span>
                  {proj.repo && (
                    <span style={{ fontSize: "10px", color: c.veryDimText, fontFamily: '"Courier New", Courier, monospace' }}>
                      {proj.repo}
                    </span>
                  )}
                </div>
              </div>
              {proj.overview && (
                <p style={{
                  fontSize: "11px", fontStyle: "italic", color: c.dimText,
                  margin: "1px 0 2px 0",
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                }}>
                  {proj.overview}
                </p>
              )}
              {proj.bullets && (
                <div>
                  {proj.bullets.map((b, j) => (
                    <Bullet key={j} text={b} c={c} />
                  ))}
                </div>
              )}
              {proj.techStack && <TechTags tags={proj.techStack} c={c} />}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {d.education && d.education.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('education', locale)} c={c} />
          {d.education.map((edu, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "baseline", flexWrap: "wrap",
              marginBottom: "4px",
            }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                <span style={{
                  fontSize: "12px", fontWeight: 700, color: c.headingText,
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                }}>
                  {edu.school}
                </span>
                <span style={{ fontSize: "11px", color: c.dimText, fontStyle: "italic" }}>
                  {edu.degree}{edu.major ? `, ${edu.major}` : ''}
                </span>
              </div>
              <span style={{
                fontSize: "10.5px", color: c.veryDimText,
                fontFamily: '"Times New Roman", Times, Georgia, serif',
              }}>
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {d.skills && d.skills.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('skills', locale)} c={c} />
          <p style={{
            fontSize: "11.5px", lineHeight: 1.6, color: c.bodyText, margin: 0,
            fontFamily: '"Times New Roman", Times, Georgia, serif',
          }}>
            {d.skills.join(', ')}
          </p>
        </div>
      )}

      {/* Appendix */}
      {d.appendix && d.appendix.length > 0 && (
        <div>
          <SectionLine title={t('appendix', locale)} c={c} />
          {d.appendix.map((item, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <h4 style={{
                fontSize: "12px", fontWeight: 700, color: c.headingText, margin: "0 0 2px 0",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              }}>
                {item.title}
              </h4>
              {item.description && (
                <p style={{
                  fontSize: "11px", color: c.mutedText, margin: "0",
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                }}>
                  {item.description}
                </p>
              )}
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title}
                  style={{ maxWidth: "100%", marginTop: "4px" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
