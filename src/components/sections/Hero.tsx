import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import type { SiteConfig } from '@/types'

interface HeroProps {
  config: SiteConfig | null
}

// ─── Syntax-highlighted code block (static, but looks live) ──────────────────
// Shows a real snippet from Jack's actual work — design system component.
// This is far more credible than an abstract animation.

const CODE_SNIPPET = [
  { tokens: [
    { t: '// UniMelb Design System', cls: 'token-comment' },
  ]},
  { tokens: [] }, // blank line
  { tokens: [
    { t: 'import', cls: 'token-keyword' },
    { t: ' { defineComponent } ', cls: 'token-punct' },
    { t: 'from', cls: 'token-keyword' },
    { t: " 'vue'", cls: 'token-string' },
  ]},
  { tokens: [
    { t: 'import', cls: 'token-keyword' },
    { t: ' type { ButtonVariant } ', cls: 'token-punct' },
    { t: 'from', cls: 'token-keyword' },
    { t: " '@/types'", cls: 'token-string' },
  ]},
  { tokens: [] },
  { tokens: [
    { t: 'export', cls: 'token-keyword' },
    { t: ' const ', cls: 'token-punct' },
    { t: 'UButton', cls: 'token-fn' },
    { t: ' = ', cls: 'token-punct' },
    { t: 'defineComponent', cls: 'token-fn' },
    { t: '({', cls: 'token-punct' },
  ]},
  { tokens: [
    { t: '  name', cls: 'token-prop', indent: 1 },
    { t: ': ', cls: 'token-punct' },
    { t: "'UButton'", cls: 'token-string' },
    { t: ',', cls: 'token-punct' },
  ]},
  { tokens: [
    { t: '  props', cls: 'token-prop', indent: 1 },
    { t: ': {', cls: 'token-punct' },
  ]},
  { tokens: [
    { t: '    variant', cls: 'token-prop', indent: 2 },
    { t: ': ', cls: 'token-punct' },
    { t: 'ButtonVariant', cls: 'token-fn' },
    { t: ',', cls: 'token-punct' },
  ]},
  { tokens: [
    { t: '    disabled', cls: 'token-prop', indent: 2 },
    { t: ': ', cls: 'token-punct' },
    { t: 'Boolean', cls: 'token-keyword' },
    { t: ',', cls: 'token-punct' },
  ]},
  { tokens: [{ t: '  },', cls: 'token-punct' }] },
  { tokens: [] },
  { tokens: [
    { t: '  setup', cls: 'token-prop', indent: 1 },
    { t: '(', cls: 'token-punct' },
    { t: 'props', cls: 'token-prop' },
    { t: ') {', cls: 'token-punct' },
  ]},
  { tokens: [
    { t: '    // 30% faster deploys ✓', cls: 'token-comment', indent: 2 },
  ]},
  { tokens: [{ t: '  },', cls: 'token-punct' }] },
  { tokens: [{ t: '})', cls: 'token-punct' }] },
]

const TECH_BADGES = ['Vue.js', 'TypeScript', 'React', 'Storybook', 'CI/CD', 'Node.js']

export function Hero({ config }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY }  = useScroll()
  const opacity      = useTransform(scrollY, [0, 400], [1, 0])
  const y            = useTransform(scrollY, [0, 400], [0, 48])

  function scrollToAbout() {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen bg-canvas-100 flex flex-col overflow-hidden"
    >
      {/* Subtle grid texture — very faint, adds depth without noise */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91,76,245,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,76,245,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Large accent circle — background geometry, not decoration */}
      <div
        className="pointer-events-none absolute -top-64 -right-64 rounded-full opacity-[0.07]"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, #5b4cf5 0%, transparent 65%)',
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <motion.div
        className="flex-1 flex items-center"
        style={{ opacity, y }}
      >
        <div className="w-full mx-auto max-w-[1120px] px-6 md:px-10 pt-28 pb-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

            {/* ── LEFT: Identity + CTA ──────────────────────────────── */}
            <div>
              {/* Availability */}
              <motion.div
                className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent-pale/60 px-3.5 py-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-xs text-accent tracking-wide">
                  {config?.availableForWork ? 'Open to new opportunities' : 'Currently employed'}
                </span>
              </motion.div>

              {/* Name */}
              <div className="overflow-hidden mb-3">
                <motion.h1
                  className="font-display text-ink-900 leading-[0.95] tracking-tightest"
                  style={{ fontSize: 'clamp(3.25rem, 8vw, 6rem)' }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                  <span className="block">Jack</span>
                  {/* "Bodsworth" gets the accent underline treatment */}
                  <span className="relative inline-block">
                    Bodsworth
                    <motion.span
                      className="absolute bottom-1 left-0 h-[5px] rounded-sm bg-accent"
                      style={{ zIndex: -1 }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                </motion.h1>
              </div>

              {/* Role + location */}
              <motion.div
                className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <span className="font-display text-lg font-medium text-ink-500 tracking-tight">
                  {config?.title ?? 'Front-End Developer'}
                </span>
                <span className="h-px w-6 bg-ink-300" />
                <span className="flex items-center gap-1.5 font-mono text-xs text-ink-400">
                  <MapPin size={11} strokeWidth={1.5} className="text-ink-400" />
                  {config?.location ?? 'Melbourne, AU'}
                </span>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="font-body text-lg text-ink-500 leading-relaxed max-w-lg mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.55 }}
              >
                {config?.tagline ?? 'I build the things people actually see and touch — and I care a lot about getting them right.'}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap items-center gap-3 mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                <button
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-body text-sm font-semibold bg-accent text-white rounded-full px-6 py-3 hover:bg-accent-dim transition-colors duration-200 shadow-sm"
                >
                  View my work
                </button>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-body text-sm font-medium text-ink-700 border border-ink-200 rounded-full px-6 py-3 hover:border-ink-400 hover:bg-canvas-200 transition-all duration-200"
                >
                  Get in touch
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="font-body text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors duration-200"
                >
                  Download CV
                </a>
              </motion.div>

              {/* Tech badges */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                {TECH_BADGES.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="font-mono text-[11px] text-ink-500 bg-canvas-200 border border-canvas-300 rounded-full px-3 py-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Code panel + stats ─────────────────────────── */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Code block */}
              <div className="code-block shadow-card-lg">
                {/* Titlebar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07]">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-3 font-mono text-xs text-white/30">UButton.ts</span>
                  <span className="ml-auto font-mono text-[10px] text-white/20 bg-white/5 rounded px-2 py-0.5">
                    UniMelb DS
                  </span>
                </div>

                {/* Code lines */}
                <div className="px-5 py-4">
                  {CODE_SNIPPET.map((line, i) => (
                    <motion.div
                      key={i}
                      className="flex min-h-[1.75em]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.035, duration: 0.25 }}
                    >
                      <span className="select-none w-5 mr-5 text-right text-white/15 text-xs shrink-0 leading-[1.75]">
                        {i + 1}
                      </span>
                      <span>
                        {line.tokens.map((token, j) => (
                          <span key={j} className={token.cls}>{token.t}</span>
                        ))}
                      </span>
                    </motion.div>
                  ))}
                  {/* Cursor */}
                  <div className="flex">
                    <span className="select-none w-5 mr-5 text-right text-white/15 text-xs shrink-0 leading-[1.75]">
                      {CODE_SNIPPET.length + 1}
                    </span>
                    <span className="inline-block w-[7px] h-[14px] bg-accent/70 animate-blink mt-[5px]" />
                  </div>
                </div>
              </div>

              {/* Stats row below code */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { value: `${config?.yearsExperience ?? 4}+`, label: 'Years',   sub: 'experience' },
                  { value: 'Faster',                          label: 'Deploys', sub: 'CI/CD automation' },
                  { value: 'Leaner',                          label: 'Bundles', sub: 'perf. optimised' },
                ].map(({ value, label, sub }) => (
                  <div
                    key={label}
                    className="bg-white/80 border border-canvas-300 rounded-xl p-4 text-center"
                  >
                    <p
                      className="font-display font-bold text-ink-900 leading-none tracking-tight mb-1"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                    >
                      {value}
                    </p>
                    <p className="font-mono text-[10px] text-ink-400 uppercase tracking-widest">
                      {label}
                    </p>
                    <p className="font-mono text-[10px] text-ink-300">
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400 hover:text-accent transition-colors duration-200"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        aria-label="Scroll to About"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  )
}
