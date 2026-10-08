import { useEffect, useState } from 'react';
import type { Course } from '../types';
import type { Strings } from '../i18n';
import { makeId } from '../storage';

interface Props {
  t: Strings;
  initial: Course | null; // null = add mode
  onClose: () => void;
  onSave: (course: Course) => void;
}

function validUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function CourseModal({ t, initial, onClose, onSave }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [url, setUrl] = useState(initial?.url ?? '');
  const [descEn, setDescEn] = useState(initial?.desc.en ?? '');
  const [descEs, setDescEs] = useState(initial?.desc.es ?? '');
  const [icon, setIcon] = useState(initial?.icon ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) {
      setError(t.required);
      return;
    }
    if (!validUrl(url)) {
      setError(t.invalidUrl);
      return;
    }
    onSave({
      id: initial?.id ?? makeId(),
      name: name.trim(),
      url: url.trim(),
      icon: icon.trim() || undefined,
      desc: { en: descEn.trim(), es: descEs.trim() },
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={initial ? t.editTitle : t.addTitle}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">{initial ? t.editTitle : t.addTitle}</h2>
        <form onSubmit={submit} className="modal-form">
          <label className="field">
            <span>{t.fieldName} *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Course"
              autoFocus
              maxLength={60}
            />
          </label>
          <label className="field">
            <span>{t.fieldUrl} *</span>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/"
              inputMode="url"
              maxLength={300}
            />
          </label>
          <label className="field">
            <span>{t.fieldDescEn}</span>
            <textarea
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              rows={2}
              maxLength={220}
              placeholder="What this course does…"
            />
          </label>
          <label className="field">
            <span>{t.fieldDescEs}</span>
            <textarea
              value={descEs}
              onChange={(e) => setDescEs(e.target.value)}
              rows={2}
              maxLength={220}
              placeholder="Qué hace esta herramienta…"
            />
          </label>
          <label className="field">
            <span>{t.fieldIcon}</span>
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="🧪"
              maxLength={300}
            />
            <small className="hint">{t.iconHint}</small>
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className="btn btn-primary">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
