import { useCallback, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { Lang, Course } from './types';
import { getStrings } from './i18n';
import { loadState, saveState, resetState } from './storage';
import { CourseCard } from './components/CourseCard';
import { CourseModal } from './components/CourseModal';

export default function App() {
  const [initial] = useState(loadState);
  const [courses, setCourses] = useState<Course[]>(initial.courses);
  const [lang, setLang] = useState<Lang>(initial.lang);
  const [modal, setModal] = useState<{ open: boolean; course: Course | null }>({
    open: false,
    course: null,
  });

  const t = getStrings(lang);

  useEffect(() => {
    saveState(courses, lang);
  }, [courses, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'en' ? 'es' : 'en'));
  }, []);

  const handleSave = useCallback((course: Course) => {
    setCourses((prev) => {
      const idx = prev.findIndex((p) => p.id === course.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = course;
        return next;
      }
      return [...prev, course];
    });
    setModal({ open: false, course: null });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setCourses((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm(t.resetConfirm)) {
      const fresh = resetState();
      setCourses(fresh.courses);
      setLang(fresh.lang);
    }
  }, [t]);

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="30" height="30">
              <rect x="2" y="2" width="60" height="60" rx="14" fill="#150a0d" />
              <g fill="#d9485f">
                <rect x="14" y="14" width="10" height="10" rx="3" />
                <rect x="27" y="14" width="10" height="10" rx="3" />
                <rect x="40" y="14" width="10" height="10" rx="3" />
                <rect x="14" y="27" width="10" height="10" rx="3" />
                <rect x="27" y="27" width="10" height="10" rx="3" fill="#f2a3ae" />
                <rect x="40" y="27" width="10" height="10" rx="3" />
                <rect x="14" y="40" width="10" height="10" rx="3" />
                <rect x="27" y="40" width="10" height="10" rx="3" />
                <rect x="40" y="40" width="10" height="10" rx="3" />
              </g>
            </svg>
          </span>
          <div>
            <h1 className="brand-title">LEARNING</h1>
            <p className="brand-sub">{t.subtitle}</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-ghost lang-btn"
            onClick={toggleLang}
            title={t.langLabel}
            aria-label={t.langLabel}
          >
            {t.langName}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModal({ open: true, course: null })}
          >
            <span aria-hidden="true">＋</span> {t.addCourse}
          </button>
        </div>
      </header>

      <main className="main">
        {courses.length === 0 ? (
          <div className="empty">
            <p>{t.empty}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setModal({ open: true, course: null })}
            >
              <span aria-hidden="true">＋</span> {t.addCourse}
            </button>
          </div>
        ) : (
          <div className="grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                lang={lang}
                t={t}
                onEdit={(tl) => setModal({ open: true, course: tl })}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <span>
          {t.footerBuilt} · <a href="mailto:jpecina@gmail.com">jpecina@gmail.com</a>
        </span>
        <button type="button" className="link-btn" onClick={handleReset}>
          {t.reset}
        </button>
      </footer>

      {modal.open && (
        <CourseModal
          t={t}
          initial={modal.course}
          onClose={() => setModal({ open: false, course: null })}
          onSave={handleSave}
        />
      )}
      <Analytics />
    </div>
  );
}
