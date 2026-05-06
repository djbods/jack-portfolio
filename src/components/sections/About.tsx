import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AmberButton } from '@/components/ui/AmberButton'
import type { SiteConfig } from '@/types'

interface AboutProps {
  config: SiteConfig | null
}

const FACTS = [
  { label: 'Role',       value: 'Front-End Developer' },
  { label: 'Location',   value: 'Melbourne, VIC' },
  { label: 'Currently',  value: 'University of Melbourne' },
  { label: 'Stack',      value: 'Vue.js · TypeScript · React' },
  { label: 'Background', value: 'Electronic music & DJing' },
  { label: 'Available',  value: 'Yes — open to new roles' },
]

export function About({ config }: AboutProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-20 md:py-32 bg-canvas-100">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        <SectionTitle
          eyebrow="About"
          title="I used to make music. Now I make UIs."
          subtitle="The overlap is bigger than you'd think."
        />

        <motion.div
          ref={ref}
          className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Bio */}
          <div className="space-y-5">
            <motion.p
              className="font-body text-lg leading-relaxed text-ink-700"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              {config?.bio ?? 'Front-end developer with 4+ years of experience building intuitive, high-performance UIs using Vue.js, React, and modern JavaScript. Based in Melbourne.'}
            </motion.p>
            <motion.p
              className="font-body leading-relaxed text-ink-500"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.55 }}
            >
              {config?.bioExtended ?? 'Whether building a design system adopted across five repositories, shaving 30% off page load times, or wiring up end-to-end CI/CD pipelines — I bring the same level of care to every layer of the stack.'}
            </motion.p>

            <motion.div
              className="flex gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.28 }}
            >
              <AmberButton variant="solid" href={config?.github ?? 'https://github.com/jackbodsworth'} external>
                GitHub
              </AmberButton>
              <AmberButton variant="outline" href={config?.linkedin ?? 'https://linkedin.com/in/jackbodsworth'} external>
                LinkedIn
              </AmberButton>
            </motion.div>
          </div>

          {/* Facts card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            <div className="border border-canvas-300 rounded-2xl bg-white overflow-hidden shadow-card">
              {FACTS.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="flex gap-4 px-6 py-4 border-b border-canvas-300 last:border-0"
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.05, duration: 0.25 }}
                >
                  <span className="font-mono text-xs text-ink-400 w-24 shrink-0 pt-0.5">{label}</span>
                  <span className="font-body text-sm text-ink-800">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
