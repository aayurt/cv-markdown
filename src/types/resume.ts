export type ContactType = 'phone' | 'email' | 'github' | 'website' | 'linkedin';

export interface ContactItem {
  type: ContactType;
  value: string;
}

export interface ResumeData {
  header: {
    name: string;
    title: string;
    status?: string;
    contacts?: ContactItem[];
  };
  summary?: string;
  projects?: ProjectItem[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
  skills?: string[];
  appendix?: AppendixItem[];
}

export interface ProjectItem {
  name: string;
  repo?: string;
  overview?: string;
  bullets?: string[];
  techStack?: string[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  overview?: string;
  bullets?: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  major: string;
  period: string;
}

export interface AppendixItem {
  title: string;
  description?: string;
  imageUrl?: string;
}
