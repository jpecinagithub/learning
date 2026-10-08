import { useEffect, useRef, useState } from 'react';
import type { Lang, Course } from '../types';
import type { Strings } from '../i18n';
import { CourseIcon } from './CourseIcon';
import { displayDomain } from '../display';

interface Props {
  course: Course;
  lang: Lang;
  t: Strings;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export function CourseCard({ course, lang, t, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const askDelete = () => {
    if (confirming) {
      onDelete(course.id);
      return;
    }
    setConfirming(true);
    timer.current = window.setTimeout(() => setConfirming(false), 3000);
  };

  return (
    <article className="card">
      <div className="card-top">
        <CourseIcon course={course} />
        <div className="card-head">
          <h2 className="card-name">{course.name}</h2>
          <a
            className="card-domain"
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            title={t.cardOpenTitle}
          >
            {displayDomain(course.url)}
          </a>
        </div>
      </div>
      <p className="card-desc">{course.desc[lang] || course.desc.en}</p>
      <div className="card-actions">
        <a
          className="btn btn-primary"
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          title={t.cardOpenTitle}
        >
          {t.open} <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onEdit(course)}
          aria-label={`${t.edit}: ${course.name}`}
        >
          <span aria-hidden="true">✎</span> {t.edit}
        </button>
        <button
          type="button"
          className={`btn ${confirming ? 'btn-danger-confirm' : 'btn-ghost'}`}
          onClick={askDelete}
          aria-label={`${t.delete}: ${course.name}`}
        >
          {confirming ? `⚠ ${t.yesDelete}` : <><span aria-hidden="true">🗑</span> {t.delete}</>}
        </button>
      </div>
      {confirming && <p className="card-confirm-hint">{t.confirmDelete}</p>}
    </article>
  );
}
