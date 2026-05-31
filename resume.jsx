import { useState } from "react";

// ── shadcn-inspired Resume ──
// Aesthetic: Refined minimalism with crisp borders, careful typography hierarchy,
// monochrome palette with subtle zinc tones, and tasteful micro-interactions.

const RESUME_DATA = {
  header: {
    name: "Aayurt Shrestha",
    title: "Full-stack Software Engineer",
    github: "github.com/aayurt",
    website: "aayurtshrestha.com.np",
    linkedin: "linkedin.com/in/aayurtshrestha",
    phone: "+977 9843516471",
    email: "aayurtshrestha@gmail.com",
  },
  summary:
    "Full-stack Software Engineer with 5+ years of experience designing and building scalable distributed systems, multi-tenant SaaS platforms, and real-time applications. Experienced in architecting high-concurrency WebSocket systems, event-driven microservices, and batch/streaming data pipelines.",
  projects: [],
  experience: [
    {
      company: "Founding Engineer (Contract)",
      position: "Founding Engineer",
      period: "May 2026",
      bullets: [
        "Architected and delivered full-stack applications establishing the core technical foundation and dev-workflows.",
        "Designed scalable APIs and modular backend services, improving system flexibility and maintainability.",
        "Collaborated with clients to translate product requirements into production-ready features and systems.",
        "Applied LLMs to speed up implementation while maintaining code quality, testing, and reliability standards.",
        "Built high-performance, real-time systems with a focus on scalability and maintainable architecture.",
      ],
    },
    {
      company: "Pageup People (Clinch)",
      position: "Software Engineer",
      period: "Oct 2023 – Jun 2025",
      bullets: [
        "Architected and delivered high-scale features for a multi-tenant recruitment marketing platform.",
        "Built a real-time, Slack-style chat system supporting thousands of concurrent users during live events.",
        "Designed batch and streaming pipelines powering workflows, automation, and search infrastructure.",
        "Spearheaded AI/LLM integration to automate personalization and enhance candidate engagement.",
        "Driven legacy-to-modern migration by refactoring CakePHP modules into scalable Node.js microservices.",
        "Optimized database performance via indexing and refactoring to reduce dashboard latency.",
        "Led frontend modernisation using Next.js, improving performance, SEO, and accessibility compliance.",
        "Engineered secure public APIs and integration frameworks that accelerated partner onboarding by 30%.",
        "Mentored engineering teams while improving testing standards with Playwright and Jest.",
      ],
    },
    {
      company: "MobileKraft",
      position: "Software Engineer",
      period: "Sep 2022 – Jul 2023",
      overview: "Full-stack web and mobile development for enterprise asset tracking",
      bullets: [
        "Architected full-stack web and Flutter apps for enterprise-grade asset tracking and operational workflows.",
        "Owned the full product lifecycle, from stakeholder requirements through to final production deployment.",
        "Engineered a low-code visual API builder, abstracting complex schemas to empower non-technical users.",
        "Optimized backend latency using Redis caching and query tuning, significantly improving API response times.",
        "Standardized foundational API patterns, developing shared service layers that accelerated feature delivery.",
        "Ensured system reliability through proactive production monitoring, bug fixes, and release management.",
      ],
    },
    {
      company: "Himalayan Techies",
      position: "Software Engineer",
      period: "Dec 2019 – Jul 2022",
      bullets: [
        "Delivered end-to-end full-stack features for government and client applications, owning the lifecycle from UI design to database implementation.",
        "Engineered offline-first solutions for rural environments, ensuring resilience in low-bandwidth settings.",
        "Developed transaction and reporting engines for large-scale cooperative management systems.",
        "Architected responsive interfaces from wireframes while mentoring junior developers on team standards.",
        "Managed server infrastructure and Apache configurations to ensure high availability across domains.",
      ],
    },
  ],
  education: [
    {
      school: "Kingston University",
      degree: "MSc",
      major: "Software Engineering with Management Studies",
      period: "2023",
    },
    {
      school: "Patan Multiple Campus",
      degree: "BSc",
      major: "Computer Science & IT",
      period: "2019",
    },
  ],
  skills: ["5+ years full-stack development", "React / Next.js / TypeScript", "Node.js / GraphQL / REST APIs"],
  appendix: [],
};

// ── Icons ──
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

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
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

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
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

function PaperclipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
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

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

// ── Badge Component ──
function Badge({ children, variant = "default" }) {
  const base =
    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors duration-150";
  const variants = {
    default: "bg-zinc-900 text-zinc-100 ring-zinc-700",
    secondary: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    outline: "bg-transparent text-zinc-500 ring-zinc-200",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

// ── Section Header ──
function SectionHeader({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "6px",
          background: "#18181b",
          color: "#fafafa",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#18181b",
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "#e4e4e7", marginLeft: "8px" }} />
    </div>
  );
}

// ── Contact Chip ──
function ContactChip({ icon, text, href }) {
  const inner = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "6px",
        border: "1px solid #e4e4e7",
        fontSize: "12.5px",
        color: "#3f3f46",
        background: "#fafafa",
        cursor: href ? "pointer" : "default",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f4f4f5";
        e.currentTarget.style.borderColor = "#a1a1aa";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#fafafa";
        e.currentTarget.style.borderColor = "#e4e4e7";
      }}
    >
      <span style={{ color: "#71717a", display: "flex" }}>{icon}</span>
      {text}
    </span>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

// ── Main Resume Component ──
export default function Resume() {
  const d = RESUME_DATA;
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredExp, setHoveredExp] = useState(null);
  const contactCfg = {
    phone: { icon: <PhoneIcon /> },
    email: { icon: <MailIcon /> },
    github: { icon: <GithubIcon /> },
    website: { icon: <GlobeIcon /> },
    linkedin: { icon: <LinkedInIcon /> },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fafafa 0%, #f0f0f2 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .resume-card {
          animation: fadeInUp 0.5s ease-out both;
        }
        
        .section-block {
          animation: fadeInUp 0.4s ease-out both;
        }
        
        .bullet-item {
          animation: slideInLeft 0.3s ease-out both;
        }
        
        @media print {
          body { background: white !important; }
          .resume-card { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div
        className="resume-card"
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e4e4e7",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        {/* ═══ HEADER ═══ */}
        <div
          style={{
            padding: "32px 36px 28px",
            borderBottom: "1px solid #e4e4e7",
            background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
            color: "#fafafa",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* subtle grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "6px",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {d.header.name}
                </h1>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#a1a1aa",
                    letterSpacing: "0.02em",
                  }}
                >
                  {d.header.title}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "12px",
                  color: "#a1a1aa",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                <span style={{ marginLeft: "4px" }}>Open to work</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {d.header.contacts?.map((contact, i) => {
                const cfg = contactCfg[contact.type];
                if (!cfg) return null;
                return <ContactChipDark key={i} icon={cfg.icon} text={contact.value} />;
              })}
            </div>
          </div>
        </div>

        {/* ═══ BODY ═══ */}
        <div style={{ padding: "28px 36px 36px" }}>
          {/* ── Summary ── */}
          {d.summary && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.1s" }}>
              <SectionHeader icon={<UserIcon />} title="SUMMARY" />
              <p
                style={{
                  fontSize: "13.5px",
                  lineHeight: 1.75,
                  color: "#3f3f46",
                  paddingLeft: "36px",
                }}
              >
                {d.summary}
              </p>
            </div>
          )}

          {/* ── Experience ── */}
          {d.experience && d.experience.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.2s" }}>
              <SectionHeader icon={<BriefcaseIcon />} title="EXPERIENCE" />
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "36px" }}>
                {d.experience.map((exp, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    style={{
                      position: "relative",
                      paddingLeft: "20px",
                      borderLeft: "2px solid",
                      borderColor: hoveredExp === i ? "#18181b" : "#e4e4e7",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    {/* timeline dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-5px",
                        top: "4px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: hoveredExp === i ? "#18181b" : "#a1a1aa",
                        transition: "background 0.2s ease",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", marginBottom: "2px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>
                          {exp.company}
                        </h3>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#fafafa",
                            background: "#18181b",
                            padding: "1px 8px",
                            borderRadius: "4px",
                            fontWeight: 500,
                          }}
                        >
                          {exp.position}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#a1a1aa",
                          fontFamily: '"JetBrains Mono", monospace',
                          fontWeight: 400,
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    {exp.overview && (
                      <p style={{ fontSize: "12.5px", color: "#71717a", margin: "4px 0 8px" }}>
                        {exp.overview}
                      </p>
                    )}
                    {exp.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              fontSize: "13px",
                              lineHeight: 1.65,
                              color: "#3f3f46",
                              marginBottom: "3px",
                            }}
                          >
                            <span
                              style={{
                                width: "4px",
                                height: "4px",
                                borderRadius: "50%",
                                background: "#a1a1aa",
                                flexShrink: 0,
                                marginTop: "8px",
                              }}
                            />
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

          {/* ── Education ── */}
          {d.education && d.education.length > 0 && (
            <div className="section-block" style={{ marginBottom: "28px", animationDelay: "0.3s" }}>
              <SectionHeader icon={<GraduationCapIcon />} title="EDUCATION" />
              <div style={{ paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {d.education.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #e4e4e7",
                      background: "#fafafa",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 600, color: "#18181b" }}>
                        {edu.school}
                      </h3>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#fafafa",
                          background: "#18181b",
                          padding: "1px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {edu.degree}
                      </span>
                      <span style={{ fontSize: "13px", color: "#71717a" }}>{edu.major}</span>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#a1a1aa",
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Skills ── */}
          {d.skills && d.skills.length > 0 && (
            <div className="section-block" style={{ animationDelay: "0.4s" }}>
              <SectionHeader icon={<ZapIcon />} title="SKILLS" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "36px" }}>
                {d.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "12.5px",
                      color: "#3f3f46",
                      background: "#fafafa",
                      border: "1px solid #e4e4e7",
                      transition: "all 0.15s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#18181b";
                      e.currentTarget.style.color = "#fafafa";
                      e.currentTarget.style.borderColor = "#18181b";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fafafa";
                      e.currentTarget.style.color = "#3f3f46";
                      e.currentTarget.style.borderColor = "#e4e4e7";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          style={{
            padding: "16px 36px",
            borderTop: "1px solid #e4e4e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fafafa",
          }}
        >
          <span style={{ fontSize: "11px", color: "#a1a1aa" }}>
            Built with shadcn/ui style
          </span>
          <span style={{ fontSize: "11px", color: "#a1a1aa", fontFamily: '"JetBrains Mono", monospace' }}>
            Updated 2026.05
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Dark contact chip for header ──
function ContactChipDark({ icon, text }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "6px",
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: "12.5px",
        color: "#a1a1aa",
        background: "rgba(255,255,255,0.05)",
        cursor: "default",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "#e4e4e7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = "#a1a1aa";
      }}
    >
      <span style={{ display: "flex", color: "#71717a" }}>{icon}</span>
      {text}
    </span>
  );
}
