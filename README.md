# Jack Bodsworth — Portfolio

> Neural/Cyber aesthetic · Amber + Warm White · React + TypeScript + Firebase

A production-ready personal portfolio built with modern tooling, smooth Framer Motion animations, a live Canvas neural network background, and Firebase for content management.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (Firebase is optional — static data is the fallback)
cp .env.example .env.local
# → Edit .env.local with your Firebase credentials (or leave blank to use static data)

# 3. Start dev server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build
npm run preview
```

---

## Firebase Setup (Optional but Recommended)

Firebase lets you edit your portfolio content (projects, experience, bio) from the Firebase Console without touching code.

### Step 1: Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → give it a name (e.g. `jack-portfolio`)
3. Disable Google Analytics (not needed)

### Step 2: Enable Firestore

1. In your project: **Build → Firestore Database**
2. Click **Create database** → Start in **test mode**
3. Choose a region close to Melbourne (e.g. `australia-southeast1`)

### Step 3: Get your web app credentials

1. **Project Settings** (⚙️ gear icon) → **Your apps** → Add a web app
2. Copy the config values into `.env.local`

### Step 4: Seed initial data

The seed script populates your Firestore with the static data from `src/lib/staticData.ts`.

```bash
# Install extra seed dependencies (one-time)
npm install --save-dev firebase-admin dotenv

# Add service account credentials to .env.local:
# FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
# FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
# (Get these from Firebase Console → Project Settings → Service Accounts → Generate new private key)

npm run seed
```

### Step 5: Edit content in Firebase Console

After seeding, you can update any field directly in the Firestore console — no redeploy needed. The site fetches fresh data on every load.

#### Collections

| Collection   | Doc ID    | Description                          |
|--------------|-----------|--------------------------------------|
| `config`     | `site`    | Bio, title, contact links, etc.      |
| `projects`   | (any id)  | Portfolio projects                   |
| `experience` | (any id)  | Work history entries                 |
| `skills`     | (any id)  | Skill nodes for the neural map       |

---

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── types/
│   │   └── index.ts              # All TypeScript interfaces
│   ├── lib/
│   │   ├── firebase.ts           # Firebase init + collection helpers
│   │   ├── staticData.ts         # Fallback content (edit to customise)
│   │   └── utils.ts              # cn(), clamp(), lerp(), etc.
│   ├── hooks/
│   │   ├── usePortfolioData.ts   # Firebase → static data fallback
│   │   └── useScrollProgress.ts  # Scroll position + parallax hook
│   ├── components/
│   │   ├── canvas/
│   │   │   └── NeuralCanvas.tsx  # Canvas API neural network animation
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx     # Core glass surface component
│   │   │   ├── AmberButton.tsx   # CTA button (solid/outline/ghost)
│   │   │   ├── SectionTitle.tsx  # Animated section heading
│   │   │   └── CursorGlow.tsx    # Custom amber cursor overlay
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Sticky navbar with mobile menu
│   │   │   └── Footer.tsx        # Social links + copyright
│   │   └── sections/
│   │       ├── Hero.tsx          # Full-screen hero with typing effect
│   │       ├── About.tsx         # Bio + interactive code snippet
│   │       ├── Skills.tsx        # Interactive SVG neural skill map
│   │       ├── Projects.tsx      # Filterable project cards
│   │       ├── Experience.tsx    # Expandable timeline
│   │       └── Contact.tsx       # Contact form + social links
│   ├── App.tsx                   # Root + lazy loading + loading screen
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Tailwind base + global styles
├── scripts/
│   └── seed-firebase.mjs         # One-time Firestore seed script
├── .env.example                  # Environment variable template
├── index.html                    # HTML shell with font preloads + SEO
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Architecture Decisions

### Why Vite over Next.js?

A personal portfolio is a static SPA — there's no server-side rendering benefit. Vite gives near-instant HMR, excellent DX, and a smaller bundle. SSG (like Astro) is a valid upgrade path if SEO becomes a priority.

### Why Firebase over Supabase?

Firebase Firestore has a simpler client SDK for read-heavy use cases with no auth. Supabase is a better choice if you later want SQL querying, RLS, or auth.

### Why Canvas API over Three.js for the neural network?

The neural network background is 2D. Using raw Canvas keeps the bundle lean (no Three.js dependency) and gives full control over the rendering pipeline. Three.js would shine for true 3D scenes — add `@react-three/fiber` if you want to extend with 3D elements.

### Lazy Loading

All sections below the fold are lazy-loaded via `React.lazy` + `Suspense`. This keeps Time-to-Interactive fast — only the Hero and its Canvas animation block the initial paint.

### Static Fallback

`usePortfolioData` always falls back to `staticData.ts` if Firebase is unreachable or unconfigured. This means the site works offline, in Storybook, and in CI/CD pipelines.

---

## Deployment

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # point to dist/
npm run build
firebase deploy
```

### Vercel (recommended)

```bash
npm install -g vercel
vercel
# Add your VITE_FIREBASE_* env vars in the Vercel dashboard
```

### Netlify

Connect your repo in the Netlify dashboard:
- Build command: `npm run build`
- Publish directory: `dist`
- Add env vars under Site Settings → Environment

---

## Customisation Guide

### Updating your content without Firebase

Edit `src/lib/staticData.ts` — all sections read from this file as a fallback.

### Adding a new section

1. Create `src/components/sections/YourSection.tsx`
2. Add it to `src/App.tsx` inside a `<Suspense>` wrapper
3. Add a nav link in `src/components/layout/Navbar.tsx`

### Changing the colour scheme

All colours are defined in `tailwind.config.ts` under `theme.extend.colors`. The key tokens are:
- `void.*` — background shades (deep black)
- `amber.*` — accent colour
- `warm.*` — text and surface neutrals

### Connecting a form backend

In `src/components/sections/Contact.tsx`, replace the placeholder `setTimeout` in `handleSubmit` with a real API call. Recommended services:
- [Formspree](https://formspree.io) — easiest, no backend needed
- [EmailJS](https://www.emailjs.com) — send directly from the browser
- Firebase Cloud Functions — if you're already on Firebase

---

## Future Improvements

- **Blog section** — MDX-powered writing with code syntax highlighting
- **Case studies** — Deep-dive pages for each project
- **Three.js hero** — Replace Canvas with React Three Fiber for a true 3D neural mesh
- **Dark/light toggle** — CSS custom property theming
- **CMS integration** — Contentful or Sanity for richer content editing
- **Analytics** — Privacy-first analytics with Plausible or Fathom
- **i18n** — `react-i18next` for Japanese/Chinese market (optional)
- **Storybook** — Component documentation for the design system layer

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | React 18 + Vite + TypeScript        |
| Animation    | Framer Motion                       |
| Styling      | TailwindCSS                         |
| Backend/CMS  | Firebase Firestore                  |
| Canvas       | Canvas API (vanilla — no Three.js)  |
| Icons        | Lucide React                        |
| Fonts        | Syne · DM Sans · JetBrains Mono     |
| Deployment   | Firebase Hosting / Vercel / Netlify |

---

Built with care in Melbourne 🦘
