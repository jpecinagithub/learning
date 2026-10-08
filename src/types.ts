export interface Course {
  id: string;
  name: string;
  url: string;
  /** Optional: an emoji (e.g. "🧪") or an image URL. Falls back to the site favicon. */
  icon?: string;
  desc: { en: string; es: string };
}

export type Lang = 'en' | 'es';
