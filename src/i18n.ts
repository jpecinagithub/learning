import type { Lang } from './types';

export interface Strings {
  subtitle: string;
  addCourse: string;
  open: string;
  edit: string;
  delete: string;
  confirmDelete: string;
  yesDelete: string;
  cancel: string;
  addTitle: string;
  editTitle: string;
  fieldName: string;
  fieldUrl: string;
  fieldDescEn: string;
  fieldDescEs: string;
  fieldIcon: string;
  iconHint: string;
  save: string;
  required: string;
  invalidUrl: string;
  empty: string;
  footerBuilt: string;
  reset: string;
  resetConfirm: string;
  langName: string;
  langLabel: string;
  cardOpenTitle: string;
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    subtitle: 'Your personal learning hub — quick access to your training portals and courses.',
    addCourse: 'Add course',
    open: 'Open',
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: 'Delete this course?',
    yesDelete: 'Yes, delete',
    cancel: 'Cancel',
    addTitle: 'Add course',
    editTitle: 'Edit course',
    fieldName: 'Name',
    fieldUrl: 'URL',
    fieldDescEn: 'Description (English)',
    fieldDescEs: 'Description (Spanish)',
    fieldIcon: 'Icon (emoji or image URL, optional)',
    iconHint: 'Leave empty to use the site favicon automatically.',
    save: 'Save',
    required: 'Name and a valid URL are required.',
    invalidUrl: 'Enter a valid URL starting with http:// or https://',
    empty: 'No courses yet. Add your first one to get started.',
    footerBuilt: 'Built by Jon Peciña',
    reset: 'Reset to defaults',
    resetConfirm: 'Reset the dashboard to the original courses? Your changes will be lost.',
    langName: 'ES',
    langLabel: 'Switch to Spanish',
    cardOpenTitle: 'Open in a new tab',
  },
  es: {
    subtitle: 'Tu centro de aprendizaje — acceso rápido a tus portales de formación y cursos.',
    addCourse: 'Añadir curso',
    open: 'Abrir',
    edit: 'Editar',
    delete: 'Eliminar',
    confirmDelete: '¿Eliminar este curso?',
    yesDelete: 'Sí, eliminar',
    cancel: 'Cancelar',
    addTitle: 'Añadir curso',
    editTitle: 'Editar curso',
    fieldName: 'Nombre',
    fieldUrl: 'URL',
    fieldDescEn: 'Descripción (inglés)',
    fieldDescEs: 'Descripción (español)',
    fieldIcon: 'Icono (emoji o URL de imagen, opcional)',
    iconHint: 'Déjalo vacío para usar el favicon del sitio automáticamente.',
    save: 'Guardar',
    required: 'El nombre y una URL válida son obligatorios.',
    invalidUrl: 'Introduce una URL válida que empiece por http:// o https://',
    empty: 'Aún no hay cursos. Añade el primero para empezar.',
    footerBuilt: 'Creado por Jon Peciña',
    reset: 'Restablecer valores',
    resetConfirm: '¿Restablecer el panel a los cursos originales? Perderás tus cambios.',
    langName: 'EN',
    langLabel: 'Cambiar a inglés',
    cardOpenTitle: 'Abrir en una pestaña nueva',
  },
};

export function getStrings(lang: Lang): Strings {
  return STRINGS[lang];
}
