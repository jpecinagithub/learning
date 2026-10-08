# LEARNING

A simple personal dashboard with quick access to your training portals and courses.

Each course is a small panel with an **icon**, **name** and **brief description**,
linking to its URL. Panels can be **added**, **edited** and **deleted** —
everything is stored in the browser's `localStorage`, no backend.

## Features

- Responsive card grid (mobile / tablet / desktop)
- Add / edit / delete panels (two-step delete confirmation)
- Icons: custom emoji or image URL, otherwise the site's favicon automatically
- Bilingual EN/ES (English default), language persisted
- PWA: manifest, icons, offline-capable service worker
- Vercel Web Analytics included (`@vercel/analytics` — enable it in the Vercel dashboard)
- Author footer

## Tech

Vite + React 18 + TypeScript, plain CSS, `vite-plugin-pwa`. No backend.

## Develop

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Push this repo to GitHub (already at `github.com/jpecinagithub/learning`).
2. In Vercel: **Add New Project → Import** the repo. Framework preset: Vite.
3. Build command `npm run build`, output directory `dist`.
4. (Optional) Enable **Web Analytics** in the project dashboard.

## Author

Built by Jon Peciña — jpecina@gmail.com
