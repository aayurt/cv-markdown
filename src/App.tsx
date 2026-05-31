import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { templates, getTemplate, type ThemeMode } from './templates/registry';
import { parseMarkdown } from './parser/markdown-parser';
import { DEFAULT_MARKDOWN, getDefaultMarkdown } from './data/default-markdown';
import { isViewMode, decodeShareUrl, encodeShareUrl } from './utils/share';
import { exportHtml } from './utils/export-html';
import { t, detectLocale } from './i18n';
import type { Locale } from './i18n';
import ViewMode from './components/ViewMode';
import HelpModal from './components/HelpModal';

const STORAGE_KEY = 'cv-markdown:markdown';
const TEMPLATE_KEY = 'cv-markdown:template';
const LOCALE_KEY = 'cv-markdown:locale';
const THEME_KEY = 'cv-markdown:theme';

function loadMarkdown() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_MARKDOWN;
  } catch {
    return DEFAULT_MARKDOWN;
  }
}

function App() {
  // View mode: render shared resume without editor
  const [viewPayload] = useState(() => isViewMode() ? decodeShareUrl(window.location.hash) : null);
  if (viewPayload) {
    return <ViewMode templateId={viewPayload.t} data={viewPayload.d} />;
  }

  const [markdown, setMarkdown] = useState(loadMarkdown);
  const [templateId, setTemplateId] = useState(
    () => localStorage.getItem(TEMPLATE_KEY) || 'shadcn'
  );
  const [toast, setToast] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [locale, setLocale] = useState<Locale>(
    () => (localStorage.getItem(LOCALE_KEY) as Locale) || detectLocale()
  );
  const [theme, setTheme] = useState<ThemeMode>(
    () => (localStorage.getItem(THEME_KEY) as ThemeMode) || 'dark'
  );
  const previewRef = useRef<HTMLDivElement>(null);

  const template = getTemplate(templateId);
  const PreviewComponent = template.component;

  const resumeData = useMemo(() => {
    try {
      return parseMarkdown(markdown);
    } catch {
      return { header: { name: '', title: '' } };
    }
  }, [markdown]);

  const charCount = markdown.replace(/\s/g, '').length;

  // Auto-save to localStorage with 500ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, markdown); } catch {}
    }, 500);
    return () => clearTimeout(timer);
  }, [markdown]);

  useEffect(() => {
    try { localStorage.setItem(TEMPLATE_KEY, templateId); } catch {}
  }, [templateId]);

  useEffect(() => {
    try { localStorage.setItem(LOCALE_KEY, locale); } catch {}
  }, [locale]);

  useEffect(() => {
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  const handleToggleLocale = useCallback(() => {
    const next: Locale = locale === 'ne' ? 'en' : 'ne';
    // Smart switch: if content is default, swap to new locale's default
    const currentDefault = getDefaultMarkdown(locale);
    if (markdown === currentDefault) {
      setMarkdown(getDefaultMarkdown(next));
    }
    setLocale(next);
  }, [locale, markdown]);

  const handleExportPdf = useCallback(() => {
    if (!previewRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const previewHtml = previewRef.current.innerHTML;
    const tpl = getTemplate(templateId);
    const title = `${resumeData.header.name || 'Resume'} Resume - ${tpl.name}`;
    printWindow.document.title = title;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: 210mm 9999mm;
    margin: 0;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    width: 210mm;
  }

  body > div {
    min-height: auto !important;
    background: white !important;
    display: block !important;
  }

  .resume-card {
    max-width: 100% !important;
    border-radius: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }

  .resume-card,
  .section-block,
  .bullet-item,
  .awesome-card,
  .awesome-section {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .awesome-badge {
    animation: none !important;
    opacity: 1 !important;
    transform: scale(1) !important;
  }

  .resume-footer {
    display: none !important;
  }
</style>
</head>
<body>${previewHtml}</body>
</html>`);
    printWindow.document.close();

    const triggerPrint = () => {
      // Measure content height for single-page continuous PDF
      const body = printWindow.document.body;
      const docEl = printWindow.document.documentElement;
      const contentHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        docEl.scrollHeight, docEl.offsetHeight
      );
      const heightMm = Math.ceil(contentHeight * 25.4 / 96) + 5; // px to mm, +5 safety margin
      const pageStyle = printWindow.document.createElement('style');
      pageStyle.textContent = `@page { size: 210mm ${heightMm}mm; margin: 0; }`;
      printWindow.document.head.appendChild(pageStyle);
      printWindow.print();
    };

    if (printWindow.document.fonts) {
      printWindow.document.fonts.ready.then(triggerPrint);
    } else {
      printWindow.onload = () => setTimeout(triggerPrint, 500);
    }
  }, [resumeData, templateId]);

  const handleExportHtml = useCallback(() => {
    if (!previewRef.current) return;
    const tpl = getTemplate(templateId);
    const title = `${resumeData.header.name || 'Resume'} Resume - ${tpl.name}`;
    exportHtml(previewRef.current, title);
  }, [resumeData, templateId]);

  const handleShareLink = useCallback(() => {
    const url = encodeShareUrl(templateId, resumeData);
    navigator.clipboard.writeText(url).then(() => {
      setToast(t('linkCopied', locale));
      setTimeout(() => setToast(''), 2000);
    });
  }, [templateId, resumeData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', background: '#09090b',
        borderBottom: '1px solid #27272a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '14px', fontWeight: 700, color: '#fafafa',
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '-0.02em',
          }}>
            cv-markdown
          </span>
          <div style={{ display: 'flex', gap: '4px', padding: '2px', borderRadius: '6px', background: '#27272a' }}>
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => !t.disabled && setTemplateId(t.id)}
                style={{
                  padding: '3px 10px', borderRadius: '4px', border: 'none',
                  fontSize: '11px', fontWeight: 500,
                  fontFamily: '"JetBrains Mono", monospace',
                  cursor: t.disabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s',
                  background: templateId === t.id ? '#fafafa' : 'transparent',
                  color: t.disabled ? '#52525b' : templateId === t.id ? '#18181b' : '#a1a1aa',
                  opacity: t.disabled ? 0.5 : 1,
                }}
              >
                {t.name}{t.disabled ? ' ⏳' : ''}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowHelp(true)}
            title="Markdown structure guide"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 10px', borderRadius: '6px',
              border: '1px solid #3f3f46',
              background: 'transparent', color: '#a1a1aa',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            ?
          </button>
          <span style={{ color: '#3f3f46', fontSize: '12px' }}>|</span>
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 10px', borderRadius: '6px',
              border: '1px solid #3f3f46',
              background: 'transparent', color: '#a1a1aa',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <span style={{ color: '#3f3f46', fontSize: '12px' }}>|</span>
          <button
            onClick={handleToggleLocale}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px',
              border: '1px solid #3f3f46',
              background: 'transparent', color: '#a1a1aa',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            {locale === 'ne' ? 'EN' : 'ने'}
          </button>
          <button
            onClick={handleShareLink}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px',
              border: '1px solid #3f3f46',
              background: 'transparent', color: '#a1a1aa',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            {t('shareLink', locale)}
          </button>
          <button
            onClick={handleExportHtml}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px',
              border: '1px solid #3f3f46',
              background: 'transparent', color: '#a1a1aa',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            {t('exportHtml', locale)}
          </button>
          <button
            onClick={handleExportPdf}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '6px', border: 'none',
              background: '#fafafa', color: '#18181b',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'all 0.15s',
            }}
          >
            {t('exportPdf', locale)}
          </button>
        </div>
      </div>

      {/* Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Editor Panel */}
        <div style={{
          width: '50%', display: 'flex', flexDirection: 'column',
          borderRight: '1px solid #27272a', background: '#18181b',
        }}>
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid #27272a',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: '13px', fontWeight: 600, color: '#a1a1aa',
              fontFamily: '"JetBrains Mono", monospace',
            }}>
              {t('editorLabel', locale)}
            </span>
            <span style={{
              fontSize: '11px', color: '#52525b',
              fontFamily: '"JetBrains Mono", monospace',
            }}>
              {t('charCount', locale, { n: charCount })}
            </span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1, resize: 'none', border: 'none', outline: 'none',
              padding: '20px', fontSize: '13px', lineHeight: 1.7,
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              background: '#09090b', color: '#e4e4e7',
              tabSize: 2,
            }}
          />
        </div>

        {/* Preview Panel */}
        <div style={{
          width: '50%', overflow: 'auto', background: '#f4f4f5',
        }}>
          <div ref={previewRef}>
            <PreviewComponent data={resumeData} locale={locale} theme={theme} />
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && <HelpModal locale={locale} onClose={() => setShowHelp(false)} />}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          padding: '8px 20px', borderRadius: '8px',
          background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46',
          fontSize: '13px', fontFamily: '"JetBrains Mono", monospace',
          zIndex: 9999,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;