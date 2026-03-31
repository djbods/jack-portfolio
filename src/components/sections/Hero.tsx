import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, ArrowDown, Zap } from 'lucide-react'
import { NeuralCanvas } from '@/components/canvas/NeuralCanvas'
import { AmberButton } from '@/components/ui/AmberButton'
import type { SiteConfig } from '@/types'

// ─── Typing animation hook ────────────────────────────────────────────────────

function useTypingEffect(words: string[], typingSpeed = 80, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex,  setWordIndex]  = useState(0)
  const [charIndex,  setCharIndex]  = useState(0)
  const [deleting,   setDeleting]   = useState(false)

  useEffect(() => {
    const word = words[wordIndex]

    const id = setTimeout(() => {
      if (!deleting) {
        if (charIndex < word.length) {
          setDisplayed(word.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        } else {
          setTimeout(() => setDeleting(true), pauseMs)
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(word.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        } else {
          setDeleting(false)
          setWordIndex((i) => (i + 1) % words.length)
        }
      }
    }, deleting ? typingSpeed * 0.5 : typingSpeed)

    return () => clearTimeout(id)
  }, [charIndex, deleting, wordIndex, words, typingSpeed, pauseMs])

  return displayed
}

// ─── Hero Component ───────────────────────────────────────────────────────────

interface HeroProps {
  config: SiteConfig | null
}

export function Hero({ config }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY }  = useScroll()

  // Parallax: canvas fades out and shifts up on scroll
  const canvasOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const canvasY       = useTransform(scrollY, [0, 400], [0, -60])

  // Content parallax (slower)
  const contentY = useTransform(scrollY, [0, 600], [0, 80])

  const typedWord = useTypingEffect([
    'digital experiences.',
    'performant interfaces.',
    'design systems.',
    'things people love using.',
  ])

  // Split name into words so each word is rendered as an unbreakable unit,
  // preventing the surname from wrapping mid-word on any screen size.
  const nameWords = (config?.name ?? 'Jack Bodsworth').split(' ')

  function scrollToAbout() {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void"
    >
      {/* ── Neural background canvas ─────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: canvasOpacity, y: canvasY }}
      >
        <NeuralCanvas className="opacity-90" />
      </motion.div>

      {/* ── Radial vignette ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(7,7,15,0.7) 70%, rgba(7,7,15,0.95) 100%)',
        }}
      />

      {/* ── Grid overlay ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-grid-amber bg-grid opacity-100" />

      {/* ── Scan-line effect ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-0 right-0 h-px opacity-5"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(245,158,11,0.8), transparent)',
            animation: 'scanLine 6s linear infinite',
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        style={{ y: contentY }}
      >
        {/* Status badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span className="font-mono text-xs text-amber-400/80 tracking-wider">
            {config?.availableForWork ? 'Available for new opportunities' : 'Currently employed'}
          </span>
        </motion.div>

        {/* Name — word-by-word reveal with per-character stagger inside each word.
            Each word is wrapped in whitespace-nowrap so it never breaks mid-surname. */}
        <motion.h1
          className="mb-4 font-display font-extrabold tracking-tight text-warm-50"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', lineHeight: 1.05 }}
          aria-label={config?.name ?? 'Jack Bodsworth'}
        >
          {nameWords.map((word, wi) => {
            // Calculate the char offset so stagger continues across words
            const charOffset = nameWords.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + wi

            return (
              <span
                key={wi}
                className="inline-block whitespace-nowrap"
                style={{ marginRight: wi < nameWords.length - 1 ? '0.25em' : 0 }}
              >
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay:    0.5 + (charOffset + ci) * 0.04,
                      duration: 0.5,
                      ease:     [0.215, 0.61, 0.355, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            )
          })}
        </motion.h1>

        {/* Title */}
        <motion.p
          className="mb-6 font-mono text-sm tracking-[0.25em] text-amber-500 uppercase md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {config?.title ?? 'Senior Front-End Engineer'}
        </motion.p>

        {/* Typing tagline */}
        <motion.div
          className="mb-4 min-h-[2rem] font-body text-xl text-warm-300 md:text-2xl lg:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          I build{' '}
          <span className="text-amber-400">
            {typedWord}
            <span className="ml-0.5 inline-block h-6 w-0.5 bg-amber-400 align-middle animate-blink" />
          </span>
        </motion.div>

        {/* Location */}
        <motion.div
          className="mb-10 flex items-center justify-center gap-1.5 font-body text-sm text-warm-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <MapPin size={14} className="text-amber-500/60" />
          <span>{config?.location ?? 'Melbourne, VIC, Australia'}</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <AmberButton
            variant="solid"
            size="lg"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            icon={<Zap size={16} />}
          >
            View My Work
          </AmberButton>
          <AmberButton
            variant="outline"
            size="lg"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </AmberButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {[
            { value: `${config?.yearsExperience ?? 4}+`, label: 'Years' },
            { value: '40%',  label: 'Faster Deploys' },
            { value: '30%',  label: 'Load Time Saved' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl font-bold text-amber-400 md:text-3xl">{value}</p>
              <p className="font-mono text-xs text-warm-600 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-500 hover:text-amber-400 transition-colors"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        aria-label="Scroll to About"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
