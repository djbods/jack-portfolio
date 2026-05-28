import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, ArrowUpRight, Lock } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { Project } from '@/types'

interface ProjectsProps {
  projects: Project[]
}

function ScreenshotPreview({ project }: { project: Project }) {
  const [errored, setErrored] = useState(false)
  const showImage = project.imageUrl && !errored

  return (
    <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-canvas-300 bg-canvas-200">
      {showImage ? (
        <img
          src={project.imageUrl}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-pale via-canvas-100 to-canvas-200">
          <span
            className="font-display font-bold text-accent/40"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '-0.04em' }}
          >
            {project.title.charAt(0)}
          </span>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.08 })
  const isPersonal = project.kind === 'personal'
  const hasLink = Boolean(project.liveUrl || project.githubUrl)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="group flex flex-col overflow-hidden border border-canvas-300 rounded-2xl bg-white p-6 hover:border-accent/30 hover:shadow-card transition-all duration-300"
    >
      {isPersonal && <ScreenshotPreview project={project} />}

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
        {isPersonal && !hasLink && (
          <span className="inline-flex items-center gap-1.5 font-body text-xs text-ink-400">
            <Lock size={12} strokeWidth={1.5} />
            Self-hosted only
          </span>
        )}
      </div>
    </motion.article>
  )
}

function ProjectGroup({
  eyebrow,
  description,
  projects,
  startIndex,
}: {
  eyebrow: string
  description: string
  projects: Project[]
  startIndex: number
}) {
  const [ref, inView] = useInView({ threshold: 0.15 })

  if (projects.length === 0) return null

  return (
    <div className="mb-16 last:mb-0">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6"
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase mb-2">
            {eyebrow}
          </p>
          <p className="font-body text-ink-500 leading-relaxed max-w-2xl">{description}</p>
        </div>
        <span className="font-mono text-xs text-ink-300 shrink-0">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={startIndex + i} />
        ))}
      </div>
    </div>
  )
}

export function Projects({ projects }: ProjectsProps) {
  const personal = projects.filter((p) => p.kind === 'personal')
  const work = projects
    .filter((p) => p.kind === 'work')
    .sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <section id="projects" className="py-20 md:py-32 bg-canvas-100">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        <SectionTitle
          eyebrow="Projects"
          title="Stuff I've built."
          subtitle="Personal apps I ship in my own time, plus selected work from the day job. Real projects, real problems, no lorem ipsum."
        />

        <ProjectGroup
          eyebrow="Personal — apps I ship"
          description="Side projects I build for myself and use daily. Held to the same standard as anything I'd ship at work."
          projects={personal}
          startIndex={0}
        />

        <ProjectGroup
          eyebrow="Work — professional"
          description="Things I've shipped for employers. Most live behind login walls, so screenshots aren't included."
          projects={work}
          startIndex={personal.length}
        />

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/djbods"
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
