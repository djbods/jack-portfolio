import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AmberButton } from '@/components/ui/AmberButton'
import type { SiteConfig } from '@/types'

interface AboutProps {
  config: SiteConfig | null
}

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'const ', c: 'token-keyword' }, { t: 'engineer', c: 'token-fn' }, { t: ' = {', c: 'token-punct' }] },
  { indent: 1, tokens: [{ t: 'name:       ', c: 'token-prop' }, { t: '"Jack Bodsworth"', c: 'token-string' }, { t: ',', c: 'token-punct' }] },
  { indent: 1, tokens: [{ t: 'location:   ', c: 'token-prop' }, { t: '"Melbourne, AU"', c: 'token-string' }, { t: ',', c: 'token-punct' }] },
  { indent: 1, tokens: [{ t: 'experience: ', c: 'token-prop' }, { t: '4', c: 'token-number' }, { t: ', // years', c: 'token-comment' }] },
  { indent: 1, tokens: [{ t: 'focus: ', c: 'token-prop' }, { t: '[', c: 'token-punct' }] },
  { indent: 2, tokens: [{ t: '"Vue.js & React"', c: 'token-string' }, { t: ',', c: 'token-punct' }] },
  { indent: 2, tokens: [{ t: '"Design Systems"', c: 'token-string' }, { t: ',', c: 'token-punct' }] },
  { indent: 2, tokens: [{ t: '"Performance"', c: 'token-string' }, { t: ',', c: 'token-punct' }] },
  { indent: 1, tokens: [{ t: '],', c: 'token-punct' }] },
  { indent: 1, tokens: [{ t: 'available:  ', c: 'token-prop' }, { t: 'true', c: 'token-keyword' }, { t: ',', c: 'token-punct' }] },
  { indent: 0, tokens: [{ t: '}', c: 'token-punct' }] },
]

export function About({ config }: AboutProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-20 md:py-32 bg-canvas-100">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        <SectionTitle
          eyebrow="About"
          title="The human behind the code."
          subtitle="I believe great front-end engineering is half science, half craft."
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

          {/* Code card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            <div className="code-block shadow-card-lg">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-3 font-mono text-xs text-white/30">engineer.ts</span>
              </div>
              <div className="px-5 py-4">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    className="flex min-h-[1.75em]"
                    initial={{ opacity: 0, x: -6 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.25 }}
                  >
                    <span className="select-none w-5 mr-5 text-right text-white/15 text-xs shrink-0 leading-[1.75]">
                      {i + 1}
                    </span>
                    <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                      {line.tokens.map((token, j) => (
                        <span key={j} className={token.c}>{token.t}</span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                <div className="flex">
                  <span className="select-none w-5 mr-5 text-right text-white/15 text-xs shrink-0 leading-[1.75]">12</span>
                  <span className="inline-block w-[7px] h-[14px] bg-accent/70 animate-blink mt-[5px]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
