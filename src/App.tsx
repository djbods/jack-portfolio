import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

import { usePortfolioData } from '@/hooks/usePortfolioData'
import { Navbar }           from '@/components/layout/Navbar'
import { Footer }           from '@/components/layout/Footer'
import { Hero }             from '@/components/sections/Hero'

const About      = lazy(() => import('@/components/sections/About').then((m) => ({ default: m.About })))
const Skills     = lazy(() => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })))
const Projects   = lazy(() => import('@/components/sections/Projects').then((m) => ({ default: m.Projects })))
const Experience = lazy(() => import('@/components/sections/Experience').then((m) => ({ default: m.ExperienceSection })))
const Contact    = lazy(() => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })))

function SectionSkeleton() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="h-px w-16 rounded bg-canvas-300 overflow-hidden">
        <motion.div
          className="h-full bg-accent/30"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
    </div>
  )
}

export default function App() {
  const { config, projects, experience, skills, loading } = usePortfolioData()

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-canvas-300 overflow-hidden rounded">
            <motion.div
              className="h-full bg-accent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>
          <span className="font-mono text-xs text-ink-400 tracking-widest">Loading</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <main>
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
  )
}
