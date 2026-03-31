import { motion } from 'framer-motion'
import type { GlassCardProps } from '@/types'
import { cn } from '@/lib/utils'

/**
 * GlassCard — the core surface component of the portfolio.
 * Glassmorphism with optional amber border glow on hover.
 */
export function GlassCard({
  children,
  className,
  hoverable   = false,
  glowOnHover = false,
  noPadding   = false,
}: GlassCardProps) {
  const base = cn(
    'relative rounded-2xl border border-amber-500/10 bg-white/[0.03] backdrop-blur-sm',
    !noPadding && 'p-6',
    hoverable && 'transition-all duration-300 cursor-pointer',
    hoverable && 'hover:border-amber-500/30 hover:bg-white/[0.06]',
    glowOnHover && 'hover:shadow-amber',
    className
  )

  if (hoverable) {
    return (
      <motion.div
        className={base}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Subtle corner accent */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl">
          <span className="absolute left-0 top-0 h-12 w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
          <span className="absolute left-0 top-0 h-px  w-12 bg-gradient-to-r from-amber-400/40 to-transparent" />
        </span>
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}
