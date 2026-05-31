import { useState } from "react";
import type { ResumeData } from "../../types/resume";
import { t } from '../../i18n';
import type { Locale } from '../../i18n';

interface SC {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  cardBorderHover: string;
  cardShadow: string;
  cardShadowHover: string;
  headerBg: string;
  headerBar: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  dimText: string;
  veryDimText: string;
  sectionChipBg: string;
  sectionChipBorder: string;
  sectionChipText: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  chipHoverBg: string;
  chipHoverBorder: string;
  iconBg: string;
  iconColor: string;
  iconProjectColors: string[];
  statusBg: string;
  statusBorder: string;
  statusText: string;
  statusDot: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  tagHoverBg: string;
  tagHoverText: string;
  tagHoverBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  eduBg: string;
  eduBorder: string;
  eduSchool: string;
  eduDegreeBg: string;
  eduDegreeText: string;
  eduMajor: string;
  appendixBg: string;
  appendixBorder: string;
  appendixHeaderBg: string;
  appendixHeaderBorder: string;
  appendixFigBg: string;
  appendixFigText: string;
  appendixFigBorder: string;
  imgPlaceholderBg: string;
  imgPlaceholderBorder: string;
  imgPlaceholderText: string;
  imgPlaceholderTextSecondary: string;
  skillBg: string;
  skillText: string;
  skillBorder: string;
  bulletDot: string;
  cssCardShadowHover: string;
  cssCardBorderHover: string;
  cssTagHoverBg: string;
  cssTagHoverText: string;
  cssTagHoverBorder: string;
}

const LIGHT: SC = {
  pageBg: "#ffffff",
  cardBg: "#ffffff",
  cardBorder: "#e4e4e7",
  cardBorderHover: "#d4d4d8",
  cardShadow: "0 1px 2px rgba(0,0,0,0.02)",
  cardShadowHover: "0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06)",
  headerBg: "linear-gradient(145deg, #fafafa 0%, #ffffff 100%)",
  headerBar: "linear-gradient(90deg, #18181b 0%, #52525b 50%, #18181b 100%)",
  headingText: "#18181b",
  bodyText: "#3f3f46",
  mutedText: "#52525b",
  dimText: "#71717a",
  veryDimText: "#a1a1aa",
  sectionChipBg: "#f4f4f5",
  sectionChipBorder: "#e4e4e7",
  sectionChipText: "#71717a",
  chipBg: "#ffffff",
  chipBorder: "#e4e4e7",
  chipText: "#3f3f46",
  chipHoverBg: "#fafafa",
  chipHoverBorder: "#a1a1aa",
  iconBg: "#f4f4f5",
  iconColor: "#18181b",
  iconProjectColors: ["#f4f4f5", "#fef2f2", "#f0f9ff", "#f5f3ff", "#fefce8", "#f0fdf4"],
  statusBg: "#f0fdf4",
  statusBorder: "#bbf7d0",
  statusText: "#166534",
  statusDot: "#22c55e",
  tagBg: "#f4f4f5",
  tagText: "#52525b",
  tagBorder: "#e4e4e7",
  tagHoverBg: "#18181b",
  tagHoverText: "#fafafa",
  tagHoverBorder: "#18181b",
  badgeBg: "#f4f4f5",
  badgeText: "#52525b",
  badgeBorder: "#e4e4e7",
  eduBg: "#ffffff",
  eduBorder: "#e4e4e7",
  eduSchool: "#18181b",
  eduDegreeBg: "#18181b",
  eduDegreeText: "#fafafa",
  eduMajor: "#52525b",
  appendixBg: "#ffffff",
  appendixBorder: "#e4e4e7",
  appendixHeaderBg: "#fafafa",
  appendixHeaderBorder: "#e4e4e7",
  appendixFigBg: "#f4f4f5",
  appendixFigText: "#a1a1aa",
  appendixFigBorder: "#e4e4e7",
  imgPlaceholderBg: "repeating-conic-gradient(#fafafa 0% 25%, transparent 0% 50%) 50% / 16px 16px",
  imgPlaceholderBorder: "#e4e4e7",
  imgPlaceholderText: "#a1a1aa",
  imgPlaceholderTextSecondary: "#d4d4d8",
  skillBg: "#fafafa",
  skillText: "#3f3f46",
  skillBorder: "#e4e4e7",
  bulletDot: "#d4d4d8",
  cssCardShadowHover: "0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06)",
  cssCardBorderHover: "#d4d4d8",
  cssTagHoverBg: "#18181b",
  cssTagHoverText: "#fafafa",
  cssTagHoverBorder: "#18181b",
};

const DARK: SC = {
  pageBg: "#1a1a1a",
  cardBg: "#27272a",
  cardBorder: "#3f3f46",
  cardBorderHover: "#71717a",
  cardShadow: "0 1px 2px rgba(0,0,0,0.2)",
  cardShadowHover: "0 4px 12px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.4)",
  headerBg: "linear-gradient(145deg, #18181b 0%, #27272a 100%)",
  headerBar: "linear-gradient(90deg, #3f3f46 0%, #71717a 50%, #3f3f46 100%)",
  headingText: "#fafafa",
  bodyText: "#d4d4d8",
  mutedText: "#a1a1aa",
  dimText: "#71717a",
  veryDimText: "#52525b",
  sectionChipBg: "#18181b",
  sectionChipBorder: "#3f3f46",
  sectionChipText: "#a1a1aa",
  chipBg: "#27272a",
  chipBorder: "#3f3f46",
  chipText: "#a1a1aa",
  chipHoverBg: "#18181b",
  chipHoverBorder: "#71717a",
  iconBg: "#3f3f46",
  iconColor: "#fafafa",
  iconProjectColors: ["#3f3f46", "#3f1f1f", "#1f2f4f", "#2f1f3f", "#3f3f1f", "#1f3f2f"],
  statusBg: "#1a3a2a",
  statusBorder: "#166534",
  statusText: "#4ade80",
  statusDot: "#22c55e",
  tagBg: "#18181b",
  tagText: "#a1a1aa",
  tagBorder: "#27272a",
  tagHoverBg: "#fafafa",
  tagHoverText: "#18181b",
  tagHoverBorder: "#fafafa",
  badgeBg: "#3f3f46",
  badgeText: "#d4d4d8",
  badgeBorder: "#3f3f46",
  eduBg: "#18181b",
  eduBorder: "#3f3f46",
  eduSchool: "#fafafa",
  eduDegreeBg: "#3f3f46",
  eduDegreeText: "#d4d4d8",
  eduMajor: "#a1a1aa",
  appendixBg: "#27272a",
  appendixBorder: "#3f3f46",
  appendixHeaderBg: "#18181b",
  appendixHeaderBorder: "#3f3f46",
  appendixFigBg: "#18181b",
  appendixFigText: "#52525b",
  appendixFigBorder: "#3f3f46",
  imgPlaceholderBg: "repeating-conic-gradient(#18181b 0% 25%, transparent 0% 50%) 50% / 16px 16px",
  imgPlaceholderBorder: "#3f3f46",
  imgPlaceholderText: "#52525b",
  imgPlaceholderTextSecondary: "#3f3f46",
  skillBg: "#18181b",
  skillText: "#d4d4d8",
  skillBorder: "#3f3f46",
  bulletDot: "#52525b",
  cssCardShadowHover: "0 4px 12px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.4)",
  cssCardBorderHover: "#71717a",
  cssTagHoverBg: "#fafafa",
  cssTagHoverText: "#18181b",
  cssTagHoverBorder: "#fafafa",
};

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

function SectionChip({ label, c }: { label: string; c: SC }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px", borderRadius: "9999px",
      background: c.sectionChipBg, border: `1px solid ${c.sectionChipBorder}`,
      fontSize: "11px", fontWeight: 600, color: c.sectionChipText,
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

export default function AwesomeShadcnPreview({ data, locale = 'en', theme = 'dark' }: { data: ResumeData; locale?: Locale; theme?: 'light' | 'dark' }) {
  const d = data;
  const c = theme === 'dark' ? DARK : LIGHT;
  const [hoveredProj, setHoveredProj] = useState<number | null>(null);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: c.pageBg,
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
          box-shadow: var(--card-shadow-hover);
          border-color: var(--card-border-hover) !important;
        }

        .awesome-tag {
          transition: all 0.15s ease;
        }
        .awesome-tag:hover {
          background: var(--tag-hover-bg) !important;
          color: var(--tag-hover-color) !important;
          border-color: var(--tag-hover-border) !important;
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
      <div style={{
        width: "100%", maxWidth: "780px",
        "--card-shadow-hover": c.cssCardShadowHover,
        "--card-border-hover": c.cssCardBorderHover,
        "--tag-hover-bg": c.cssTagHoverBg,
        "--tag-hover-color": c.cssTagHoverText,
        "--tag-hover-border": c.cssTagHoverBorder,
      } as React.CSSProperties & Record<string, string>}
      >

        {/* ===== HERO HEADER ===== */}
        <div className="awesome-card" style={{
          borderRadius: "12px", border: `1px solid ${c.cardBorder}`,
          background: c.headerBg,
          boxShadow: c.cardShadow,
          overflow: "hidden", marginBottom: "20px",
          animationDelay: "0s",
        }}>
          {/* Decorative top bar */}
          <div style={{
            height: "4px",
            background: c.headerBar,
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
                  lineHeight: 1.15, color: c.headingText,
                  margin: 0, fontFamily: '"Inter", sans-serif',
                }}>
                  {d.header.name}
                </h1>
                <p style={{
                  fontSize: "15px", color: c.mutedText,
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
                  background: c.statusBg, border: `1px solid ${c.statusBorder}`,
                  fontSize: "12px", fontWeight: 500, color: c.statusText,
                  fontFamily: '"Inter", sans-serif',
                }}>
                  <span style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: c.statusDot, display: "inline-block",
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
                    border: `1px solid ${c.chipBorder}`, background: c.chipBg,
                    fontSize: "13px", color: c.chipText,
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.chipHoverBorder; e.currentTarget.style.background = c.chipHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.chipBorder; e.currentTarget.style.background = c.chipBg; }}
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
                    border: `1px solid ${c.chipBorder}`, background: c.chipBg,
                    fontSize: "13px", color: c.chipText,
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.chipHoverBorder; e.currentTarget.style.background = c.chipHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.chipBorder; e.currentTarget.style.background = c.chipBg; }}
                >
                  <GlobeIcon /> {d.header.website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {d.header.phone && (
                <a href={`tel:${d.header.phone.replace(/[-\s]/g, "")}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px", borderRadius: "8px",
                    border: `1px solid ${c.chipBorder}`, background: c.chipBg,
                    fontSize: "13px", color: c.chipText,
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.chipHoverBorder; e.currentTarget.style.background = c.chipHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.chipBorder; e.currentTarget.style.background = c.chipBg; }}
                >
                  <PhoneIcon /> {d.header.phone}
                </a>
              )}
              {d.header.email && (
                <a href={`mailto:${d.header.email}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px", borderRadius: "8px",
                    border: `1px solid ${c.chipBorder}`, background: c.chipBg,
                    fontSize: "13px", color: c.chipText,
                    cursor: "pointer", transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.chipHoverBorder; e.currentTarget.style.background = c.chipHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.chipBorder; e.currentTarget.style.background = c.chipBg; }}
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
            <CardGridSection title={<SectionChip label={t('summary', locale)} c={c} />} delay="0.05s">
              <div className="awesome-card" style={{
                borderRadius: "10px", border: `1px solid ${c.cardBorder}`,
                background: c.cardBg, padding: "20px 24px",
                boxShadow: c.cardShadow,
                animationDelay: "0.08s",
              }}>
                <p style={{
                  fontSize: "14px", lineHeight: 1.8,
                  color: c.bodyText, margin: 0,
                }}>
                  {d.summary}
                </p>
              </div>
            </CardGridSection>
          )}

          {/* Projects */}
          {d.projects && d.projects.length > 0 && (
            <CardGridSection title={<SectionChip label={t('projects', locale)} c={c} />} delay="0.1s">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {d.projects.map((proj, i) => (
                  <div key={i}
                    className="awesome-card"
                    onMouseEnter={() => setHoveredProj(i)}
                    onMouseLeave={() => setHoveredProj(null)}
                    style={{
                      borderRadius: "10px", border: "1px solid",
                      borderColor: hoveredProj === i ? c.cardBorderHover : c.cardBorder,
                      background: c.cardBg, padding: "20px 24px",
                      boxShadow: c.cardShadow,
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
                          background: hasGoodColor(i) ? c.iconProjectColors[i % c.iconProjectColors.length] : c.iconBg,
                          color: c.iconColor, flexShrink: 0,
                        }}>
                          <FolderIcon />
                        </div>
                        <div>
                          <h3 style={{
                            fontSize: "15px", fontWeight: 600,
                            color: c.headingText, margin: 0,
                          }}>
                            {proj.name}
                          </h3>
                          {proj.repo && (
                            <a href={`https://${proj.repo}`} target="_blank" rel="noopener noreferrer"
                              style={{
                                display: "inline-flex", alignItems: "center", gap: "4px",
                                fontSize: "12px", color: c.dimText, textDecoration: "none",
                                fontFamily: '"JetBrains Mono", monospace', marginTop: "1px",
                              }}>
                              {proj.repo} <ExternalLinkIcon />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {proj.overview && (
                      <p style={{ fontSize: "13px", lineHeight: 1.65, color: c.mutedText, margin: "0 0 10px 0" }}>
                        {proj.overview}
                      </p>
                    )}

                    {proj.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px 0" }}>
                        {proj.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.7, color: c.bodyText,
                            marginBottom: "3px",
                          }}>
                            <span style={{
                              width: "5px", height: "5px", borderRadius: "50%",
                              background: c.bulletDot, flexShrink: 0, marginTop: "8px",
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
                            background: c.tagBg, color: c.tagText,
                            border: `1px solid ${c.tagBorder}`, cursor: "default",
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
            <CardGridSection title={<SectionChip label={t('experience', locale)} c={c} />} delay="0.15s">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {d.experience.map((exp, i) => (
                  <div key={i}
                    className="awesome-card"
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    style={{
                      borderRadius: "10px", border: "1px solid",
                      borderColor: hoveredExp === i ? c.cardBorderHover : c.cardBorder,
                      background: c.cardBg, padding: "20px 24px",
                      boxShadow: c.cardShadow,
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
                          background: c.iconBg, flexShrink: 0,
                        }}>
                          <BriefcaseIcon />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <h3 style={{
                              fontSize: "15px", fontWeight: 600,
                              color: c.headingText, margin: 0,
                            }}>
                              {exp.company}
                            </h3>
                            <span style={{
                              display: "inline-flex", alignItems: "center",
                              padding: "2px 8px", borderRadius: "4px",
                              fontSize: "11px", fontWeight: 500,
                              background: c.badgeBg, color: c.badgeText,
                              border: `1px solid ${c.badgeBorder}`,
                              fontFamily: '"Inter", sans-serif',
                            }}>
                              {exp.position}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: "12px", color: c.veryDimText,
                        fontFamily: '"JetBrains Mono", monospace',
                        whiteSpace: "nowrap",
                      }}>
                        {exp.period}
                      </span>
                    </div>

                    {exp.overview && (
                      <p style={{ fontSize: "13px", color: c.dimText, margin: "6px 0 10px 40px" }}>
                        {exp.overview}
                      </p>
                    )}

                    {exp.bullets && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0 40px" }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            fontSize: "13px", lineHeight: 1.7, color: c.bodyText,
                            marginBottom: "3px",
                          }}>
                            <span style={{
                              width: "5px", height: "5px", borderRadius: "50%",
                              background: c.bulletDot, flexShrink: 0, marginTop: "8px",
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
                  <SectionChip label={t('education', locale)} c={c} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {d.education.map((edu, i) => (
                    <div key={i} className="awesome-card" style={{
                      borderRadius: "10px", border: `1px solid ${c.eduBorder}`,
                      background: c.eduBg, padding: "16px 18px",
                      boxShadow: c.cardShadow,
                      animationDelay: `${0.28 + i * 0.04}s`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <div style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: "28px", height: "28px", borderRadius: "6px",
                          background: c.iconBg, flexShrink: 0,
                        }}>
                          <GraduationCapIcon />
                        </div>
                        <h3 style={{
                          fontSize: "14px", fontWeight: 600, color: c.eduSchool, margin: 0,
                        }}>
                          {edu.school}
                        </h3>
                      </div>
                      <div style={{ marginLeft: "38px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            fontSize: "11px", fontWeight: 500,
                            padding: "1px 7px", borderRadius: "4px",
                            background: c.eduDegreeBg, color: c.eduDegreeText, whiteSpace: "nowrap",
                          }}>
                            {edu.degree}
                          </span>
                          <span style={{
                            fontSize: "11px", color: c.veryDimText,
                            fontFamily: '"JetBrains Mono", monospace', whiteSpace: "nowrap",
                          }}>
                            {edu.period}
                          </span>
                        </div>
                        <div style={{ marginTop: "3px" }}>
                          <span style={{ fontSize: "12.5px", color: c.eduMajor }}>
                            {edu.major}
                          </span>
                        </div>
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
                  <SectionChip label={t('skills', locale)} c={c} />
                </div>
                <div className="awesome-card" style={{
                  borderRadius: "10px", border: `1px solid ${c.skillBorder}`,
                  background: c.cardBg, padding: "16px 18px",
                  boxShadow: c.cardShadow,
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
                        color: c.skillText, background: c.skillBg,
                        border: `1px solid ${c.skillBorder}`, cursor: "default",
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
            <CardGridSection title={<SectionChip label={t('appendix', locale)} c={c} />} delay="0.35s">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
                {d.appendix.map((item, i) => (
                  <div key={i} className="awesome-card" style={{
                    borderRadius: "10px", border: `1px solid ${c.appendixBorder}`,
                    background: c.appendixBg, overflow: "hidden",
                    boxShadow: c.cardShadow,
                    animationDelay: `${0.38 + i * 0.05}s`,
                  }}>
                    <div style={{
                      padding: "14px 18px", borderBottom: `1px solid ${c.appendixHeaderBorder}`,
                      background: c.appendixHeaderBg,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div>
                        <h4 style={{
                          fontSize: "13.5px", fontWeight: 600,
                          color: c.headingText, margin: 0,
                        }}>
                          {item.title}
                        </h4>
                        {item.description && (
                          <p style={{ fontSize: "12px", color: c.dimText, margin: "2px 0 0" }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span style={{
                        fontSize: "10px", fontWeight: 600, color: c.appendixFigText,
                        fontFamily: '"JetBrains Mono", monospace',
                        padding: "2px 8px", borderRadius: "4px",
                        background: c.appendixFigBg, border: `1px solid ${c.appendixFigBorder}`,
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
                          background: c.imgPlaceholderBg,
                          color: c.imgPlaceholderText, gap: "8px", border: `2px dashed ${c.imgPlaceholderBorder}`,
                        }}>
                          <ImagePlaceholderIcon />
                          <span style={{ fontSize: "12px", fontWeight: 500 }}>
                            {t('imgPasteHere', locale)}
                          </span>
                          <span style={{ fontSize: "10px", color: c.imgPlaceholderTextSecondary }}>
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

function hasGoodColor(i: number): boolean {
  return i >= 0;
}
