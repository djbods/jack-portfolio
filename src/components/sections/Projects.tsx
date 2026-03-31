import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { AmberButton } from '@/components/ui/AmberButton'
import type { Project } from '@/types'

interface ProjectsProps {
  projects: Project[]
}

const CATEGORIES = ['all', 'web', 'tool', 'experiment', 'mobile'] as const
type FilterCategory = (typeof CATEGORIES)[number]

// ─── Single Project Card ──────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.08 }}
    >
      <GlassCard hoverable glowOnHover noPadding className="group h-full overflow-hidden">
        {/* Top amber gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

        <div className="p-6">
          {/* Header row */}
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              {/* Category + year badge */}
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-500/70">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-400">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="font-display text-xl font-bold text-warm-50 group-hover:text-amber-300 transition-colors">
                {project.title}
              </h3>
            </div>

            {/* Year */}
            <span className="shrink-0 font-mono text-xs text-warm-600">{project.year}</span>
          </div>

          {/* Description */}
          <p className="mb-5 font-body text-sm leading-relaxed text-warm-400">
            {project.description}
          </p>

          {/* Long description — visible on hover (desktop) */}
          {project.longDescription && (
            <div className="mb-5 overflow-hidden">
              <motion.p
                className="font-body text-xs leading-relaxed text-warm-500"
                initial={{ height: 0, opacity: 0 }}
                whileHover={{ height: 'auto', opacity: 1 }}
              >
                {project.longDescription}
              </motion.p>
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-warm-800 px-2 py-0.5 font-mono text-[11px] text-warm-500"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ExternalLink size={12} />
                Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-xs text-warm-500 hover:text-warm-300 transition-colors"
              >
                <Github size={12} />
                Source
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const availableCategories = CATEGORIES.filter((cat) => {
    if (cat === 'all') return true
    return projects.some((p) => p.category === cat)
  })

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  // Sort: featured first
  const sorted = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <section id="projects" className="relative bg-void py-24 md:py-32">
      {/* Background circuit pattern */}
      <div className="pointer-events-none absolute inset-0 bg-circuit opacity-100" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="03 / Projects"
          title="Things I've shipped."
          subtitle="Selected work from the last few years. Each project is an obsession with performance, craft, and pushing what the browser can do."
        />

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {availableCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={[
                'rounded-xl px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200',
                activeFilter === cat
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'border border-warm-800 text-warm-500 hover:border-warm-600 hover:text-warm-300',
              ].join(' ')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sorted.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <AmberButton
            variant="ghost"
            href="https://github.com/jackbodsworth"
            external
            icon={<ArrowRight size={14} />}
          >
            View all projects on GitHub
          </AmberButton>
        </motion.div>
      </div>
    </section>
  )
}
