/**
 * seed-firebase.mjs
 *
 * Populates your Firestore database with the static portfolio data.
 * Run once after setting up Firebase:
 *
 *   cp .env.example .env.local
 *   # Fill in your Firebase credentials in .env.local
 *   node scripts/seed-firebase.mjs
 */

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore }        from 'firebase-admin/firestore'
import { config }              from 'dotenv'
import { resolve, dirname }    from 'path'
import { fileURLToPath }       from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env.local') })

// ── Init ───────────────────────────────────────────────────────────────────────

const app = initializeApp({
  credential: cert({
    projectId:    process.env.VITE_FIREBASE_PROJECT_ID,
    clientEmail:  process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:   process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
})

const db = getFirestore(app)

// ── Data (from staticData.ts) ───────────────────────────────────────────────────

const CONFIG = {
  name:            'Jack Bodsworth',
  firstName:       'Jack',
  title:           'Front-End Developer',
  tagline:         'I craft high-performance interfaces where engineering meets design.',
  bio:             "Front-end developer with 4+ years of experience building intuitive, high-performance UIs using Vue.js, React, and modern JavaScript. Based in Melbourne — passionate about design systems, performance optimisation, and shipping software that genuinely improves people's day.",
  bioExtended:     "I believe the best digital products are the ones that feel effortless to use. Whether I'm building a design system adopted across five repositories, shaving 30% off page load times, or wiring up end-to-end CI/CD pipelines — I bring the same attention to craft to every layer of the stack. I thrive in cross-functional teams and love the intersection of developer experience and user experience.",
  location:        'Melbourne, VIC, Australia',
  email:           'jack.bodsworth@gmail.com',
  github:          'https://github.com/jackbodsworth',
  linkedin:        'https://linkedin.com/in/jackbodsworth',
  twitter:         'https://twitter.com/jackbodsworth',
  availableForWork: true,
  yearsExperience: 4,
}

const PROJECTS = [
  {
    id:              'uom-design-system',
    title:           'UniMelb Design System',
    description:     'Unified component library and design system adopted across 5+ repositories at the University of Melbourne.',
    longDescription: 'Architected a Storybook-driven design system that enforced consistent UI/UX patterns across multiple product teams. Reduced visual inconsistencies significantly and accelerated feature delivery. All components are fully accessible and documented.',
    tech:            ['Vue.js', 'Storybook', 'TypeScript', 'Sass', 'UIkit', 'CI/CD'],
    featured:        true,
    year:            2024,
    category:        'tool',
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
  },
]

const EXPERIENCE = [
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

const SKILLS = [
  { id: 'javascript',  name: 'JavaScript',      category: 'language',   proficiency: 95, connections: ['typescript', 'vue', 'react', 'node'] },
  { id: 'typescript',  name: 'TypeScript',      category: 'language',   proficiency: 88, connections: ['javascript', 'vue', 'react'] },
  { id: 'html',        name: 'HTML5',           category: 'frontend',   proficiency: 98, connections: ['css', 'a11y', 'vue'] },
  { id: 'css',         name: 'CSS3',            category: 'frontend',   proficiency: 95, connections: ['html', 'sass', 'responsive'] },
  { id: 'sass',        name: 'Sass',            category: 'frontend',   proficiency: 88, connections: ['css', 'vue', 'storybook'] },
  { id: 'vue',         name: 'Vue.js',          category: 'frontend',   proficiency: 96, connections: ['javascript', 'typescript', 'storybook', 'uikit'] },
  { id: 'react',       name: 'React',           category: 'frontend',   proficiency: 80, connections: ['javascript', 'typescript'] },
  { id: 'swiftui',     name: 'SwiftUI',         category: 'frontend',   proficiency: 62, connections: ['javascript'] },
  { id: 'uikit',       name: 'UIkit',           category: 'frontend',   proficiency: 82, connections: ['css', 'vue', 'sass'] },
  { id: 'responsive',  name: 'Responsive Design', category: 'frontend', proficiency: 95, connections: ['css', 'html', 'vue'] },
  { id: 'performance', name: 'Performance Opt.', category: 'animation', proficiency: 88, connections: ['javascript', 'vue', 'node'] },
  { id: 'storybook',   name: 'Storybook',       category: 'tools',      proficiency: 92, connections: ['vue', 'react', 'sass', 'cicd'] },
  { id: 'figma',       name: 'Figma',           category: 'tools',      proficiency: 80, connections: ['storybook', 'css'] },
  { id: 'git',         name: 'Git',             category: 'tools',      proficiency: 93, connections: ['cicd', 'node', 'javascript'] },
  { id: 'cicd',        name: 'CI/CD',           category: 'tools',      proficiency: 87, connections: ['git', 'node', 'testing'] },
  { id: 'bash',        name: 'Bash',            category: 'tools',      proficiency: 75, connections: ['cicd', 'node'] },
  { id: 'node',        name: 'Node.js',         category: 'backend',    proficiency: 76, connections: ['javascript', 'typescript', 'git'] },
  { id: 'testing',     name: 'Unit Testing',    category: 'tools',      proficiency: 88, connections: ['cicd', 'vue', 'react', 'e2e'] },
  { id: 'e2e',         name: 'E2E Testing',     category: 'tools',      proficiency: 82, connections: ['testing', 'cicd'] },
  { id: 'a11y',        name: 'Accessibility',   category: 'tools',      proficiency: 85, connections: ['html', 'vue', 'responsive'] },
  { id: 'agile',       name: 'Agile',           category: 'tools',      proficiency: 90, connections: ['git', 'cicd'] },
]

// ── Seed functions ─────────────────────────────────────────────────────────────

async function seedDoc(collectionName, docId, data) {
  await db.collection(collectionName).doc(docId).set(data, { merge: true })
  console.log(`  ✓ ${collectionName}/${docId}`)
}

async function seedCollection(collectionName, items) {
  const batch = db.batch()
  for (const item of items) {
    const ref = db.collection(collectionName).doc(item.id)
    batch.set(ref, item, { merge: true })
  }
  await batch.commit()
  console.log(`  ✓ ${collectionName} (${items.length} docs)`)
}

async function main() {
  console.log('🌱 Seeding Firestore...\n')

  await seedDoc('config', 'site', CONFIG)
  await seedCollection('projects', PROJECTS)
  await seedCollection('experience', EXPERIENCE)
  await seedCollection('skills', SKILLS)

  console.log('\n✅ Done! Open your Firebase console to verify.\n')
  console.log('   https://console.firebase.google.com/project/' + process.env.VITE_FIREBASE_PROJECT_ID)
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
