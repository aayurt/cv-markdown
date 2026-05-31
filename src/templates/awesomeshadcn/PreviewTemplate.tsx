import { useState } from "react";
import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';

// ── Inline SVG Icons ──
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function SectionChip({ label }: { label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px", borderRadius: "9999px",
      background: "#f4f4f5", border: "1px solid #e4e4e7",
      fontSize: "11px", fontWeight: 600, color: "#71717a",
      fontFamily: '"Inter", sans-serif', letterSpacing: "0.02em",
      textTransform: "uppercase",
    }}>
      {label}
    </div>
  );
}

function CardGridSection({ title, children, delay }: { title: React.ReactNode; children: React.ReactNode; delay: string }) {
  return (
    <div className="awesome-section" style={{
      marginBottom: "32px",
      animation: "fadeSlideUp 0.4s ease-out both",
      animationDelay: delay,
    }}>
      <div style={{ marginBottom: "14px" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function AwesomeShadcnPreview({ data, locale = 'en' }: { data: ResumeData; locale?: Locale }) {
  const d = data;
  const [hoveredProj, setHoveredProj] = useState<number | null>(null);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      display: "flex", justifyContent: "center",
      padding: "28px 16px",
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleBadge {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .awesome-card {
          animation: fadeSlideUp 0.35s ease-out both;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .awesome-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06);
          border-color: #d4d4d8 !important;
        }

        .awesome-tag {
          transition: all 0.15s ease;
        }
        .awesome-tag:hover {
          background: #18181b !important;
          color: #fafafa !important;
          border-color: #18181b !important;
        }

        .awesome-timeline-dot {
          transition: all 0.2s ease;
        }

        .awesome-badge {
          animation: scaleBadge 0.3s ease-out both;
        }

        @media print {
          body { background: white !important; }
          .awesome-card { box-shadow: none !important; border: 1px solid #e4e4e7 !important; }
        }
      `}</style>

      {/* Outer container */}
      <div style={{ width: "100%", maxWidth: "780px" }}>

        {/* ===== HERO HEADER ===== */}
        <div className="awesome-card" style={{
          borderRadius: "12px", border: "1px solid #e4e4e7",
          background: "linear-gradient(145deg, #fafafa 0%, #ffffff 100%)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          overflow: "hidden", marginBottom: "20px",
          animationDelay: "0s",
        }}>
          {/* Decorative top bar */}
          <div style={{
            height: "4px",
            background: "linear-gradient(90deg, #18181b 0%, #52525b 50%, #18181b 100%)",
          }} />

          <div style={{ padding: "28px 32px 24px" }}>
            {/* Name + Status Row */}
            <div style={{
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
            }}>
              <div>
                <h1 style={{
                  fontSize: "30px", fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15, color: "#18181b",
                  margin: 0, fontFamily: '"Inter", sans-serif',
                }}>
                  {d.header.name}
                </h1>
                <p style={{
                  fontSize: "15px", color: "#52525b",
                  marginTop: "4px", fontWeight: 400,
                  fontFamily: '"Inter", sans-serif',
                }}>
                  {d.header.title}
                </p>
              </div>
              {d.header.status && (
                <div className="awesome-badge" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "5px 14px", borderRadius: "9999px",
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  fontSize: "12px", fontWeight: 500, color: "#166534",
                  fontFamily: '"Inter", sans-serif',
                }}>
                  <span style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#22c55e", display: "inline-block",
                  }} />
                  {d.header.status}
                </div>
              )}
            </div>

            {/* Contact chips */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "8px",
              marginTop: "20px",
            }}>
              {d.header.github && (
                <a href={`https://${d.header.github}`} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px", borderRadius: "8px",
                    border: "1px solid #e4e4e7", background: "#ffffff",
                    fontSize: "13px", color: "#3f3f46",
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#a1a1aa"; e.currentTarget.style.background = "#fafafa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#ffffff"; }}
                >
                  <GithubIcon /> {d.header.github}
                </a>
              )}
              {d.header.website && (
                <a href={d.header.website.startsWith("http") ? d.header.website : `https://${d.header.website}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px", borderRadius: "8px",
                    border: "1px solid #e4e4e7", background: "#ffffff",
                    fontSize: "13px", color: "#3f3f46",
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#a1a1aa"; e.currentTarget.style.background = "#fafafa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#ffffff"; }}
                >
                  <GlobeIcon /> {d.header.website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {d.header.phone && (
                <a href={`tel:${d.header.phone.replace(/[-\s]/g, "")}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px", borderRadius: "8px",
                    border: "1px solid #e4e4e7", background: "#ffffff",
                    fontSize: "13px", color: "#3f3f46",
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#a1a1aa"; e.currentTarget.style.background = "#fafafa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#ffffff"; }}
                >
                  <PhoneIcon /> {d.header.phone}
                </a>
              )}
              {d.header.email && (
                <a href={`mailto:${d.header.email}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px", borderRadius: "8px",
                    border: "1px solid #e4e4e7", background: "#ffffff",
                    fontSize: "13px", color: "#3f3f46",
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#a1a1aa"; e.currentTarget.style.background = "#fafafa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#ffffff"; }}
                >
                  <MailIcon /> {d.header.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ===== BODY CONTENT ===== */}
        <div style={{ display: "flex", flexDirection: "column" }}>

          {/* Summary */}
          {d.summary && (
            <CardGridSection title={<SectionChip label={t('summary', locale)} />} delay="0.05s">
              <div className="awesome-card" style={{
                borderRadius: "10px", border: "1px solid #e4e4e7",
                background: "#ffffff", padding: "20px 24px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                animationDelay: "0.08s",
              }}>
                <p style={{
                  fontSize: "14px", lineHeight: 1.8,
                  color: "#3f3f46", margin: 0,
                }}>
                  {d.summary}
                </p>
              </div>
            </CardGridSection>
          )}

          {/* Projects */}
          {d.projects && d.projects.length > 0 && (
            <CardGridSection title={<SectionChip label={t('projects', locale)} />} delay="0.1s">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {d.projects.map((proj, i) => (
                  <div key={i}
                    className="awesome-card"
                    onMouseEnter={() => setHoveredProj(i)}
                    onMouseLeave={() => setHoveredProj(null)}
                    style={{
                      borderRadius: "10px", border: "1px solid",
                      borderColor: hoveredProj === i ? "#a1a1aa" : "#e4e4e7",
                      background: "#ffffff", padding: "20px 24px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                      animationDelay: `${0.12 + i * 0.04}s`,
                    }}
                  >
                    <div style={{
                      display: "flex", alignItems: "flex-start",
                      justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
                      marginBottom: "8px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: "32px", height: "32px", borderRadius: "8px",
                          background: hasGoodColor(i) ? projectColors[i % projectColors.length] : "#f4f4f5",
                          color: "#18181b", flexShrink: 0,
                        }}>
                          <FolderIcon />
                        </div>
                        <div>
                          <h3 style={{
                            fontSize: "15px", fontWeight: 600,
                            color: "#18181b", margin: 0,
                          }}>
                            {proj.name}
                          </h3>
                          {proj.repo && (
                            <a href={`https://${proj.repo}`} target="_blank" rel="noopener noreferrer"
                              style={{
                                display: "inline-flex", alignItems: "center", gap: "4px",
                                fontSize: "12px", color: "#71717a", textDecoration: "none",
                                fontFamily: '"JetBrains Mono", monospace', marginTop: "1px",
                              }}>
                              {proj.repo} <ExternalLinkIcon />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {proj.overview && (
                      <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#52525b", margin: "0 0 10px 0" }}>
                        {proj.overview}
                      </p>
                    )}

                    {proj.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px 0" }}>
                        {proj.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.7, color: "#3f3f46",
                            marginBottom: "3px",
                          }}>
                            <span style={{
                              width: "5px", height: "5px", borderRadius: "50%",
                              background: "#d4d4d8", flexShrink: 0, marginTop: "8px",
                            }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {proj.techStack && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {proj.techStack.map((tech, k) => (
                          <span key={k} className="awesome-tag" style={{
                            display: "inline-flex", alignItems: "center",
                            padding: "3px 10px", borderRadius: "6px",
                            fontSize: "11px", fontWeight: 500,
                            fontFamily: '"JetBrains Mono", monospace',
                            background: "#f4f4f5", color: "#52525b",
                            border: "1px solid #e4e4e7", cursor: "default",
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardGridSection>
          )}

          {/* Experience */}
          {d.experience && d.experience.length > 0 && (
            <CardGridSection title={<SectionChip label={t('experience', locale)} />} delay="0.15s">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {d.experience.map((exp, i) => (
                  <div key={i}
                    className="awesome-card"
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    style={{
                      borderRadius: "10px", border: "1px solid",
                      borderColor: hoveredExp === i ? "#a1a1aa" : "#e4e4e7",
                      background: "#ffffff", padding: "20px 24px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                      animationDelay: `${0.18 + i * 0.04}s`,
                    }}
                  >
                    <div style={{
                      display: "flex", alignItems: "flex-start",
                      justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
                      marginBottom: "4px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <div style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: "32px", height: "32px", borderRadius: "8px",
                          background: "#f4f4f5", flexShrink: 0,
                        }}>
                          <BriefcaseIcon />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <h3 style={{
                              fontSize: "15px", fontWeight: 600,
                              color: "#18181b", margin: 0,
                            }}>
                              {exp.company}
                            </h3>
                            <span style={{
                              display: "inline-flex", alignItems: "center",
                              padding: "2px 8px", borderRadius: "4px",
                              fontSize: "11px", fontWeight: 500,
                              background: "#f4f4f5", color: "#52525b",
                              border: "1px solid #e4e4e7",
                              fontFamily: '"Inter", sans-serif',
                            }}>
                              {exp.position}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: "12px", color: "#a1a1aa",
                        fontFamily: '"JetBrains Mono", monospace',
                        whiteSpace: "nowrap",
                      }}>
                        {exp.period}
                      </span>
                    </div>

                    {exp.overview && (
                      <p style={{ fontSize: "13px", color: "#71717a", margin: "6px 0 10px 40px" }}>
                        {exp.overview}
                      </p>
                    )}

                    {exp.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0 40px" }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.7, color: "#3f3f46",
                            marginBottom: "3px",
                          }}>
                            <span style={{
                              width: "5px", height: "5px", borderRadius: "50%",
                              background: "#d4d4d8", flexShrink: 0, marginTop: "8px",
                            }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </CardGridSection>
          )}

          {/* Education + Skills */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
            {/* Education */}
            {d.education && d.education.length > 0 && (
              <div className="awesome-section" style={{
                animation: "fadeSlideUp 0.4s ease-out both",
                animationDelay: "0.25s",
              }}>
                <div style={{ marginBottom: "14px" }}>
                  <SectionChip label={t('education', locale)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {d.education.map((edu, i) => (
                    <div key={i} className="awesome-card" style={{
                      borderRadius: "10px", border: "1px solid #e4e4e7",
                      background: "#ffffff", padding: "16px 18px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                      animationDelay: `${0.28 + i * 0.04}s`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <div style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: "28px", height: "28px", borderRadius: "6px",
                          background: "#f4f4f5", flexShrink: 0,
                        }}>
                          <GraduationCapIcon />
                        </div>
                        <h3 style={{
                          fontSize: "14px", fontWeight: 600, color: "#18181b", margin: 0,
                        }}>
                          {edu.school}
                        </h3>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginLeft: "38px" }}>
                        <span style={{
                          fontSize: "11px", fontWeight: 500,
                          padding: "1px 7px", borderRadius: "4px",
                          background: "#18181b", color: "#fafafa",
                        }}>
                          {edu.degree}
                        </span>
                        <span style={{ fontSize: "12.5px", color: "#52525b" }}>
                          {edu.major}
                        </span>
                        <span style={{
                          fontSize: "11px", color: "#a1a1aa",
                          fontFamily: '"JetBrains Mono", monospace',
                        }}>
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {d.skills && d.skills.length > 0 && (
              <div className="awesome-section" style={{
                animation: "fadeSlideUp 0.4s ease-out both",
                animationDelay: "0.3s",
              }}>
                <div style={{ marginBottom: "14px" }}>
                  <SectionChip label={t('skills', locale)} />
                </div>
                <div className="awesome-card" style={{
                  borderRadius: "10px", border: "1px solid #e4e4e7",
                  background: "#ffffff", padding: "16px 18px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                  animationDelay: "0.33s",
                }}>
                  <div style={{
                    display: "flex", flexWrap: "wrap", gap: "6px",
                  }}>
                    {d.skills.map((skill, i) => (
                      <span key={i} className="awesome-tag" style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "5px 12px", borderRadius: "6px",
                        fontSize: "12px", fontWeight: 500,
                        color: "#3f3f46", background: "#fafafa",
                        border: "1px solid #e4e4e7", cursor: "default",
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Appendix */}
          {d.appendix && d.appendix.length > 0 && (
            <CardGridSection title={<SectionChip label={t('appendix', locale)} />} delay="0.35s">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
                {d.appendix.map((item, i) => (
                  <div key={i} className="awesome-card" style={{
                    borderRadius: "10px", border: "1px solid #e4e4e7",
                    background: "#ffffff", overflow: "hidden",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                    animationDelay: `${0.38 + i * 0.05}s`,
                  }}>
                    <div style={{
                      padding: "14px 18px", borderBottom: "1px solid #e4e4e7",
                      background: "#fafafa",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div>
                        <h4 style={{
                          fontSize: "13.5px", fontWeight: 600,
                          color: "#18181b", margin: 0,
                        }}>
                          {item.title}
                        </h4>
                        {item.description && (
                          <p style={{ fontSize: "12px", color: "#71717a", margin: "2px 0 0" }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span style={{
                        fontSize: "10px", fontWeight: 600, color: "#a1a1aa",
                        fontFamily: '"JetBrains Mono", monospace',
                        padding: "2px 8px", borderRadius: "4px",
                        background: "#f4f4f5", border: "1px solid #e4e4e7",
                      }}>
                        #{i + 1}
                      </span>
                    </div>
                    <div style={{ padding: "4px" }}>
                      {!item.imageUrl ? (
                        <div style={{
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          minHeight: "180px", borderRadius: "6px",
                          background: "repeating-conic-gradient(#fafafa 0% 25%, transparent 0% 50%) 50% / 16px 16px",
                          color: "#a1a1aa", gap: "8px", border: "2px dashed #e4e4e7",
                        }}>
                          <ImagePlaceholderIcon />
                          <span style={{ fontSize: "12px", fontWeight: 500 }}>
                            {t('imgPasteHere', locale)}
                          </span>
                          <span style={{ fontSize: "10px", color: "#d4d4d8" }}>
                            {t('imgPlaceholder', locale)}
                          </span>
                        </div>
                      ) : (
                        <img src={item.imageUrl} alt={item.title}
                          style={{ width: "100%", borderRadius: "6px", display: "block" }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardGridSection>
          )}
        </div>


      </div>
    </div>
  );
}

// ── Helpers ──
const projectColors = ["#f4f4f5", "#fef2f2", "#f0f9ff", "#f5f3ff", "#fefce8", "#f0fdf4"];

function hasGoodColor(i: number): boolean {
  return i >= 0 && i < projectColors.length;
}
