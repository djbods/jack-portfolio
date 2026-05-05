import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { SectionTitleProps } from '@/types'
import { cn } from '@/lib/utils'

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered  = false,
  className,
}: SectionTitleProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={cn('mb-14 md:mb-20', centered && 'text-center', className)}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-xs tracking-[0.18em] text-ink-400 uppercase mb-4"
      >
        {eyebrow}
      </motion.p>

      {/* Title — Cabinet Grotesk, bold, legible */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '105%' }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="font-display font-bold text-ink-900"
          style={{ fontSize: 'clamp(1.875rem, 4vw, 3.25rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Accent rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className={cn(
          'mt-4 h-[3px] w-10 bg-accent rounded-full origin-left',
          centered && 'mx-auto origin-center'
        )}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
          className="mt-5 font-body text-ink-500 max-w-2xl leading-relaxed md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
