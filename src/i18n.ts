export type Locale = 'ne' | 'en';

const messages: Record<Locale, Record<string, string>> = {
  ne: {
    // UI
    exportPdf: 'PDF डाउनलोड',
    exportHtml: 'HTML निर्यात',
    shareLink: 'लिङ्क साझा गर्नुहोस्',
    linkCopied: 'लिङ्क क्लिपबोर्डमा प्रतिलिपि गरियो',
    editorLabel: 'resume.md',
    charCount: '{n} अक्षर',
    viewFooter: 'cv-markdown बाट बनाइएको',
    // Template section headers
    summary: 'सारांश',
    projects: 'परियोजनाहरू',
    experience: 'अनुभव',
    education: 'शिक्षा',
    skills: 'सीपहरू',
    appendix: 'परिशिष्ट',
    // Editorial template
    jobIntention: 'उद्देश्य',
    degree: 'डिग्री',
    major: 'प्रमुख विषय',
    period: 'अवधि',
    // Claude template
    askExperience: 'कामको अनुभवको बारेमा के छ?',
    askIntro: 'आफ्नो बारेमा बताउनुहोस् 👋',
    askProjects: 'कुनै प्रमुख परियोजनाहरू?',
    askAppendix: 'कुनै अतिरिक्त सामग्री साझा गर्न चाहनुहुन्छ?',
    thanksReading: 'पढ्नु भएकोमा धन्यवाद',
    // Shared
    imgPlaceholder: 'Markdown मा ![alt](url) प्रयोग गरेर तस्वीर सम्मिलित गर्नुहोस्',
    imgPasteHere: 'यहाँ तस्वीर टाँस्नुहोस्',
    techStack: 'प्रविधि स्ट्याक',
    // Help modal
    helpTitle: 'मार्कडाउन संरचना',
    helpSubtitle: 'cv-markdown ले तपाईंको रिजुमे कसरी पार्स गर्छ भन्ने कुरा यहाँ छ',
    helpStructure: 'संरचना',
    helpAgentPrompt: 'एजेन्ट प्रम्प्ट',
    helpAgentDesc: 'यो प्रम्प्ट कुनै पनि AI एजेन्ट (Claude, ChatGPT, आदि) लाई दिनुहोस् ताकि यसले सही ढाँचामा रिजुमे मार्कडाउन उत्पन्न गर्न सकोस्:',
  },
  en: {
    // UI
    exportPdf: 'PDF',
    exportHtml: 'HTML',
    shareLink: 'Copy Link',
    linkCopied: 'Link copied to clipboard',
    editorLabel: 'resume.md',
    charCount: '{n} chars',
    viewFooter: 'Built with cv-markdown',
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
    // Help modal
    helpTitle: 'Markdown Structure',
    helpSubtitle: 'How cv-markdown parses your resume',
    helpStructure: 'Structure',
    helpAgentPrompt: 'Agent Prompt',
    helpAgentDesc: 'Give this prompt to any AI agent (Claude, ChatGPT, etc.) to generate resume markdown in the correct format:',
  },
};

export function detectLocale(): Locale {
  try {
    const lang = navigator.language || '';
    return lang.startsWith('ne') ? 'ne' : 'en';
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
