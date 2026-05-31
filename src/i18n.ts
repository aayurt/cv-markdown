export type Locale = 'zh' | 'en';

const messages: Record<Locale, Record<string, string>> = {
  zh: {
    // UI
    exportPdf: '下载 PDF',
    exportHtml: '导出 HTML',
    shareLink: '分享链接',
    linkCopied: '链接已复制到剪贴板',
    editorLabel: 'resume.md',
    charCount: '{n} 字',
    viewFooter: '使用 styled-resume 制作你的简历',
    // Template section headers
    summary: '个人简介',
    projects: '项目经历',
    experience: '工作经历',
    education: '教育经历',
    skills: '技能',
    appendix: '附录',
    // Editorial template
    jobIntention: '求职意向',
    degree: '学位',
    major: '专业',
    period: '时间',
    // Claude template
    askExperience: '工作经历呢？',
    askIntro: '介绍一下你自己吧 👋',
    askProjects: '有什么代表性项目吗？',
    askAppendix: '有没有想展示的附加材料？',
    thanksReading: '感谢阅读',
    // Shared
    imgPlaceholder: '在 Markdown 中使用 ![alt](url) 插入图片',
    imgPasteHere: '在此处粘贴图片',
    techStack: '技术栈',
  },
  en: {
    // UI
    exportPdf: 'PDF',
    exportHtml: 'HTML',
    shareLink: 'Copy Link',
    linkCopied: 'Link copied to clipboard',
    editorLabel: 'resume.md',
    charCount: '{n} chars',
    viewFooter: 'Built with styled-resume',
    // Template section headers
    summary: 'Summary',
    projects: 'Projects',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    appendix: 'Appendix',
    // Editorial template
    jobIntention: 'Objective',
    degree: 'Degree',
    major: 'Major',
    period: 'Period',
    // Claude template
    askExperience: 'What about work experience?',
    askIntro: 'Tell me about yourself 👋',
    askProjects: 'Any notable projects?',
    askAppendix: 'Any additional materials to share?',
    thanksReading: 'Thanks for reading',
    // Shared
    imgPlaceholder: 'Use ![alt](url) in Markdown to insert image',
    imgPasteHere: 'Paste image here',
    techStack: 'Tech Stack',
  },
};

export function detectLocale(): Locale {
  try {
    const lang = navigator.language || '';
    return lang.startsWith('zh') ? 'zh' : 'en';
  } catch {
    return 'en';
  }
}

export function t(key: string, locale: Locale, params?: Record<string, string | number>): string {
  let text = messages[locale]?.[key] || messages.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
