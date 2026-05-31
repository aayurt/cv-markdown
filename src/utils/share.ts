import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { ResumeData } from '../types/resume';

interface SharePayload {
  t: string;       // templateId
  d: ResumeData;   // resume data
}

export function encodeShareUrl(templateId: string, data: ResumeData): string {
  const payload: SharePayload = { t: templateId, d: data };
  const compressed = compressToEncodedURIComponent(JSON.stringify(payload));
  return `${window.location.origin}${window.location.pathname}#/view?d=${compressed}`;
}

export function decodeShareUrl(hash: string): SharePayload | null {
  try {
    const match = hash.match(/^#\/view\?d=(.+)$/);
    if (!match) return null;
    const json = decompressFromEncodedURIComponent(match[1]);
    if (!json) return null;
    return JSON.parse(json) as SharePayload;
  } catch {
    return null;
  }
}

export function isViewMode(): boolean {
  return window.location.hash.startsWith('#/view?');
}
