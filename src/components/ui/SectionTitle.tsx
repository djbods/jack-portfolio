import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { SectionTitleProps } from '@/types'
import { cn } from '@/lib/utils'

/**
 * SectionTitle — consistent section heading with animated reveal.
 * Uses an "eyebrow" label (e.g. "01 / PROJECTS") above the main title.
 */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered  = false,
  className,
}: SectionTitleProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const variants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
    >
      {/* Eyebrow */}
      <motion.p
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-3 font-mono text-xs tracking-[0.3em] text-amber-500 uppercase"
      >
        {eyebrow}
      </motion.p>

      {/* Title */}
      <motion.h2
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="font-display text-3xl font-bold text-warm-50 md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {/* Amber underline accent */}
      <motion.div
        initial={{ scaleX: 0, originX: centered ? 0.5 : 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className={cn(
          'mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent',
          centered && 'mx-auto'
        )}
      />

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mt-6 max-w-2xl font-body text-warm-400 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
