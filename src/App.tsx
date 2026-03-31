import { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { usePortfolioData } from '@/hooks/usePortfolioData'
import { Navbar }           from '@/components/layout/Navbar'
import { Footer }           from '@/components/layout/Footer'
import { CursorGlow }       from '@/components/ui/CursorGlow'
import { Hero }             from '@/components/sections/Hero'

// Lazy-load below-fold sections for faster initial paint
const About      = lazy(() => import('@/components/sections/About').then((m) => ({ default: m.About })))
const Skills     = lazy(() => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })))
const Projects   = lazy(() => import('@/components/sections/Projects').then((m) => ({ default: m.Projects })))
const Experience = lazy(() => import('@/components/sections/Experience').then((m) => ({ default: m.ExperienceSection })))
const Contact    = lazy(() => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })))

// ─── Loading screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo */}
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-display text-3xl font-extrabold text-amber-500">J</span>
          <span className="font-display text-3xl font-extrabold text-warm-50">B</span>
        </motion.div>

        {/* Loading bar */}
        <div className="h-px w-24 overflow-hidden rounded-full bg-warm-800">
          <motion.div
            className="h-full bg-amber-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section skeleton (lazy load fallback) ────────────────────────────────────

function SectionSkeleton() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="h-1 w-16 rounded bg-warm-800 overflow-hidden">
        <motion.div
          className="h-full bg-amber-500/50"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { config, projects, experience, skills, loading } = usePortfolioData()

  return (
    <>
      {/* Custom amber cursor overlay */}
      <CursorGlow />

      {/* Loading splash */}
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />

          <main>
            {/* Hero is not lazy — it must paint immediately */}
            <Hero config={config} />

            <Suspense fallback={<SectionSkeleton />}>
              <About config={config} />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
              <Skills skills={skills} />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
              <Projects projects={projects} />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
              <Experience experience={experience} />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
              <Contact config={config} />
            </Suspense>
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  )
}
