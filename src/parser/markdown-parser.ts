import type {
  ResumeData,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  AppendixItem,
  ContactType,
  ContactItem,
} from '../types/resume';

function parseFrontmatter(markdown: string): { data: Record<string, string>; content: string } {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { data: {}, content: markdown };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  for (const line of yamlBlock.split('\n')) {
    const m = line.match(/^(\w+)\s*:\s*(.+)/);
    if (m) {
      let value = m[2].trim();
      // strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[m[1]] = value;
    }
  }

  return { data, content };
}

export function parseMarkdown(markdown: string): ResumeData {
  const { data: frontmatter, content } = parseFrontmatter(markdown);

  const contactTypes = new Set<string>(['phone', 'email', 'github', 'website', 'linkedin']);
  const contacts: ContactItem[] = Object.keys(frontmatter)
    .filter(key => contactTypes.has(key))
    .map(key => ({ type: key as ContactType, value: frontmatter[key] }));

  const header: ResumeData['header'] = {
    name: frontmatter.name || '',
    title: frontmatter.title || '',
    status: frontmatter.status,
    contacts,
  };

  const sections = splitSections(content);
  const result: ResumeData = { header };

  for (const section of sections) {
    const key = matchSectionType(section.title);
    switch (key) {
      case 'summary':
        result.summary = section.body.trim();
        break;
      case 'projects':
        result.projects = parseProjects(section.body);
        break;
      case 'experience':
        result.experience = parseExperience(section.body);
        break;
      case 'education':
        result.education = parseEducation(section.body);
        break;
      case 'skills':
        result.skills = parseSkills(section.body);
        break;
      case 'appendix':
        result.appendix = parseAppendix(section.body);
        break;
    }
  }

  return result;
}

interface Section {
  title: string;
  body: string;
}

function splitSections(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split('\n');
  let currentTitle = '';
  let currentLines: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      if (currentTitle) {
        sections.push({ title: currentTitle, body: currentLines.join('\n') });
      }
      currentTitle = h2Match[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentTitle) {
    sections.push({ title: currentTitle, body: currentLines.join('\n') });
  }
  return sections;
}

type SectionType = 'summary' | 'projects' | 'experience' | 'education' | 'skills' | 'appendix';

function matchSectionType(title: string): SectionType | null {
  const t = title.toLowerCase();
  if (t.includes('सारांश') || t.includes('summary') || t.includes('about')) return 'summary';
  if (t.includes('परियोजना') || t.includes('project')) return 'projects';
  if (t.includes('अनुभव') || t.includes('experience') || t.includes('work')) return 'experience';
  if (t.includes('शिक्षा') || t.includes('education')) return 'education';
  if (t.includes('सीप') || t.includes('skill')) return 'skills';
  if (t.includes('परिशिष्ट') || t.includes('appendix')) return 'appendix';
  return null;
}

function splitEntries(body: string): string[] {
  const entries: string[] = [];
  let current: string[] = [];
  for (const line of body.split('\n')) {
    if (line.match(/^###\s+/)) {
      if (current.length) entries.push(current.join('\n'));
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) entries.push(current.join('\n'));
  return entries.filter(e => e.match(/^###\s+/m));
}

function extractBullets(lines: string[]): string[] {
  return lines
    .filter(l => l.match(/^\s*-\s+/))
    .map(l => l.replace(/^\s*-\s+/, ''));
}

function extractQuote(lines: string[]): string | undefined {
  const q = lines.find(l => l.match(/^>\s+/));
  return q ? q.replace(/^>\s+/, '') : undefined;
}

function extractInlineCode(lines: string[]): string[] {
  const tags: string[] = [];
  for (const line of lines) {
    if (line.match(/^\s*-\s+/) || line.match(/^>\s+/) || line.match(/^###/)) continue;
    const matches = line.matchAll(/`([^`]+)`/g);
    for (const m of matches) tags.push(m[1]);
  }
  return tags;
}

function extractImage(lines: string[]): string | undefined {
  for (const line of lines) {
    const m = line.match(/!\[.*?\]\((.+?)\)/);
    if (m) return m[1];
  }
  return undefined;
}

function parseProjects(body: string): ProjectItem[] {
  return splitEntries(body).map(entry => {
    const lines = entry.split('\n');
    const titleLine = lines[0].replace(/^###\s+/, '');
    const parts = titleLine.split('|').map(s => s.trim());
    const name = parts[0];
    const repo = parts[1] || undefined;
    const restLines = lines.slice(1);
    return {
      name,
      repo,
      overview: extractQuote(restLines),
      bullets: extractBullets(restLines),
      techStack: extractInlineCode(restLines),
    };
  });
}

function parseExperience(body: string): ExperienceItem[] {
  return splitEntries(body).map(entry => {
    const lines = entry.split('\n');
    const titleLine = lines[0].replace(/^###\s+/, '');
    const parts = titleLine.split('|').map(s => s.trim());
    const company = parts[0];
    const position = parts[1] || '';
    const period = parts[2] || '';
    const restLines = lines.slice(1);
    return {
      company,
      position,
      period,
      overview: extractQuote(restLines),
      bullets: extractBullets(restLines),
    };
  });
}

function parseEducation(body: string): EducationItem[] {
  return splitEntries(body).map(entry => {
    const titleLine = entry.split('\n')[0].replace(/^###\s+/, '');
    const parts = titleLine.split('|').map(s => s.trim());
    return {
      school: parts[0],
      degree: parts[1] || '',
      major: parts[2] || '',
      period: parts[3] || '',
    };
  });
}

function parseSkills(body: string): string[] {
  return body
    .split('\n')
    .filter(l => l.match(/^\s*-\s+/))
    .map(l => l.replace(/^\s*-\s+/, ''));
}

function parseAppendix(body: string): AppendixItem[] {
  return splitEntries(body).map(entry => {
    const lines = entry.split('\n');
    const title = lines[0].replace(/^###\s+/, '').trim();
    const restLines = lines.slice(1);
    const descLines = restLines.filter(
      l => l.trim() && !l.match(/^!\[/) && !l.match(/^\s*-\s+/) && !l.match(/^>\s+/)
    );
    return {
      title,
      description: descLines.map(l => l.trim()).join(' ') || undefined,
      imageUrl: extractImage(restLines),
    };
  });
}
