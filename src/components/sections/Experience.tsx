import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, ChevronDown } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { Experience } from '@/types'

interface ExperienceProps {
  experience: Experience[]
}

function ExperienceEntry({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)
  const [ref, inView] = useInView({ threshold: 0.1 })
  const isCurrent = !exp.endDate

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[2px_1fr] gap-8"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={[
          'relative flex-shrink-0 -translate-x-[calc(50%-1px)] mt-2.5 h-3 w-3 rounded-full border-2',
          isCurrent ? 'border-accent bg-accent' : 'border-ink-300 bg-canvas-100'
        ].join(' ')}>
          {isCurrent && (
            <span className="absolute inset-0 rounded-full animate-ping bg-accent opacity-40" />
          )}
        </div>
        <motion.div
          className="flex-1 w-px bg-canvas-300 mt-2"
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        />
      </div>

      {/* Content */}
      <div className="pb-12">
        <button className="w-full text-left mb-4" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="font-display font-bold text-ink-900 mb-1"
                style={{ fontSize: '1.2rem', letterSpacing: '-0.025em' }}
              >
                {exp.role}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm font-medium text-accent hover:text-accent-dim inline-flex items-center gap-1 link-hover"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {exp.company}
                    <ExternalLink size={11} strokeWidth={1.5} />
                  </a>
                ) : (
                  <span className="font-body text-sm font-medium text-accent">{exp.company}</span>
                )}
                <span className="font-mono text-xs text-ink-400">{exp.period}</span>
                <span className="font-mono text-xs text-ink-400">{exp.location}</span>
                {isCurrent && (
                  <span className="rounded-full bg-accent-pale text-accent font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5">
                    Current
                  </span>
                )}
              </div>
            </div>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className={['shrink-0 mt-2 text-ink-400 transition-transform duration-300', expanded ? 'rotate-180' : ''].join(' ')}
            />
          </div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="border border-canvas-300 rounded-xl p-5 bg-white">
            <p className="font-body text-sm leading-relaxed text-ink-600 mb-5">{exp.description}</p>
            <ul className="space-y-2 mb-5">
              {exp.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <span className="font-body text-sm text-ink-500 leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-canvas-300">
              {exp.tech.map((t) => (
                <span key={t} className="font-mono text-[11px] text-ink-400 bg-canvas-100 border border-canvas-300 rounded px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ExperienceSection({ experience }: ExperienceProps) {
  const sorted = [...experience].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <section id="experience" className="py-20 md:py-32 bg-white border-y border-canvas-300">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        <SectionTitle
          eyebrow="Experience"
          title="Where I've worked."
          subtitle="Four years building production software at organisations that actually use it."
        />
        <div className="max-w-3xl">
          {sorted.map((exp, i) => (
            <ExperienceEntry key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
