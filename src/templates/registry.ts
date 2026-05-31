import type { ComponentType } from "react";
import type { ResumeData } from "../types/resume";
import type { Locale } from "../i18n";
import ShadcnPreview from "./shadcn/PreviewTemplate";
import ShadcnRetroPreview from "./shadcn-retro/PreviewTemplate";
import AwesomeShadcnPreview from "./awesomeshadcn/PreviewTemplate";
import PlainPreview from "./plain/PreviewTemplate";
import ClaudePreview from "./claude/PreviewTemplate";
import TerminalPreview from "./terminal/PreviewTemplate";
import EditorialPreview from "./editorial/PreviewTemplate";

export type ThemeMode = 'light' | 'dark';

export interface TemplateProps {
  data: ResumeData;
  locale?: Locale;
  theme?: ThemeMode;
}

export interface Template {
  id: string;
  name: string;
  component: ComponentType<TemplateProps>;
  disabled?: boolean;
}

export const templates: Template[] = [
  { id: "shadcn", name: "Shadcn", component: ShadcnPreview },
  { id: "shadcn-retro", name: "Retro", component: ShadcnRetroPreview },
  { id: "awesomeshadcn", name: "Awesome", component: AwesomeShadcnPreview },
  { id: "plain", name: "Plain", component: PlainPreview },
  { id: "claude", name: "Claude", component: ClaudePreview },
  { id: "terminal", name: "Terminal", component: TerminalPreview },
  { id: "editorial", name: "Editorial", component: EditorialPreview },
];

export const getTemplate = (id: string) =>
  templates.find((t) => t.id === id && !t.disabled) ?? templates[0];
