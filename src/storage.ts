import type { Lang, Course } from './types';
import { SEED_COURSES } from './seed';

const KEY = 'learning.app.v1';

interface Stored {
  courses: Course[];
  lang: Lang;
}

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (!Array.isArray(parsed.courses)) return null;
    return {
      courses: parsed.courses.filter(
        (t): t is Course =>
          !!t && typeof t.id === 'string' && typeof t.name === 'string' && typeof t.url === 'string',
      ),
      lang: parsed.lang === 'es' ? 'es' : 'en',
    };
  } catch {
    return null;
  }
}

export function loadState(): Stored {
  return readStored() ?? { courses: SEED_COURSES, lang: 'en' };
}

export function saveState(courses: Course[], lang: Lang): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ courses, lang } satisfies Stored));
  } catch {
    // Storage full or unavailable — the app still works in memory.
  }
}

export function resetState(): Stored {
  const fresh: Stored = { courses: SEED_COURSES, lang: 'en' };
  saveState(fresh.courses, fresh.lang);
  return fresh;
}

export function makeId(): string {
  return `course-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
