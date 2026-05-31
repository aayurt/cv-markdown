import { useRef } from 'react';
import { getTemplate } from '../templates/registry';
import { t, detectLocale } from '../i18n';
import type { Locale } from '../i18n';
import type { ResumeData } from '../types/resume';

interface ViewModeProps {
  templateId: string;
  data: ResumeData;
  locale?: Locale;
}

export default function ViewMode({ templateId, data, locale }: ViewModeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const template = getTemplate(templateId);
  const Preview = template.component;
  const l = locale || detectLocale();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f4f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div ref={ref} style={{ width: '100%' }}>
        <Preview data={data} locale={l} />
      </div>
      <footer style={{
        padding: '24px 0 32px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#a1a1aa',
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        <a
          href={window.location.origin + window.location.pathname}
          style={{ color: '#71717a', textDecoration: 'none' }}
        >
          {t('viewFooter', l)}
        </a>
      </footer>
    </div>
  );
}
