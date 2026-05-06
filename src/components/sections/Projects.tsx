import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { Project } from '@/types'

interface ProjectsProps {
  projects: Project[]
}

const CATEGORIES = ['all', 'web', 'tool', 'experiment', 'mobile'] as const
type FilterCategory = (typeof CATEGORIES)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="group flex flex-col border border-canvas-300 rounded-2xl bg-white p-6 hover:border-accent/30 hover:shadow-card transition-all duration-300"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400 bg-canvas-200 rounded-full px-2.5 py-1">
            {project.category}
          </span>
          {project.featured && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent bg-accent-pale rounded-full px-2.5 py-1">
              Featured
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-ink-300 shrink-0">{project.year}</span>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-ink-900 mb-3 group-hover:text-accent transition-colors duration-200"
        style={{ fontSize: '1.2rem', letterSpacing: '-0.025em', lineHeight: 1.2 }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm leading-relaxed text-ink-500 mb-5 flex-1">
        {project.description}
      </p>

      {/* Tech */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[11px] text-ink-500 bg-canvas-100 border border-canvas-300 rounded px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-canvas-300">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-accent hover:text-accent-dim transition-colors link-hover"
          >
            <ExternalLink size={12} strokeWidth={1.5} />
            Live site
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-xs text-ink-400 hover:text-ink-700 transition-colors link-hover"
          >
            <Github size={12} strokeWidth={1.5} />
            Source
          </a>
        )}
      </div>
    </motion.article>
  )
}

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const availableCategories = CATEGORIES.filter((cat) => {
    if (cat === 'all') return true
    return projects.some((p) => p.category === cat)
  })

  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
  const sorted = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <section id="projects" className="py-20 md:py-32 bg-canvas-100">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        <SectionTitle
          eyebrow="Projects"
          title="Stuff I've built."
          subtitle="Selected work from the last few years — real projects, real problems, no lorem ipsum."
        />

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={[
                'font-mono text-xs uppercase tracking-wider rounded-full px-4 py-1.5 transition-all duration-200',
                activeFilter === cat
                  ? 'bg-accent text-white'
                  : 'border border-canvas-300 bg-white text-ink-500 hover:border-ink-300 hover:text-ink-800',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {sorted.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/jackbodsworth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-ink-500 hover:text-accent transition-colors link-hover"
          >
            View all on GitHub
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
