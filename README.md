# Edge Physique — Website

A single-page marketing site for Edge Physique Fitness & Health Care Center,
built with React + Vite + Framer Motion + lucide-react.

## Project structure

```
edge-physique/
├── index.html          # HTML entry point
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx         # React root / mount point
    └── App.jsx          # The entire site (component + styles)
```

## Run it locally

You need [Node.js](https://nodejs.org/) 18+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open that in
your browser — the page auto-reloads whenever you edit `src/App.jsx`.

## Build for production

```bash
npm run build
```

This outputs a static, deployable site into a `dist/` folder. Preview the
production build locally with:

```bash
npm run preview
```

## Upload to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Edge Physique site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(`node_modules` and `dist` are already excluded via `.gitignore`, so the repo
stays small.)

## Deploy (optional)

The `dist/` folder from `npm run build` is a plain static site — you can drop
it on Netlify, Vercel, GitHub Pages, or any static host. On Vercel/Netlify you
can also just connect the GitHub repo directly; both auto-detect Vite
(`build command: npm run build`, `output directory: dist`).

## Notes / what was fixed while setting this up

- Removed a leftover debug `console.log`.
- The custom cursor component had a bug where it checked `typeof motion` (which
  is always defined, since it's a static import) instead of the `enabled`
  state, so the desktop-only custom cursor would render even on touch devices.
  Fixed to properly gate on `enabled`.
- Removed dead defensive fallback branches (`typeof motion === 'undefined'`
  ternaries around `motion.div`/`AnimatePresence`) — with a static import,
  `motion` can't be undefined at runtime, and one fallback path rendered a
  MotionValue object directly into a CSS `transform` string, which would have
  shown up as `scaleX([object Object])`.
  removed an unused `Dumbbell` icon import.
- Verified with the TypeScript compiler (JSX/syntax mode) that the file parses
  cleanly — no mismatched tags, braces, or syntax errors.

## Customizing

All business info, images, and copy live in constants at the top of
`src/App.jsx` (`BUSINESS`, `IMAGES`, `PROGRAMS`, `FACILITIES`, `TRAINERS`,
`PLANS`, `TESTIMONIALS`, `FAQS`) — edit those instead of hunting through the
JSX.
