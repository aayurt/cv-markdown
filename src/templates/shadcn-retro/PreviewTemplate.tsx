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

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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

function ZapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
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

// ── Retro Section Header ──
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "26px", height: "26px",
        border: "2px solid #ffb000", color: "#ffb000",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: "13px", fontWeight: 400, letterSpacing: "0.15em",
        textTransform: "uppercase", color: "#ffb000", margin: 0,
        fontFamily: '"VT323", "JetBrains Mono", monospace',
      }}>
        {'> '}{title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "rgba(255,176,0,0.25)", marginLeft: "4px" }} />
    </div>
  );
}

// ── Retro Contact Chip (dark header) ──
function RetroContactChip({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "4px 10px",
        border: "1px solid rgba(255,176,0,0.3)",
        fontSize: "12px", color: "#d4a040",
        background: "rgba(255,176,0,0.05)",
        cursor: href ? "pointer" : "default",
        transition: "all 0.15s",
        textDecoration: "none",
        fontFamily: '"JetBrains Mono", monospace',
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.background = "rgba(255,176,0,0.12)";
        e.currentTarget.style.color = "#ffb000";
        e.currentTarget.style.borderColor = "rgba(255,176,0,0.6)";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.background = "rgba(255,176,0,0.05)";
        e.currentTarget.style.color = "#d4a040";
        e.currentTarget.style.borderColor = "rgba(255,176,0,0.3)";
      }}
    >
      <span style={{ display: "flex", color: "#b8860b" }}>{icon}</span>
      {text}
    </Tag>
  );
}

export default function ShadcnRetroPreview({ data, locale = 'en' }: { data: ResumeData; locale?: Locale }) {
  const d = data;
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex", justifyContent: "center", padding: "40px 16px",
      fontFamily: '"JetBrains Mono", "Source Code Pro", monospace',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=JetBrains+Mono:wght@400;500;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes flicker {
          0% { opacity: 0.97; }
          50% { opacity: 1; }
          100% { opacity: 0.97; }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 4px #ffb000, 0 0 8px rgba(255,176,0,0.3); }
          50% { text-shadow: 0 0 6px #ffb000, 0 0 12px rgba(255,176,0,0.4); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .resume-card {
          animation: flicker 4s infinite;
        }

        .section-block {
          animation: fadeInUp 0.4s ease-out both;
        }

        .resume-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,176,0,0.015) 2px,
            rgba(255,176,0,0.015) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .crt-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .glow-text {
          animation: glow 3s infinite;
        }

        .retro-bullet {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #ffb000;
          margin-right: 8px;
          flex-shrink: 0;
          margin-top: 7px;
        }

        .chunky-border {
          border: 2px solid #ffb000;
          box-shadow: 3px 3px 0 rgba(255,176,0,0.15);
        }

        @media print {
          body { background: #0a0a0a !important; }
          .resume-card { box-shadow: none !important; }
          .crt-overlay { display: none !important; }
          .resume-card::before { display: none !important; }
        }
      `}</style>

      <div className="resume-card" style={{
        width: "100%", maxWidth: "720px",
        background: "#0d0d0d",
        border: "2px solid rgba(255,176,0,0.3)",
        boxShadow: "0 0 20px rgba(255,176,0,0.05), inset 0 0 60px rgba(255,176,0,0.02)",
        position: "relative", overflow: "hidden",
      }}>
        {/* CRT overlay */}
        <div className="crt-overlay" />

        {/* HEADER */}
        <div style={{
          padding: "32px 36px 28px",
          borderBottom: "2px solid rgba(255,176,0,0.2)",
          background: "linear-gradient(180deg, #0d0d0d 0%, #111105 100%)",
          color: "#e0b050", position: "relative",
        }}>
          <div style={{ position: "relative", zIndex: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h1 style={{
                  fontSize: "36px", fontWeight: 400, letterSpacing: "0.02em",
                  lineHeight: 1, margin: 0,
                  fontFamily: '"VT323", monospace',
                  color: "#ffb000",
                }}>
                  {'> '}{d.header.name}
                </h1>
                <p className="glow-text" style={{
                  fontSize: "14px", fontWeight: 400, color: "#d4a040",
                  letterSpacing: "0.05em", marginTop: "6px",
                  fontFamily: '"VT323", monospace',
                }}>
                  {d.header.title}
                </p>
              </div>
              {d.header.status && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "4px 12px",
                  border: "1px solid rgba(255,176,0,0.25)",
                  fontSize: "11px", color: "#d4a040",
                  fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: "0.05em",
                }}>
                  <span style={{
                    width: "6px", height: "6px",
                    background: "#22c55e", display: "inline-block",
                  }} />
                  <span>{d.header.status}</span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px" }}>
              {d.header.github && <RetroContactChip icon={<GithubIcon />} text={d.header.github} href={`https://${d.header.github}`} />}
              {d.header.website && <RetroContactChip icon={<GlobeIcon />} text={d.header.website} href={d.header.website.startsWith("http") ? d.header.website : `https://${d.header.website}`} />}
              {d.header.phone && <RetroContactChip icon={<PhoneIcon />} text={d.header.phone} />}
              {d.header.email && <RetroContactChip icon={<MailIcon />} text={d.header.email} href={`mailto:${d.header.email}`} />}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ padding: "28px 36px 36px", position: "relative", zIndex: 0 }}>
          {/* Summary */}
          {d.summary && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.1s" }}>
              <SectionHeader icon={<UserIcon />} title={t('summary', locale)} />
              <p style={{
                fontSize: "12.5px", lineHeight: 1.8, color: "#c0b080",
                paddingLeft: "38px", fontFamily: '"JetBrains Mono", monospace',
              }}>
                {d.summary}
              </p>
            </div>
          )}

          {/* Projects */}
          {d.projects && d.projects.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.2s" }}>
              <SectionHeader icon={<FolderIcon />} title={t('projects', locale)} />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "38px" }}>
                {d.projects.map((proj, i) => (
                  <div key={i}
                    onMouseEnter={() => setHoveredProject(i)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      padding: "14px 16px",
                      border: "1px solid",
                      borderColor: hoveredProject === i ? "rgba(255,176,0,0.6)" : "rgba(255,176,0,0.15)",
                      background: hoveredProject === i ? "rgba(255,176,0,0.04)" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                      <h3 style={{
                        fontSize: "14px", fontWeight: 500, color: "#ffb000",
                        fontFamily: '"VT323", monospace', letterSpacing: "0.02em",
                      }}>
                        {'>'} {proj.name}
                      </h3>
                      {proj.repo && (
                        <a href={`https://${proj.repo}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#8a7540", textDecoration: "none", fontFamily: '"JetBrains Mono", monospace' }}>
                          <GithubIcon /> {proj.repo.split("/").slice(-1)[0]} <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                    {proj.overview && <p style={{ fontSize: "12px", color: "#8a7540", marginBottom: "8px" }}>{'> '}{proj.overview}</p>}
                    {proj.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 10px 0" }}>
                        {proj.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start",
                            fontSize: "12px", lineHeight: 1.7, color: "#c0b080",
                            marginBottom: "3px",
                          }}>
                            <span className="retro-bullet" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {proj.techStack && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {proj.techStack.map((tech, k) => (
                          <span key={k} style={{
                            display: "inline-flex", alignItems: "center", padding: "2px 8px",
                            fontSize: "10px", fontWeight: 400, letterSpacing: "0.05em",
                            fontFamily: '"JetBrains Mono", monospace',
                            border: "1px solid rgba(255,176,0,0.2)", color: "#8a7540",
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {d.experience && d.experience.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.3s" }}>
              <SectionHeader icon={<BriefcaseIcon />} title={t('experience', locale)} />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "38px" }}>
                {d.experience.map((exp, i) => (
                  <div key={i}
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    style={{
                      position: "relative", paddingLeft: "20px",
                      borderLeft: "2px solid",
                      borderColor: hoveredExp === i ? "#ffb000" : "rgba(255,176,0,0.2)",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <div style={{
                      position: "absolute", left: "-6px", top: "4px",
                      width: "10px", height: "10px",
                      background: hoveredExp === i ? "#ffb000" : "transparent",
                      border: "2px solid",
                      borderColor: hoveredExp === i ? "#ffb000" : "rgba(255,176,0,0.3)",
                      transition: "all 0.2s ease",
                    }} />
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <h3 style={{
                          fontSize: "14px", fontWeight: 500, color: "#ffb000",
                          fontFamily: '"VT323", monospace',
                        }}>
                          {'>'} {exp.company}
                        </h3>
                        <span style={{
                          fontSize: "10px", letterSpacing: "0.1em",
                          color: "#0a0a0a", background: "#d4a040",
                          padding: "1px 8px", fontWeight: 500,
                          fontFamily: '"JetBrains Mono", monospace',
                          textTransform: "uppercase",
                        }}>
                          {exp.position}
                        </span>
                      </div>
                      <span style={{
                        fontSize: "11px", color: "#8a7540",
                        fontFamily: '"JetBrains Mono", monospace',
                      }}>
                        {exp.period}
                      </span>
                    </div>
                    {exp.overview && <p style={{ fontSize: "12px", color: "#8a7540", margin: "2px 0 8px" }}>{'> '}{exp.overview}</p>}
                    {exp.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start",
                            fontSize: "12px", lineHeight: 1.7, color: "#c0b080", marginBottom: "2px",
                          }}>
                            <span className="retro-bullet" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {d.education && d.education.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.4s" }}>
              <SectionHeader icon={<GraduationCapIcon />} title={t('education', locale)} />
              <div style={{ paddingLeft: "38px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {d.education.map((edu, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: "8px", padding: "10px 14px",
                    border: "1px solid rgba(255,176,0,0.12)",
                    background: "rgba(255,176,0,0.02)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h3 style={{
                        fontSize: "13px", fontWeight: 500, color: "#e0b050",
                        fontFamily: '"VT323", monospace',
                      }}>
                        {'>'} {edu.school}
                      </h3>
                      <span style={{
                        fontSize: "10px", letterSpacing: "0.08em",
                        color: "#0a0a0a", background: "#8a7540",
                        padding: "1px 7px", fontWeight: 500,
                        fontFamily: '"JetBrains Mono", monospace',
                      }}>
                        {edu.degree}
                      </span>
                      <span style={{ fontSize: "12px", color: "#8a7540", fontFamily: '"JetBrains Mono", monospace' }}>
                        {edu.major}
                      </span>
                    </div>
                    <span style={{
                      fontSize: "11px", color: "#6a5530",
                      fontFamily: '"JetBrains Mono", monospace',
                    }}>
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {d.skills && d.skills.length > 0 && (
            <div className="section-block" style={{ animationDelay: "0.5s" }}>
              <SectionHeader icon={<ZapIcon />} title={t('skills', locale)} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "38px" }}>
                {d.skills.map((skill, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", padding: "5px 12px",
                    fontSize: "11px", color: "#c0b080",
                    border: "1px solid rgba(255,176,0,0.2)",
                    fontFamily: '"JetBrains Mono", monospace',
                    cursor: "default",
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,176,0,0.1)"; e.currentTarget.style.color = "#ffb000"; e.currentTarget.style.borderColor = "rgba(255,176,0,0.5)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c0b080"; e.currentTarget.style.borderColor = "rgba(255,176,0,0.2)"; }}
                  >
                    {'>'} {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="resume-footer" style={{
          padding: "14px 36px",
          borderTop: "2px solid rgba(255,176,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "linear-gradient(0deg, #0a0a0a 0%, #0d0d0d 100%)",
        }}>
          <span style={{ fontSize: "10px", color: "#6a5530", fontFamily: '"JetBrains Mono", monospace', letterSpacing: "0.05em" }}>
            [cv-markdown] -- retro
          </span>
          <span style={{ fontSize: "10px", color: "#6a5530", fontFamily: '"VT323", monospace', letterSpacing: "0.05em" }}>
            _SYSTEM OK
          </span>
        </div>
      </div>
    </div>
  );
}
