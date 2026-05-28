/**
 * staticData.ts
 *
 * Fallback content used when Firebase is unavailable (e.g. no env vars set).
 * Also used by the seed script to populate Firestore on first run.
 * Edit this file to update your portfolio content — or better yet, edit it
 * directly in the Firebase console without touching code.
 */

import type { SiteConfig, Project, Experience, Skill } from '@/types'

// ─── Site Configuration ───────────────────────────────────────────────────────

export const STATIC_CONFIG: SiteConfig = {
  name:            'Jack Bodsworth',
  firstName:       'Jack',
  title:           'Front-End Developer',
  tagline:         'I craft high-performance interfaces where engineering meets design.',
  bio:             'I\'ve been building for the web for 4+ years — mostly Vue.js and React, always TypeScript, usually with Storybook involved. Based in Melbourne.',
  bioExtended:     'Before writing code I was producing electronic music and DJing. It turns out the two have more in common than you\'d think — both are about structure, precision, and making something feel effortless to the person experiencing it. These days I apply that same obsession to design systems, performance, and CI/CD pipelines.',
  location:        'Melbourne, VIC, Australia',
  email:           'jack.bodsworth@gmail.com',
  github:          'https://github.com/djbods',
  linkedin:        'https://linkedin.com/in/jackbodsworth',
  twitter:         'https://twitter.com/jackbodsworth',
  availableForWork: true,
  yearsExperience: 4,
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export const STATIC_PROJECTS: Project[] = [
  // ─── Personal projects (apps I've built and shipped) ──────────────────────
  {
    id:              'e39-garage',
    title:           'E39 Garage',
    description:     'Offline-first PWA for tracking service history, modifications, and spend on my BMW E39.',
    longDescription: 'A self-built progressive web app for keeping a maintenance log on my 2002 BMW 530i. Works fully offline via IndexedDB, installs to the home screen, and syncs cleanly between phone and laptop. Designed as a personal tool first, but built to the same standard as anything I\'d ship at work.',
    tech:            ['React', 'TypeScript', 'IndexedDB', 'PWA', 'Vite'],
    liveUrl:         'https://e39-tracker.netlify.app',
    imageUrl:        '/projects/e39-garage.png',
    featured:        true,
    year:            2026,
    category:        'web',
    kind:            'personal',
  },
  {
    id:              'vault',
    title:           'Vault',
    description:     'A private, self-hosted cinema for my movie library — TMDB-powered, with built-in torrent ingest.',
    longDescription: 'A self-hosted video streaming app I built to replace Plex for my personal library. Express backend with a vanilla-JS frontend, TMDB integration for posters and metadata, WebTorrent for ingest, and a cinema-styled player. Runs locally on my network only — no public deployment.',
    tech:            ['JavaScript', 'Express', 'Node.js', 'WebTorrent', 'TMDB API'],
    imageUrl:        '/projects/vault.png',
    featured:        true,
    year:            2025,
    category:        'web',
    kind:            'personal',
  },
  {
    id:              'jack-portfolio',
    title:           'This Portfolio',
    description:     'The site you\'re looking at — a living showcase, not a static CV. Animations, design tokens, and all.',
    longDescription: 'Built with React, Vite, TypeScript, TailwindCSS, and Framer Motion. Designed to feel like an experience rather than a brochure — viewport-triggered reveals that replay, custom canvas animations, and a tight design-token system. Content lives in a single typed file so it stays trivial to update.',
    tech:            ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion'],
    githubUrl:       'https://github.com/djbods/jack-portfolio',
    imageUrl:        '/projects/portfolio.png',
    featured:        true,
    year:            2026,
    category:        'web',
    kind:            'personal',
  },

  // ─── Work projects (professional achievements) ────────────────────────────
  {
    id:              'uom-design-system',
    title:           'UniMelb Design System',
    description:     'Unified component library and design system adopted across 5+ repositories at the University of Melbourne.',
    longDescription: 'Architected a Storybook-driven design system that enforced consistent UI/UX patterns across multiple product teams. Reduced visual inconsistencies significantly and accelerated feature delivery. All components are fully accessible and documented.',
    tech:            ['Vue.js', 'Storybook', 'TypeScript', 'Sass', 'UIkit', 'CI/CD'],
    featured:        true,
    year:            2024,
    category:        'tool',
    kind:            'work',
  },
  {
    id:              'enrolment-platform',
    title:           'Student Enrolment Platform',
    description:     'Mobile-first responsive enrolment platform that increased enrolment efficiency by 20%.',
    longDescription: 'Rebuilt the student enrolment flow from the ground up with a mobile-first approach. Focused on performance and accessibility — reduced time-on-task for students and cut support ticket volume significantly.',
    tech:            ['Vue.js', 'TypeScript', 'Sass', 'Node.js', 'Responsive Design'],
    featured:        true,
    year:            2023,
    category:        'web',
    kind:            'work',
  },
  {
    id:              'acem-component-library',
    title:           'ACEM Component Library',
    description:     'Reusable component library that cut development time by 30% at the Australasian College for Emergency Medicine.',
    longDescription: 'Built and maintained a production component library integrated with Storybook for rapid prototyping. Introduced automated unit and integration testing, achieving significantly higher test coverage and reducing production bugs.',
    tech:            ['Vue.js', 'Storybook', 'JavaScript', 'CSS3', 'Unit Testing', 'E2E Testing'],
    featured:        true,
    year:            2022,
    category:        'tool',
    kind:            'work',
  },
  {
    id:              'ci-cd-pipelines',
    title:           'CI/CD Pipeline Automation',
    description:     'Automated deployment workflows across 5 repositories, cutting deployment cycles by 40%.',
    longDescription: 'Designed and implemented automated CI/CD pipelines incorporating unit tests, end-to-end tests, and build quality gates. Standardised the release process across multiple teams and significantly improved code reliability.',
    tech:            ['GitHub Actions', 'CI/CD', 'Unit Testing', 'E2E Testing', 'Bash', 'Node.js'],
    featured:        false,
    year:            2023,
    category:        'tool',
    kind:            'work',
  },
  {
    id:              'performance-optimisation',
    title:           'Front-End Performance Overhaul',
    description:     'Performance deep-dive across multiple projects — reduced page load times by up to 30%.',
    longDescription: 'Systematic audit and optimisation of Vue.js applications: asset compression, lazy loading, bundle splitting, and Vue-specific rendering optimisations. Documented best practices adopted across all front-end projects.',
    tech:            ['Vue.js', 'JavaScript', 'Webpack', 'Performance APIs', 'Bash'],
    featured:        false,
    year:            2022,
    category:        'experiment',
    kind:            'work',
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────

export const STATIC_EXPERIENCE: Experience[] = [
  {
    id:          'unimelb',
    company:     'University of Melbourne',
    role:        'Front-End Developer',
    period:      'Jul 2023 — Present',
    startDate:   '2023-07',
    description: 'Building and maintaining front-end platforms that serve thousands of students and staff across one of Australia\'s leading universities.',
    achievements: [
      'Established a unified design system adopted across 5+ repositories, enforcing consistent UI/UX patterns and reducing visual inconsistencies while accelerating feature development.',
      'Implemented automated CI/CD workflows across 5 repositories incorporating unit and end-to-end testing, shortening deployment cycles by 40% and enhancing code reliability.',
      'Increased enrolment efficiency by 20% by developing a mobile-friendly, fully responsive platform.',
      'Boosted user engagement by 15% through creation of a dynamic, reusable component library.',
      'Reduced page load times by 30% via Vue.js optimisations, asset compression, and performance best practices.',
      'Integrated components into Storybook, cutting development and prototyping time by 25%.',
      'Reduced technical debt by 40% through systematic code refactoring and cleanup.',
    ],
    tech:        ['Vue.js', 'TypeScript', 'Storybook', 'Sass', 'Node.js', 'CI/CD', 'Git'],
    location:    'Melbourne, VIC',
    companyUrl:  'https://unimelb.edu.au',
  },
  {
    id:          'acem',
    company:     'Australasian College for Emergency Medicine',
    role:        'Front-End Developer',
    period:      'Jul 2021 — Jul 2023',
    startDate:   '2021-07',
    endDate:     '2023-07',
    description: 'Developed and maintained web platforms for ACEM — the peak body for emergency medicine in Australia and New Zealand.',
    achievements: [
      'Reduced page load times by 25% through targeted code optimisations, asset compression, and performance tuning.',
      'Decreased development time by 30% by building and maintaining a reusable component library integrated with Storybook for rapid prototyping and consistency.',
      'Enhanced code maintainability and reduced production bugs by implementing automated unit and integration tests, achieving significantly higher test coverage.',
      'Accelerated onboarding for new developers by creating comprehensive documentation and reusable patterns, shortening ramp-up time by approximately 20–25%.',
    ],
    tech:        ['Vue.js', 'JavaScript', 'CSS3', 'Storybook', 'UIkit', 'Unit Testing', 'E2E Testing'],
    location:    'Melbourne, VIC',
    companyUrl:  'https://acem.org.au',
  },
]

// ─── Skills (Neural Network Graph Data) ──────────────────────────────────────

export const STATIC_SKILLS: Skill[] = [
  // Languages
  { id: 'javascript',  name: 'JavaScript',      category: 'language',   proficiency: 95, connections: ['typescript', 'vue', 'react', 'node'] },
  { id: 'typescript',  name: 'TypeScript',      category: 'language',   proficiency: 88, connections: ['javascript', 'vue', 'react'] },
  { id: 'html',        name: 'HTML5',           category: 'frontend',   proficiency: 98, connections: ['css', 'a11y', 'vue'] },
  { id: 'css',         name: 'CSS3',            category: 'frontend',   proficiency: 95, connections: ['html', 'sass', 'responsive'] },
  { id: 'sass',        name: 'Sass',            category: 'frontend',   proficiency: 88, connections: ['css', 'vue', 'storybook'] },

  // Frameworks
  { id: 'vue',         name: 'Vue.js',          category: 'frontend',   proficiency: 96, connections: ['javascript', 'typescript', 'storybook', 'uikit'] },
  { id: 'react',       name: 'React',           category: 'frontend',   proficiency: 80, connections: ['javascript', 'typescript'] },
  { id: 'swiftui',     name: 'SwiftUI',         category: 'frontend',   proficiency: 62, connections: ['javascript'] },

  // Styling
  { id: 'uikit',       name: 'UIkit',           category: 'frontend',   proficiency: 82, connections: ['css', 'vue', 'sass'] },
  { id: 'responsive',  name: 'Responsive Design', category: 'frontend', proficiency: 95, connections: ['css', 'html', 'vue'] },

  // Animation / Canvas
  { id: 'performance', name: 'Performance Opt.', category: 'animation', proficiency: 88, connections: ['javascript', 'vue', 'node'] },

  // Tools
  { id: 'storybook',   name: 'Storybook',       category: 'tools',      proficiency: 92, connections: ['vue', 'react', 'sass', 'cicd'] },
  { id: 'figma',       name: 'Figma',           category: 'tools',      proficiency: 80, connections: ['storybook', 'css'] },
  { id: 'git',         name: 'Git',             category: 'tools',      proficiency: 93, connections: ['cicd', 'node', 'javascript'] },
  { id: 'cicd',        name: 'CI/CD',           category: 'tools',      proficiency: 87, connections: ['git', 'node', 'testing'] },
  { id: 'bash',        name: 'Bash',            category: 'tools',      proficiency: 75, connections: ['cicd', 'node'] },

  // Backend / Runtime
  { id: 'node',        name: 'Node.js',         category: 'backend',    proficiency: 76, connections: ['javascript', 'typescript', 'git'] },

  // Testing
  { id: 'testing',     name: 'Unit Testing',    category: 'tools',      proficiency: 88, connections: ['cicd', 'vue', 'react', 'e2e'] },
  { id: 'e2e',         name: 'E2E Testing',     category: 'tools',      proficiency: 82, connections: ['testing', 'cicd'] },

  // Soft/Other
  { id: 'a11y',        name: 'Accessibility',   category: 'tools',      proficiency: 85, connections: ['html', 'vue', 'responsive'] },
  { id: 'agile',       name: 'Agile',           category: 'tools',      proficiency: 90, connections: ['git', 'cicd'] },
]
