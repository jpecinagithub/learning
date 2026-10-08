/**
 * Vercel appends random deployment suffixes to some project URLs
 * (e.g. `js-academy-zj4t.vercel.app`). The links must keep the real URL,
 * but the cards show a cleaned domain without the suffix.
 */
const CLEAN_HOST: Record<string, string> = {
  'js-academy-zj4t.vercel.app': 'js-academy.vercel.app',
  'cybersecurity-academy-wogf.vercel.app': 'cybersecurity-academy.vercel.app',
  'alterna-six.vercel.app': 'alterna.vercel.app',
  'harness-lab-ten.vercel.app': 'harness-lab.vercel.app',
};

export function displayDomain(url: string): string {
  try {
    const host = new URL(url).hostname;
    return CLEAN_HOST[host] ?? host;
  } catch {
    return url;
  }
}
