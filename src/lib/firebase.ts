/**
 * firebase.ts
 *
 * Firebase initialisation and Firestore collection helpers.
 * All reads gracefully fall back to staticData if Firebase is unconfigured.
 */

import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  type Firestore,
} from 'firebase/firestore'
import type { Project, Experience, Skill, SiteConfig } from '@/types'

// ─── Firebase Config ──────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Check if all required config values are present
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (v) => v && v !== 'undefined'
)

let app: FirebaseApp | null = null
let db: Firestore | null = null

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  } catch (err) {
    console.warn('[Firebase] Initialisation failed — using static data.', err)
  }
}

// ─── Collection Helpers ───────────────────────────────────────────────────────

/** Fetch all documents from a Firestore collection, typed. */
async function fetchCollection<T extends { id: string }>(
  collectionName: string
): Promise<T[] | null> {
  if (!db) return null
  try {
    const snap = await getDocs(collection(db, collectionName))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T))
  } catch (err) {
    console.error(`[Firebase] Error fetching ${collectionName}:`, err)
    return null
  }
}

/** Fetch a single Firestore document by id. */
async function fetchDocument<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  if (!db) return null
  try {
    const snap = await getDoc(doc(db, collectionName, docId))
    if (!snap.exists()) return null
    return { id: snap.id, ...snap.data() } as T
  } catch (err) {
    console.error(`[Firebase] Error fetching ${collectionName}/${docId}:`, err)
    return null
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const fetchProjects   = () => fetchCollection<Project>('projects')
export const fetchExperience = () => fetchCollection<Experience>('experience')
export const fetchSkills     = () => fetchCollection<Skill>('skills')
export const fetchConfig     = () => fetchDocument<SiteConfig>('config', 'site')

export { isFirebaseConfigured }
