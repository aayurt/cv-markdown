import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';

function SectionLine({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h2 style={{
        fontSize: "13px", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.08em", color: "#000",
        margin: 0, padding: 0,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}>
        {title}
      </h2>
      <hr style={{ border: "none", borderTop: "1.5px solid #000", margin: "4px 0 0 0" }} />
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "6px",
      marginBottom: "2px", fontSize: "11.5px", lineHeight: 1.55,
      color: "#000", fontFamily: '"Times New Roman", Times, Georgia, serif',
    }}>
      <span style={{ flexShrink: 0 }}>•</span>
      <span>{text}</span>
    </div>
  );
}

function TechTags({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "3px", marginBottom: "4px" }}>
      {tags.map((t, i) => (
        <span key={i} style={{
          fontSize: "10px", color: "#333",
          fontFamily: '"Courier New", Courier, monospace',
        }}>
          {t}{i < tags.length - 1 ? <span style={{ color: "#999" }}>  |  </span> : null}
        </span>
      ))}
    </div>
  );
}

export default function PlainPreview({ data, locale = 'en' }: { data: ResumeData; locale?: Locale }) {
  const d = data;

  return (
    <div style={{
      background: "#fff",
      fontFamily: '"Times New Roman", Times, Georgia, serif',
      padding: "48px 52px",
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
          margin: 0, color: "#000",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}>
          {d.header.name}
        </h1>
        <p style={{
          fontSize: "12px", color: "#333", margin: "2px 0 0 0",
          fontFamily: '"Times New Roman", Times, Georgia, serif',
        }}>
          {d.header.title}
        </p>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0 16px",
          marginTop: "6px", fontSize: "10.5px", color: "#444",
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
            fontSize: "10px", fontWeight: 600, color: "#333",
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            textTransform: "uppercase", letterSpacing: "0.04em",
          }}>
            {d.header.status}
          </span>
        )}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #000", margin: "0 0 14px 0" }} />

      {/* Summary */}
      {d.summary && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('summary', locale)} />
          <p style={{
            fontSize: "11.5px", lineHeight: 1.55, color: "#000", margin: 0,
            fontFamily: '"Times New Roman", Times, Georgia, serif',
          }}>
            {d.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {d.experience && d.experience.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('experience', locale)} />
          {d.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                  <span style={{
                    fontSize: "12.5px", fontWeight: 700, color: "#000",
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}>
                    {exp.company}
                  </span>
                  <span style={{ fontSize: "11px", color: "#444", fontStyle: "italic" }}>
                    {exp.position}
                  </span>
                </div>
                <span style={{
                  fontSize: "10.5px", color: "#555",
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                }}>
                  {exp.period}
                </span>
              </div>
              {exp.overview && (
                <p style={{
                  fontSize: "11px", fontStyle: "italic", color: "#444",
                  margin: "2px 0 3px 0",
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                }}>
                  {exp.overview}
                </p>
              )}
              {exp.bullets && (
                <div style={{ marginTop: "2px" }}>
                  {exp.bullets.map((b, j) => (
                    <Bullet key={j} text={b} />
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
          <SectionLine title={t('projects', locale)} />
          {d.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                  <span style={{
                    fontSize: "12.5px", fontWeight: 700, color: "#000",
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}>
                    {proj.name}
                  </span>
                  {proj.repo && (
                    <span style={{ fontSize: "10px", color: "#555", fontFamily: '"Courier New", Courier, monospace' }}>
                      {proj.repo}
                    </span>
                  )}
                </div>
              </div>
              {proj.overview && (
                <p style={{
                  fontSize: "11px", fontStyle: "italic", color: "#444",
                  margin: "1px 0 2px 0",
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                }}>
                  {proj.overview}
                </p>
              )}
              {proj.bullets && (
                <div>
                  {proj.bullets.map((b, j) => (
                    <Bullet key={j} text={b} />
                  ))}
                </div>
              )}
              {proj.techStack && <TechTags tags={proj.techStack} />}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {d.education && d.education.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionLine title={t('education', locale)} />
          {d.education.map((edu, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "baseline", flexWrap: "wrap",
              marginBottom: "4px",
            }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "baseline" }}>
                <span style={{
                  fontSize: "12px", fontWeight: 700, color: "#000",
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                }}>
                  {edu.school}
                </span>
                <span style={{ fontSize: "11px", color: "#444", fontStyle: "italic" }}>
                  {edu.degree}{edu.major ? `, ${edu.major}` : ''}
                </span>
              </div>
              <span style={{
                fontSize: "10.5px", color: "#555",
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
          <SectionLine title={t('skills', locale)} />
          <p style={{
            fontSize: "11.5px", lineHeight: 1.6, color: "#000", margin: 0,
            fontFamily: '"Times New Roman", Times, Georgia, serif',
          }}>
            {d.skills.join(', ')}
          </p>
        </div>
      )}

      {/* Appendix */}
      {d.appendix && d.appendix.length > 0 && (
        <div>
          <SectionLine title={t('appendix', locale)} />
          {d.appendix.map((item, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <h4 style={{
                fontSize: "12px", fontWeight: 700, color: "#000", margin: "0 0 2px 0",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              }}>
                {item.title}
              </h4>
              {item.description && (
                <p style={{
                  fontSize: "11px", color: "#333", margin: "0",
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
