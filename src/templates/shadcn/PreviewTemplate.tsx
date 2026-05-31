import { useState } from "react";
import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';
import {
  GithubIcon, GlobeIcon, PhoneIcon, MailIcon,
  BriefcaseIcon, GraduationCapIcon, UserIcon, ZapIcon,
  FolderIcon, PaperclipIcon, ExternalLinkIcon, ImagePlaceholderIcon,
} from "./icons";

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "28px", height: "28px", borderRadius: "6px",
        background: "#18181b", color: "#fafafa", flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em",
        textTransform: "uppercase", color: "#18181b", margin: 0,
      }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "#e4e4e7", marginLeft: "8px" }} />
    </div>
  );
}

function ContactChipDark({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "5px 12px", borderRadius: "6px",
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: "12.5px", color: "#a1a1aa",
        background: "rgba(255,255,255,0.05)",
        cursor: href ? "pointer" : "default", transition: "all 0.15s",
        textDecoration: "none",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "#e4e4e7";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = "#a1a1aa";
      }}
    >
      <span style={{ display: "flex", color: "#71717a" }}>{icon}</span>
      {text}
    </Tag>
  );
}

export default function ShadcnPreview({ data, locale = 'en' }: { data: ResumeData; locale?: Locale }) {
  const d = data;
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fafafa 0%, #f0f0f2 100%)",
        display: "flex", justifyContent: "center", padding: "40px 16px",
        fontFamily: '"Source Han Sans SC", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .resume-card { animation: fadeInUp 0.5s ease-out both; }
        .section-block { animation: fadeInUp 0.4s ease-out both; }
        .bullet-item { animation: slideInLeft 0.3s ease-out both; }
        @media print {
          body { background: white !important; }
          .resume-card { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div className="resume-card" style={{
        width: "100%", maxWidth: "720px", background: "#ffffff",
        borderRadius: "12px", border: "1px solid #e4e4e7",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}>
        {/* HEADER */}
        <div style={{
          padding: "32px 36px 28px", borderBottom: "1px solid #e4e4e7",
          background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
          color: "#fafafa", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h1 style={{
                  fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em",
                  lineHeight: 1.1, marginBottom: "6px", fontFamily: '"Noto Sans SC", sans-serif',
                }}>
                  {d.header.name}
                </h1>
                <p style={{ fontSize: "15px", fontWeight: 400, color: "#a1a1aa", letterSpacing: "0.02em" }}>
                  {d.header.title}
                </p>
              </div>
              {d.header.status && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "4px 12px", borderRadius: "9999px",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "12px", color: "#a1a1aa",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  <span style={{ marginLeft: "4px" }}>{d.header.status}</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px" }}>
              {d.header.github && <ContactChipDark icon={<GithubIcon />} text={d.header.github} href={`https://${d.header.github}`} />}
              {d.header.website && <ContactChipDark icon={<GlobeIcon />} text={d.header.website} href={d.header.website.startsWith("http") ? d.header.website : `https://${d.header.website}`} />}
              {d.header.phone && <ContactChipDark icon={<PhoneIcon />} text={d.header.phone} href={`tel:${d.header.phone.replace(/[-\s]/g, "")}`} />}
              {d.header.email && <ContactChipDark icon={<MailIcon />} text={d.header.email} href={`mailto:${d.header.email}`} />}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ padding: "28px 36px 36px" }}>
          {/* Summary */}
          {d.summary && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.1s" }}>
              <SectionHeader icon={<UserIcon />} title={t('summary', locale)} />
              <p style={{ fontSize: "13.5px", lineHeight: 1.75, color: "#3f3f46", paddingLeft: "36px" }}>
                {d.summary}
              </p>
            </div>
          )}

          {/* Projects */}
          {d.projects && d.projects.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.2s" }}>
              <SectionHeader icon={<FolderIcon />} title={t('projects', locale)} />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "36px" }}>
                {d.projects.map((proj, i) => (
                  <div key={i}
                    onMouseEnter={() => setHoveredProject(i)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      padding: "16px 18px", borderRadius: "8px",
                      border: "1px solid", borderColor: hoveredProject === i ? "#a1a1aa" : "#e4e4e7",
                      background: hoveredProject === i ? "#fafafa" : "#fff",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px", flexWrap: "wrap", gap: "8px" }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>{proj.name}</h3>
                      {proj.repo && (
                        <a href={`https://${proj.repo}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#71717a", textDecoration: "none", fontFamily: '"JetBrains Mono", monospace' }}>
                          <GithubIcon /> {proj.repo.split("/").slice(-1)[0]} <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                    {proj.overview && <p style={{ fontSize: "12.5px", color: "#71717a", marginBottom: "10px" }}>{proj.overview}</p>}
                    {proj.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px 0" }}>
                        {proj.bullets.map((b, j) => (
                          <li key={j} className="bullet-item" style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.65, color: "#3f3f46",
                            marginBottom: "4px", animationDelay: `${0.3 + j * 0.05}s`,
                          }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#a1a1aa", flexShrink: 0, marginTop: "8px" }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {proj.techStack && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {proj.techStack.map((tech, k) => (
                          <span key={k} style={{
                            display: "inline-flex", alignItems: "center", padding: "2px 8px",
                            borderRadius: "4px", fontSize: "11px", fontWeight: 500,
                            fontFamily: '"JetBrains Mono", monospace',
                            background: "#f4f4f5", color: "#52525b", border: "1px solid #e4e4e7",
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
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "36px" }}>
                {d.experience.map((exp, i) => (
                  <div key={i}
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    style={{
                      position: "relative", paddingLeft: "20px",
                      borderLeft: "2px solid", borderColor: hoveredExp === i ? "#18181b" : "#e4e4e7",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <div style={{
                      position: "absolute", left: "-5px", top: "4px",
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: hoveredExp === i ? "#18181b" : "#a1a1aa",
                      transition: "background 0.2s ease",
                    }} />
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", marginBottom: "2px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>{exp.company}</h3>
                        <span style={{ fontSize: "12px", color: "#fafafa", background: "#18181b", padding: "1px 8px", borderRadius: "4px", fontWeight: 500 }}>
                          {exp.position}
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", color: "#a1a1aa", fontFamily: '"JetBrains Mono", monospace', fontWeight: 400 }}>
                        {exp.period}
                      </span>
                    </div>
                    {exp.overview && <p style={{ fontSize: "12.5px", color: "#71717a", margin: "4px 0 8px" }}>{exp.overview}</p>}
                    {exp.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.65, color: "#3f3f46", marginBottom: "3px",
                          }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#a1a1aa", flexShrink: 0, marginTop: "8px" }} />
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
              <div style={{ paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {d.education.map((edu, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: "8px", padding: "12px 16px",
                    borderRadius: "8px", border: "1px solid #e4e4e7", background: "#fafafa",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>{edu.school}</h3>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#fafafa", background: "#18181b", padding: "1px 8px", borderRadius: "4px" }}>
                        {edu.degree}
                      </span>
                      <span style={{ fontSize: "13px", color: "#71717a" }}>{edu.major}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: "#a1a1aa", fontFamily: '"JetBrains Mono", monospace' }}>
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "36px" }}>
                {d.skills.map((skill, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", padding: "6px 14px",
                    borderRadius: "6px", fontSize: "12.5px", color: "#3f3f46",
                    background: "#fafafa", border: "1px solid #e4e4e7",
                    transition: "all 0.15s", cursor: "default",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#18181b"; e.currentTarget.style.color = "#fafafa"; e.currentTarget.style.borderColor = "#18181b"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#fafafa"; e.currentTarget.style.color = "#3f3f46"; e.currentTarget.style.borderColor = "#e4e4e7"; }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Appendix */}
          {d.appendix && d.appendix.length > 0 && (
            <div className="section-block" style={{ marginTop: "28px", animationDelay: "0.6s" }}>
              <SectionHeader icon={<PaperclipIcon />} title={t('appendix', locale)} />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "36px" }}>
                {d.appendix.map((item, i) => (
                  <div key={i} style={{ borderRadius: "8px", border: "1px solid #e4e4e7", overflow: "hidden", background: "#fff" }}>
                    <div style={{
                      padding: "12px 16px", borderBottom: "1px solid #e4e4e7", background: "#fafafa",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div>
                        <h4 style={{ fontSize: "13.5px", fontWeight: 600, color: "#18181b", margin: 0 }}>
                          {t('appendix', locale)} {String.fromCharCode(65 + i)}: {item.title}
                        </h4>
                        {item.description && <p style={{ fontSize: "12px", color: "#a1a1aa", margin: "2px 0 0" }}>{item.description}</p>}
                      </div>
                      <span style={{
                        fontSize: "11px", fontWeight: 500, color: "#a1a1aa",
                        fontFamily: '"JetBrains Mono", monospace',
                        padding: "2px 8px", borderRadius: "4px", background: "#f4f4f5", border: "1px solid #e4e4e7",
                      }}>
                        Fig.{i + 1}
                      </span>
                    </div>
                    <div style={{ padding: "4px" }}>
                      {!item.imageUrl ? (
                        <div style={{
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          minHeight: "200px", borderRadius: "6px",
                          background: "repeating-conic-gradient(#f4f4f5 0% 25%, transparent 0% 50%) 50% / 16px 16px",
                          color: "#a1a1aa", gap: "10px", border: "2px dashed #e4e4e7",
                        }}>
                          <ImagePlaceholderIcon />
                          <span style={{ fontSize: "12.5px", fontWeight: 500 }}>{t('imgPasteHere', locale)}</span>
                          <span style={{ fontSize: "11px", color: "#d4d4d8" }}>{t('imgPlaceholder', locale)}</span>
                        </div>
                      ) : (
                        <img src={item.imageUrl} alt={item.title} style={{ width: "100%", borderRadius: "6px", display: "block" }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="resume-footer" style={{
          padding: "16px 36px", borderTop: "1px solid #e4e4e7",
          display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafafa",
        }}>
          <span style={{ fontSize: "11px", color: "#a1a1aa" }}>Built with shadcn/ui style</span>
          <span style={{ fontSize: "11px", color: "#a1a1aa", fontFamily: '"JetBrains Mono", monospace' }}>Updated 2026.02</span>
        </div>
      </div>
    </div>
  );
}
