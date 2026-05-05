import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { Skill } from '@/types'

interface SkillsProps {
  skills: Skill[]
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  language:  'Languages',
  frontend:  'Frontend',
  tools:     'Tools & Process',
  backend:   'Backend & Runtime',
  animation: 'Performance',
}

const CATEGORY_ORDER: Skill['category'][] = ['language', 'frontend', 'tools', 'backend', 'animation']

export function Skills({ skills }: SkillsProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [hovered, setHovered] = useState<string | null>(null)

  const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat)
    if (catSkills.length > 0) acc[cat] = catSkills.sort((a, b) => b.proficiency - a.proficiency)
    return acc
  }, {})

  return (
    <section id="skills" className="py-20 md:py-32 bg-ink-900">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        {/* White section title on dark background */}
        <div className="mb-14 md:mb-20">
          <p className="font-mono text-xs tracking-[0.18em] text-ink-400 uppercase mb-4">Skills</p>
          <h2
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 3.25rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
          >
            Technologies & tools.
          </h2>
          <div className="h-[3px] w-10 bg-accent rounded-full" />
          <p className="mt-5 font-body text-ink-400 max-w-2xl leading-relaxed md:text-lg">
            The stack I reach for and the tools I've shipped production code with.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="space-y-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {Object.entries(grouped).map(([cat, catSkills], gi) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.08, duration: 0.5 }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500 mb-5">
                {CATEGORY_LABELS[cat as Skill['category']]}
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
                {catSkills.map((skill, si) => {
                  const isHov = hovered === skill.id
                  const isDim = hovered !== null && !isHov

                  return (
                    <motion.div
                      key={skill.id}
                      className="group cursor-default"
                      onMouseEnter={() => setHovered(skill.id)}
                      onMouseLeave={() => setHovered(null)}
                      animate={{ opacity: isDim ? 0.3 : 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={[
                          'font-body text-sm transition-colors duration-200',
                          isHov ? 'text-white' : 'text-ink-300'
                        ].join(' ')}>
                          {skill.name}
                        </span>
                        <span className={[
                          'font-mono text-[10px] transition-all duration-200',
                          isHov ? 'text-accent-muted opacity-100' : 'text-ink-600 opacity-0 group-hover:opacity-100'
                        ].join(' ')}>
                          {skill.proficiency}%
                        </span>
                      </div>

                      <div className="h-px bg-ink-700 rounded-full overflow-hidden">
                        <motion.div
                          className={[
                            'h-full rounded-full transition-colors duration-200',
                            isHov ? 'bg-accent' : 'bg-ink-500'
                          ].join(' ')}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : {}}
                          transition={{
                            duration: 0.85,
                            ease: 'easeOut',
                            delay: 0.25 + gi * 0.06 + si * 0.03,
                          }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
