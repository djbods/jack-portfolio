# CLAUDE.md — Project Context for Jack Bodsworth Portfolio

Read this file at the start of every session before touching any code.
It is the single source of truth for this project's conventions, decisions, and preferences.

---

## Who I Am

**Jack Bodsworth** — Front-End Developer based in Melbourne, VIC, Australia.
- Email: jack.bodsworth@gmail.com
- GitHub: https://github.com/djbods
- LinkedIn: https://linkedin.com/in/jackbodsworth
- 4+ years of professional experience (not 6, not "Senior" — be accurate)
- Primary stack at work: **Vue.js** (not React — Vue is my day job)
- React is a secondary skill I'm growing and showcasing on this portfolio
- Available for new opportunities as of early 2026

---

## What This Project Is

A personal portfolio website built to position me as a top-tier front-end developer
in the Melbourne market. It should feel like an experience, not a brochure.

**Live concept:** Neural / Cyber aesthetic — dark glassmorphism, amber gold accents,
animated neural network canvas, circuit board patterns. Think: living system, not static CV.

**Design tokens:**
- Background: `#07070f` (void-black)
- Accent: `#f59e0b` (amber-500) — primary glow, highlights, CTAs
- Text: `#fafaf9` (warm-50) — headings
- Subtle text: `#a8a29e` (warm-400), `#78716c` (warm-500)
- Glass surfaces: `rgba(255,255,255,0.03)` + `rgba(245,158,11,0.08)` border

**Typography:**
- Display (headings): Syne — loaded from Google Fonts
- Body: DM Sans
- Code / mono: JetBrains Mono

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Framework   | React 18 + Vite + TypeScript (strict mode)      |
| Animation   | Framer Motion (viewport triggers, spring physics)|
| Styling     | TailwindCSS v3 with custom token extensions     |
| Canvas      | Canvas API (vanilla — no Three.js currently)    |
| Backend/CMS | Firebase Firestore (optional; falls back to staticData.ts) |
| Icons       | Lucide React                                    |
| Fonts       | Google Fonts (Syne, DM Sans, JetBrains Mono)    |

**Path alias:** `@/` maps to `src/` (configured in vite.config.ts + tsconfig.json).

---

## Project Structure

```
portfolio/
├── public/favicon.svg
├── src/
│   ├── types/index.ts              ← All shared TypeScript interfaces
│   ├── lib/
│   │   ├── firebase.ts             ← Firebase init + collection helpers
│   │   ├── staticData.ts           ← Source of truth for all content (edit this)
│   │   └── utils.ts                ← cn(), clamp(), lerp(), mapRange()
│   ├── hooks/
│   │   ├── usePortfolioData.ts     ← Firebase → static fallback data hook
│   │   └── useScrollProgress.ts    ← Scroll position + useParallax()
│   ├── components/
│   │   ├── canvas/NeuralCanvas.tsx ← Canvas API neural network animation ⭐
│   │   ├── ui/                     ← Reusable primitives (GlassCard, AmberButton, etc.)
│   │   ├── layout/                 ← Navbar, Footer
│   │   └── sections/               ← One file per page section
│   ├── App.tsx                     ← Root; lazy-loads all sections below Hero
│   ├── main.tsx
│   └── index.css                   ← Tailwind + global keyframes
├── scripts/seed-firebase.mjs       ← One-time Firestore seed
├── CLAUDE.md                       ← YOU ARE HERE
├── .env.example
└── README.md                       ← Setup + architecture docs for humans
```

---

## Content — Where Real Data Lives

**All content is in `src/lib/staticData.ts`.** This is the file to edit when updating
bio, jobs, projects, or skills. Firebase Firestore mirrors this when configured,
but the static file is always the fallback.

### Real Work Experience
1. **University of Melbourne** — Front-End Developer, Jul 2023 – Present
   - Design system across 5+ repos, CI/CD automation, enrolment platform, Storybook
2. **Australasian College for Emergency Medicine (ACEM)** — Front-End Developer, Jul 2021 – Jul 2023
   - Component library, Storybook, unit/E2E testing, performance optimisation

### Real Skills (primary → secondary)
Vue.js › JavaScript › TypeScript › HTML5 › CSS3 › Sass › Storybook › Git › CI/CD ›
React › Node.js › UIkit › Figma › Unit Testing › E2E Testing › Bash › SwiftUI

### Accurate Stats (from resume)
- 4+ years experience
- 40% faster deployment cycles (CI/CD work at UniMelb)
- 30% page load time reduction (Vue.js optimisation work)

---

## Design & UX Preferences

- **Dark mode only** — no light mode toggle needed
- **Amber accents, not blue** — resist any urge to use blue/purple; amber is the brand
- **Glassmorphism** — surfaces use `GlassCard` component, never solid fills
- **Framer Motion** — reveals use `useInView` *without* `triggerOnce` so animations replay every time a section re-enters the viewport (including after scrolling back to the top); set the `animate` prop to the initial values when out of view, not `{}`, so elements actually reset
- **No mid-word line breaks on the hero name** — `whitespace-nowrap` per word, `clamp()` font size
- **Mobile-first** — test at 375px, 768px, 1280px, 1920px
- **Subtle, not loud** — glow effects should feel premium, not garish. When in doubt, reduce opacity.

---

## Git / Branching Strategy

- **`main`** — production-ready, always deployable
- **`feature/*`** — new sections or capabilities (e.g. `feature/blog-section`)
- **`improve/*`** — refinements to existing sections (e.g. `improve/hero-parallax`)
- **`fix/*`** — bug fixes (e.g. `fix/mobile-nav-overlap`)

**Each session's changes get their own branch + PR** so there's a clean history
of every prompt → improvement cycle. Never commit directly to main without a branch.

Commit message format:
```
type(scope): short description

Longer explanation if needed.
```
Types: `feat`, `fix`, `improve`, `refactor`, `style`, `docs`, `chore`

---

## Firebase Setup Status

- **Not yet configured** — site runs entirely on `staticData.ts` fallback
- When ready: copy `.env.example` → `.env.local`, fill in credentials
- Firestore collections: `config/site`, `projects/*`, `experience/*`, `skills/*`
- Seed script: `npm run seed` (requires `firebase-admin` + service account)

---

## Things Claude Should Always Do

1. **Read this file first** before any code changes in a new session
2. **Create a new git branch** before starting any meaningful work
3. **Update `staticData.ts`** for content changes — never hardcode content in components
4. **Use the `@/` path alias** — never use relative `../` imports
5. **Respect TypeScript strict mode** — no `any`, no unchecked nulls
6. **Test component changes at mobile width** — 375px is the minimum supported size
7. **Keep animations subtle** — Framer Motion transitions ≤ 0.7s, easing `easeOut` or spring
8. **Commit with descriptive messages** following the format above

## Things Claude Should Never Do

- Add blue, purple, or green as accent colours (amber only)
- Use `React.FC` type annotation (use explicit prop interfaces instead)
- Install Three.js without asking first (it's a significant bundle addition)
- Hardcode Jack's personal details in component files (always source from config/staticData)
- Create a light mode
- Break the `whitespace-nowrap` word-grouping on the Hero name
- Commit directly to `main`

---

## Known Issues / Future Work

- [ ] Contact form backend not wired up (currently simulates with setTimeout) — consider Formspree
- [ ] Firebase not yet configured — todo after domain purchase
- [ ] No real project screenshots / images (imageUrl fields are empty)
- [ ] GitHub repo not yet pushed (needs `git remote add origin` + push from local terminal)
- [ ] Consider adding a `/blog` section using MDX
- [ ] Consider React Three Fiber for a 3D version of the neural hero background
- [ ] Add Plausible or Fathom analytics (privacy-first)
- [ ] SEO: add og:image meta tag once a screenshot is ready

---

*Last updated: March 2026 — Session 2 (resume data + hero fix + CLAUDE.md)*
