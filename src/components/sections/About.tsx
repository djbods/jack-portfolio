import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Terminal, Coffee, Globe, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AmberButton } from '@/components/ui/AmberButton'
import type { SiteConfig } from '@/types'

interface AboutProps {
  config: SiteConfig | null
}

// Code snippet displayed in the "terminal" card
const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'const ', c: 'text-amber-400' }, { t: 'engineer', c: 'text-warm-50' }, { t: ' = {', c: 'text-warm-400' }] },
  { indent: 1, tokens: [{ t: 'name:       ', c: 'text-warm-400' }, { t: '"Jack Bodsworth"', c: 'text-amber-300' }, { t: ',', c: 'text-warm-400' }] },
  { indent: 1, tokens: [{ t: 'location:   ', c: 'text-warm-400' }, { t: '"Melbourne, AU"', c: 'text-amber-300' }, { t: ',', c: 'text-warm-400' }] },
  { indent: 1, tokens: [{ t: 'experience: ', c: 'text-warm-400' }, { t: '6', c: 'text-amber-500' }, { t: ', // years', c: 'text-warm-600' }] },
  { indent: 1, tokens: [{ t: 'focus:      ', c: 'text-warm-400' }, { t: '[', c: 'text-warm-400' }] },
  { indent: 2, tokens: [{ t: '"React & TypeScript"', c: 'text-amber-300' }, { t: ',', c: 'text-warm-400' }] },
  { indent: 2, tokens: [{ t: '"Motion & Animation"', c: 'text-amber-300' }, { t: ',', c: 'text-warm-400' }] },
  { indent: 2, tokens: [{ t: '"Performance Engineering"', c: 'text-amber-300' }, { t: ',', c: 'text-warm-400' }] },
  { indent: 1, tokens: [{ t: '],', c: 'text-warm-400' }] },
  { indent: 1, tokens: [{ t: 'available:  ', c: 'text-warm-400' }, { t: 'true', c: 'text-amber-500' }, { t: ',', c: 'text-warm-400' }] },
  { indent: 0, tokens: [{ t: '}', c: 'text-warm-400' }] },
]

const FUN_FACTS = [
  { icon: Coffee,   text: 'Runs on cold brew and TypeScript' },
  { icon: Terminal, text: 'vim > everything (don\'t @ me)'     },
  { icon: Globe,    text: 'Secretly addicted to Awwwards'     },
  { icon: Sparkles, text: 'Draws inspiration from industrial design' },
]

export function About({ config }: AboutProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
  }

  return (
    <section id="about" className="relative overflow-hidden bg-void py-24 md:py-32">
      {/* Background circuit glow */}
      <div
        className="pointer-events-none absolute -right-64 top-0 h-[600px] w-[600px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="01 / About"
          title="The human behind the code."
          subtitle="I believe great front-end engineering is half science, half craft — and the best interfaces are the ones you never notice."
        />

        <motion.div
          ref={ref}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Left — bio text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="font-body text-lg leading-relaxed text-warm-300">
              {config?.bio ?? 'Six years crafting performant, accessible, and visually striking web applications for companies that care about quality.'}
            </p>
            <p className="font-body leading-relaxed text-warm-400">
              {config?.bioExtended ?? 'I\'m obsessed with the intersection of code and creativity. Whether it\'s architecting a design system used by millions, or experimenting with WebGL shaders at 2am — I bring the same level of care to everything I build.'}
            </p>

            {/* Fun facts */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {FUN_FACTS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon size={14} className="mt-0.5 shrink-0 text-amber-500/60" />
                  <span className="font-body text-sm text-warm-500">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <AmberButton
                variant="outline"
                href={config?.github ?? 'https://github.com/jackbodsworth'}
                external
              >
                GitHub
              </AmberButton>
              <AmberButton
                variant="ghost"
                href={config?.linkedin ?? 'https://linkedin.com/in/jackbodsworth'}
                external
              >
                LinkedIn →
              </AmberButton>
            </div>
          </motion.div>

          {/* Right — terminal card */}
          <motion.div variants={itemVariants}>
            <GlassCard noPadding>
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-amber-500/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/50" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <span className="h-3 w-3 rounded-full bg-green-500/50" />
                <span className="ml-2 font-mono text-xs text-warm-600">engineer.ts</span>
              </div>

              {/* Code */}
              <pre className="overflow-x-auto px-5 py-4 font-mono text-sm leading-loose">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    className="flex"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
                  >
                    {/* Line number */}
                    <span className="mr-4 w-5 select-none text-right text-warm-700">
                      {i + 1}
                    </span>
                    {/* Indent */}
                    <span style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
                      {line.tokens.map((token, j) => (
                        <span key={j} className={token.c}>
                          {token.t}
                        </span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                <div className="flex">
                  <span className="mr-4 w-5 text-right text-warm-700">12</span>
                  <span className="ml-0 h-5 w-2 bg-amber-400 animate-blink" />
                </div>
              </pre>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
