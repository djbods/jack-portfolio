/**
 * seed-firebase.mjs
 *
 * Populates your Firestore database with the static portfolio data.
 * Run once after setting up Firebase:
 *
 *   cp .env.example .env.local
 *   # Fill in your Firebase credentials in .env.local
 *   node scripts/seed-firebase.mjs
 *
 * This script uses the Firebase Admin SDK — install it first:
 *   npm install --save-dev firebase-admin dotenv
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
    clientEmail:  process.env.FIREBASE_CLIENT_EMAIL,    // from service account JSON
    privateKey:   process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
})

const db = getFirestore(app)

// ── Data ───────────────────────────────────────────────────────────────────────

// Import from a plain JS copy of your static data
// or paste it inline here. Example:

const CONFIG = {
  name:            'Jack Bodsworth',
  firstName:       'Jack',
  title:           'Senior Front-End Engineer',
  tagline:         'I build digital experiences that blur the line between engineering and art.',
  bio:             "Six years crafting performant, accessible, and visually striking web applications for companies that care about quality. Based in Melbourne — building the web's most interesting UIs.",
  bioExtended:     "I'm obsessed with the intersection of code and creativity. Whether it's architecting a design system used by millions, or experimenting with WebGL shaders at 2am — I bring the same level of care to everything I build.",
  location:        'Melbourne, VIC, Australia',
  email:           'jack.bodsworth@gmail.com',
  github:          'https://github.com/jackbodsworth',
  linkedin:        'https://linkedin.com/in/jackbodsworth',
  twitter:         'https://twitter.com/jackbodsworth',
  availableForWork: true,
  yearsExperience: 6,
}

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

  // Import the arrays from staticData.ts (compile to JS or paste inline)
  // For brevity, import from the compiled output or use ts-node:
  //   npx ts-node -e "import { STATIC_PROJECTS } from './src/lib/staticData.ts'; ..."

  console.log('\n✅ Done! Open your Firebase console to verify.\n')
  console.log('   https://console.firebase.google.com/project/' + process.env.VITE_FIREBASE_PROJECT_ID)
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
