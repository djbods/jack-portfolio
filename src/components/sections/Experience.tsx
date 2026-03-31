import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, MapPin, ExternalLink, ChevronDown } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import type { Experience } from '@/types'

interface ExperienceProps {
  experience: Experience[]
}

// ─── Single experience entry ──────────────────────────────────────────────────

function ExperienceEntry({
  exp,
  index,
  isLast,
}: {
  exp: Experience
  index: number
  isLast: boolean
}) {
  const [expanded, setExpanded] = useState(index === 0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const isCurrent = !exp.endDate

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 pb-10"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.1 }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
          {/* Outer ring */}
          <div
            className={[
              'absolute inset-0 rounded-full border',
              isCurrent
                ? 'border-amber-500/60 animate-pulse-amber'
                : 'border-warm-700',
            ].join(' ')}
          />
          {/* Inner dot */}
          <div
            className={[
              'h-3 w-3 rounded-full',
              isCurrent ? 'bg-amber-500' : 'bg-warm-600',
            ].join(' ')}
          />
          {/* Glow for current */}
          {isCurrent && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
                filter: 'blur(4px)',
              }}
            />
          )}
        </div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="mt-1 w-px flex-1 bg-gradient-to-b from-amber-500/20 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        {/* Header */}
        <button
          className="mb-3 w-full text-left"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-warm-50">
                {exp.role}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                {/* Company */}
                <div className="flex items-center gap-1.5">
                  <Building2 size={12} className="text-amber-500/60" />
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm font-medium text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {exp.company}
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="font-body text-sm font-medium text-amber-400">
                      {exp.company}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-warm-600" />
                  <span className="font-mono text-xs text-warm-500">{exp.location}</span>
                </div>

                {/* Period */}
                <span className="font-mono text-xs text-warm-600">{exp.period}</span>

                {/* "Current" badge */}
                {isCurrent && (
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-400">
                    Current
                  </span>
                )}
              </div>
            </div>

            <ChevronDown
              size={16}
              className={`mt-1 shrink-0 text-warm-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Expandable details */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <GlassCard className="mb-4">
            <p className="mb-4 font-body text-sm leading-relaxed text-warm-400">
              {exp.description}
            </p>

            {/* Achievements */}
            <ul className="space-y-2">
              {exp.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
                  <span className="font-body text-sm text-warm-400">{a}</span>
                </li>
              ))}
            </ul>

            {/* Tech badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-warm-800 px-2 py-0.5 font-mono text-[11px] text-warm-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Experience Section ───────────────────────────────────────────────────────

export function ExperienceSection({ experience }: ExperienceProps) {
  // Sort by most recent first (using startDate)
  const sorted = [...experience].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <section id="experience" className="relative bg-void-100 py-24 md:py-32">
      {/* Ambient glow left */}
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="04 / Experience"
          title="Where I've made an impact."
          subtitle="A timeline of the companies I've built with, the problems I've solved, and the products I've helped ship."
        />

        <div className="max-w-3xl">
          {sorted.map((exp, i) => (
            <ExperienceEntry
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === sorted.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
