import { useState } from "react";
import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';
import {
  GithubIcon, GlobeIcon, PhoneIcon, MailIcon,
  BriefcaseIcon, GraduationCapIcon, UserIcon, ZapIcon,
  FolderIcon, PaperclipIcon, ExternalLinkIcon, ImagePlaceholderIcon,
} from "./icons";

interface SC {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  headerBg: string;
  headerPattern: string;
  headerText: string;
  headerMuted: string;
  sectionIconBg: string;
  sectionIconColor: string;
  headingText: string;
  sectionLine: string;
  bodyText: string;
  mutedText: string;
  dimText: string;
  veryDimText: string;
  border: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  projectBg: string;
  projectHoverBg: string;
  projectBorder: string;
  projectHoverBorder: string;
  expDot: string;
  expDotHover: string;
  expLine: string;
  expLineHover: string;
  expCompany: string;
  expRoleBg: string;
  expRoleText: string;
  eduBg: string;
  eduBorder: string;
  eduSchool: string;
  eduDegreeBg: string;
  eduDegreeText: string;
  skillBg: string;
  skillText: string;
  skillBorder: string;
  skillHoverBg: string;
  skillHoverText: string;
  skillHoverBorder: string;
  footerBg: string;
  footerBorder: string;
  footerText: string;
  appendixBg: string;
  appendixBorder: string;
  appendixHeaderBg: string;
  appendixHeaderBorder: string;
  appendixFigBg: string;
  appendixFigText: string;
  appendixFigBorder: string;
  imgPlaceholderBg: string;
  imgPlaceholderBorder: string;
  statusBg: string;
  statusBorder: string;
  statusText: string;
  statusDot: string;
  chipBorder: string;
  chipBg: string;
  chipText: string;
  chipIcon: string;
  chipHoverBg: string;
  chipHoverText: string;
}

const LIGHT: SC = {
  pageBg: "linear-gradient(180deg, #fafafa 0%, #f0f0f2 100%)",
  cardBg: "#ffffff",
  cardBorder: "#e4e4e7",
  cardShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
  headerBg: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
  headerPattern: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
  headerText: "#fafafa",
  headerMuted: "#a1a1aa",
  sectionIconBg: "#18181b",
  sectionIconColor: "#fafafa",
  headingText: "#18181b",
  sectionLine: "#e4e4e7",
  bodyText: "#3f3f46",
  mutedText: "#71717a",
  dimText: "#a1a1aa",
  veryDimText: "#d4d4d8",
  border: "#e4e4e7",
  tagBg: "#f4f4f5",
  tagText: "#52525b",
  tagBorder: "#e4e4e7",
  projectBg: "#ffffff",
  projectHoverBg: "#fafafa",
  projectBorder: "#e4e4e7",
  projectHoverBorder: "#a1a1aa",
  expDot: "#a1a1aa",
  expDotHover: "#18181b",
  expLine: "#e4e4e7",
  expLineHover: "#18181b",
  expCompany: "#18181b",
  expRoleBg: "#18181b",
  expRoleText: "#fafafa",
  eduBg: "#fafafa",
  eduBorder: "#e4e4e7",
  eduSchool: "#18181b",
  eduDegreeBg: "#18181b",
  eduDegreeText: "#fafafa",
  skillBg: "#fafafa",
  skillText: "#3f3f46",
  skillBorder: "#e4e4e7",
  skillHoverBg: "#18181b",
  skillHoverText: "#fafafa",
  skillHoverBorder: "#18181b",
  footerBg: "#fafafa",
  footerBorder: "#e4e4e7",
  footerText: "#a1a1aa",
  appendixBg: "#ffffff",
  appendixBorder: "#e4e4e7",
  appendixHeaderBg: "#fafafa",
  appendixHeaderBorder: "#e4e4e7",
  appendixFigBg: "#f4f4f5",
  appendixFigText: "#a1a1aa",
  appendixFigBorder: "#e4e4e7",
  imgPlaceholderBg: "repeating-conic-gradient(#f4f4f5 0% 25%, transparent 0% 50%) 50% / 16px 16px",
  imgPlaceholderBorder: "#e4e4e7",
  statusBg: "rgba(255,255,255,0.08)",
  statusBorder: "rgba(255,255,255,0.1)",
  statusText: "#a1a1aa",
  statusDot: "#22c55e",
  chipBorder: "rgba(255,255,255,0.1)",
  chipBg: "rgba(255,255,255,0.05)",
  chipText: "#a1a1aa",
  chipIcon: "#71717a",
  chipHoverBg: "rgba(255,255,255,0.1)",
  chipHoverText: "#e4e4e7",
};

const DARK: SC = {
  pageBg: "#1a1a1a",
  cardBg: "#27272a",
  cardBorder: "#3f3f46",
  cardShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4)",
  headerBg: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
  headerPattern: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  headerText: "#e4e4e7",
  headerMuted: "#71717a",
  sectionIconBg: "#3f3f46",
  sectionIconColor: "#fafafa",
  headingText: "#fafafa",
  sectionLine: "#3f3f46",
  bodyText: "#d4d4d8",
  mutedText: "#a1a1aa",
  dimText: "#52525b",
  veryDimText: "#3f3f46",
  border: "#3f3f46",
  tagBg: "#18181b",
  tagText: "#a1a1aa",
  tagBorder: "#27272a",
  projectBg: "#27272a",
  projectHoverBg: "#18181b",
  projectBorder: "#3f3f46",
  projectHoverBorder: "#71717a",
  expDot: "#52525b",
  expDotHover: "#fafafa",
  expLine: "#3f3f46",
  expLineHover: "#fafafa",
  expCompany: "#fafafa",
  expRoleBg: "#3f3f46",
  expRoleText: "#d4d4d8",
  eduBg: "#18181b",
  eduBorder: "#3f3f46",
  eduSchool: "#fafafa",
  eduDegreeBg: "#3f3f46",
  eduDegreeText: "#d4d4d8",
  skillBg: "#18181b",
  skillText: "#d4d4d8",
  skillBorder: "#3f3f46",
  skillHoverBg: "#fafafa",
  skillHoverText: "#18181b",
  skillHoverBorder: "#fafafa",
  footerBg: "#18181b",
  footerBorder: "#3f3f46",
  footerText: "#52525b",
  appendixBg: "#27272a",
  appendixBorder: "#3f3f46",
  appendixHeaderBg: "#18181b",
  appendixHeaderBorder: "#3f3f46",
  appendixFigBg: "#18181b",
  appendixFigText: "#52525b",
  appendixFigBorder: "#3f3f46",
  imgPlaceholderBg: "repeating-conic-gradient(#18181b 0% 25%, transparent 0% 50%) 50% / 16px 16px",
  imgPlaceholderBorder: "#3f3f46",
  statusBg: "rgba(255,255,255,0.05)",
  statusBorder: "rgba(255,255,255,0.08)",
  statusText: "#71717a",
  statusDot: "#22c55e",
  chipBorder: "rgba(255,255,255,0.08)",
  chipBg: "rgba(255,255,255,0.03)",
  chipText: "#71717a",
  chipIcon: "#52525b",
  chipHoverBg: "rgba(255,255,255,0.08)",
  chipHoverText: "#d4d4d8",
};

function SectionHeader({ icon, title, c }: { icon: React.ReactNode; title: string; c: SC }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "28px", height: "28px", borderRadius: "6px",
        background: c.sectionIconBg, color: c.sectionIconColor, flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em",
        textTransform: "uppercase", color: c.headingText, margin: 0,
      }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: c.sectionLine, marginLeft: "8px" }} />
    </div>
  );
}

function ContactChipDark({ icon, text, href, c }: { icon: React.ReactNode; text: string; href?: string; c: SC }) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "5px 12px", borderRadius: "6px",
        border: `1px solid ${c.chipBorder}`,
        fontSize: "12.5px", color: c.chipText,
        background: c.chipBg,
        cursor: href ? "pointer" : "default", transition: "all 0.15s",
        textDecoration: "none",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.background = c.chipHoverBg;
        e.currentTarget.style.color = c.chipHoverText;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.background = c.chipBg;
        e.currentTarget.style.color = c.chipText;
      }}
    >
      <span style={{ display: "flex", color: c.chipIcon }}>{icon}</span>
      {text}
    </Tag>
  );
}

export default function ShadcnPreview({ data, locale = 'en', theme = 'dark' }: { data: ResumeData; locale?: Locale; theme?: 'light' | 'dark' }) {
  const d = data;
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const c = theme === 'dark' ? DARK : LIGHT;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: c.pageBg,
        display: "flex", justifyContent: "center", padding: "40px 16px",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
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
        width: "100%", maxWidth: "720px", background: c.cardBg,
        borderRadius: "12px", border: `1px solid ${c.cardBorder}`,
        boxShadow: c.cardShadow,
        overflow: "hidden",
      }}>
        <div style={{
          padding: "32px 36px 28px", borderBottom: `1px solid ${c.cardBorder}`,
          background: c.headerBg,
          color: c.headerText, position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: c.headerPattern,
            backgroundSize: "24px 24px",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h1 style={{
                  fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em",
                  lineHeight: 1.1, marginBottom: "6px", fontFamily: '"Inter", sans-serif',
                }}>
                  {d.header.name}
                </h1>
                <p style={{ fontSize: "15px", fontWeight: 400, color: c.headerMuted, letterSpacing: "0.02em" }}>
                  {d.header.title}
                </p>
              </div>
              {d.header.status && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "4px 12px", borderRadius: "9999px",
                  background: c.statusBg, border: `1px solid ${c.statusBorder}`,
                  fontSize: "12px", color: c.statusText,
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.statusDot, display: "inline-block" }} />
                  <span style={{ marginLeft: "4px" }}>{d.header.status}</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px" }}>
              {d.header.github && <ContactChipDark icon={<GithubIcon />} text={d.header.github} href={`https://${d.header.github}`} c={c} />}
              {d.header.website && <ContactChipDark icon={<GlobeIcon />} text={d.header.website} href={d.header.website.startsWith("http") ? d.header.website : `https://${d.header.website}`} c={c} />}
              {d.header.phone && <ContactChipDark icon={<PhoneIcon />} text={d.header.phone} href={`tel:${d.header.phone.replace(/[-\s]/g, "")}`} c={c} />}
              {d.header.email && <ContactChipDark icon={<MailIcon />} text={d.header.email} href={`mailto:${d.header.email}`} c={c} />}
            </div>
          </div>
        </div>

        <div style={{ padding: "28px 36px 36px" }}>
          {d.summary && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.1s" }}>
              <SectionHeader icon={<UserIcon />} title={t('summary', locale)} c={c} />
              <p style={{ fontSize: "13.5px", lineHeight: 1.75, color: c.bodyText, paddingLeft: "36px" }}>
                {d.summary}
              </p>
            </div>
          )}

          {d.projects && d.projects.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.2s" }}>
              <SectionHeader icon={<FolderIcon />} title={t('projects', locale)} c={c} />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "36px" }}>
                {d.projects.map((proj, i) => (
                  <div key={i}
                    onMouseEnter={() => setHoveredProject(i)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      padding: "16px 18px", borderRadius: "8px",
                      border: "1px solid", borderColor: hoveredProject === i ? c.projectHoverBorder : c.projectBorder,
                      background: hoveredProject === i ? c.projectHoverBg : c.projectBg,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px", flexWrap: "wrap", gap: "8px" }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: c.headingText }}>{proj.name}</h3>
                      {proj.repo && (
                        <a href={`https://${proj.repo}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: c.mutedText, textDecoration: "none", fontFamily: '"JetBrains Mono", monospace' }}>
                          <GithubIcon /> {proj.repo.split("/").slice(-1)[0]} <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                    {proj.overview && <p style={{ fontSize: "12.5px", color: c.mutedText, marginBottom: "10px" }}>{proj.overview}</p>}
                    {proj.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px 0" }}>
                        {proj.bullets.map((b, j) => (
                          <li key={j} className="bullet-item" style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.65, color: c.bodyText,
                            marginBottom: "4px", animationDelay: `${0.3 + j * 0.05}s`,
                          }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: c.dimText, flexShrink: 0, marginTop: "8px" }} />
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
                            background: c.tagBg, color: c.tagText, border: `1px solid ${c.tagBorder}`,
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

          {d.experience && d.experience.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.3s" }}>
              <SectionHeader icon={<BriefcaseIcon />} title={t('experience', locale)} c={c} />
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "36px" }}>
                {d.experience.map((exp, i) => (
                  <div key={i}
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    style={{
                      position: "relative", paddingLeft: "20px",
                      borderLeft: "2px solid", borderColor: hoveredExp === i ? c.expLineHover : c.expLine,
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <div style={{
                      position: "absolute", left: "-5px", top: "4px",
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: hoveredExp === i ? c.expDotHover : c.expDot,
                      transition: "background 0.2s ease",
                    }} />
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", marginBottom: "2px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: c.expCompany }}>{exp.company}</h3>
                        <span style={{ fontSize: "12px", color: c.expRoleText, background: c.expRoleBg, padding: "1px 8px", borderRadius: "4px", fontWeight: 500 }}>
                          {exp.position}
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", color: c.dimText, fontFamily: '"JetBrains Mono", monospace', fontWeight: 400 }}>
                        {exp.period}
                      </span>
                    </div>
                    {exp.overview && <p style={{ fontSize: "12.5px", color: c.mutedText, margin: "4px 0 8px" }}>{exp.overview}</p>}
                    {exp.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.65, color: c.bodyText, marginBottom: "3px",
                          }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: c.dimText, flexShrink: 0, marginTop: "8px" }} />
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

          {d.education && d.education.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.4s" }}>
              <SectionHeader icon={<GraduationCapIcon />} title={t('education', locale)} c={c} />
              <div style={{ paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {d.education.map((edu, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: "8px", padding: "12px 16px",
                    borderRadius: "8px", border: `1px solid ${c.eduBorder}`, background: c.eduBg,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: c.eduSchool }}>{edu.school}</h3>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: c.eduDegreeText, background: c.eduDegreeBg, padding: "1px 8px", borderRadius: "4px" }}>
                        {edu.degree}
                      </span>
                      <span style={{ fontSize: "13px", color: c.mutedText }}>{edu.major}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: c.dimText, fontFamily: '"JetBrains Mono", monospace' }}>
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.skills && d.skills.length > 0 && (
            <div className="section-block" style={{ animationDelay: "0.5s" }}>
              <SectionHeader icon={<ZapIcon />} title={t('skills', locale)} c={c} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "36px" }}>
                {d.skills.map((skill, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", padding: "6px 14px",
                    borderRadius: "6px", fontSize: "12.5px", color: c.skillText,
                    background: c.skillBg, border: `1px solid ${c.skillBorder}`,
                    transition: "all 0.15s", cursor: "default",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = c.skillHoverBg; e.currentTarget.style.color = c.skillHoverText; e.currentTarget.style.borderColor = c.skillHoverBorder; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = c.skillBg; e.currentTarget.style.color = c.skillText; e.currentTarget.style.borderColor = c.skillBorder; }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {d.appendix && d.appendix.length > 0 && (
            <div className="section-block" style={{ marginTop: "28px", animationDelay: "0.6s" }}>
              <SectionHeader icon={<PaperclipIcon />} title={t('appendix', locale)} c={c} />
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "36px" }}>
                {d.appendix.map((item, i) => (
                  <div key={i} style={{ borderRadius: "8px", border: `1px solid ${c.appendixBorder}`, overflow: "hidden", background: c.appendixBg }}>
                    <div style={{
                      padding: "12px 16px", borderBottom: `1px solid ${c.appendixHeaderBorder}`, background: c.appendixHeaderBg,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div>
                        <h4 style={{ fontSize: "13.5px", fontWeight: 600, color: c.headingText, margin: 0 }}>
                          {t('appendix', locale)} {String.fromCharCode(65 + i)}: {item.title}
                        </h4>
                        {item.description && <p style={{ fontSize: "12px", color: c.dimText, margin: "2px 0 0" }}>{item.description}</p>}
                      </div>
                      <span style={{
                        fontSize: "11px", fontWeight: 500, color: c.appendixFigText,
                        fontFamily: '"JetBrains Mono", monospace',
                        padding: "2px 8px", borderRadius: "4px", background: c.appendixFigBg, border: `1px solid ${c.appendixFigBorder}`,
                      }}>
                        Fig.{i + 1}
                      </span>
                    </div>
                    <div style={{ padding: "4px" }}>
                      {!item.imageUrl ? (
                        <div style={{
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          minHeight: "200px", borderRadius: "6px",
                          background: c.imgPlaceholderBg,
                          color: c.dimText, gap: "10px", border: `2px dashed ${c.imgPlaceholderBorder}`,
                        }}>
                          <ImagePlaceholderIcon />
                          <span style={{ fontSize: "12.5px", fontWeight: 500 }}>{t('imgPasteHere', locale)}</span>
                          <span style={{ fontSize: "11px", color: c.veryDimText }}>{t('imgPlaceholder', locale)}</span>
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

        <div className="resume-footer" style={{
          padding: "16px 36px", borderTop: `1px solid ${c.footerBorder}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", background: c.footerBg,
        }}>
          <span style={{ fontSize: "11px", color: c.footerText }}>Built with shadcn/ui style</span>
          <span style={{ fontSize: "11px", color: c.footerText, fontFamily: '"JetBrains Mono", monospace' }}>Updated 2026.02</span>
        </div>
      </div>
    </div>
  );
}
