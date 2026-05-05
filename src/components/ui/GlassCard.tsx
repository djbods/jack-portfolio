import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { GlassCardProps } from '@/types'

export function Card({
  children,
  className,
  hoverable  = false,
  noPadding  = false,
}: GlassCardProps) {
  const base = cn(
    'rounded-2xl border border-canvas-300 bg-white',
    !noPadding && 'p-6',
    hoverable && [
      'transition-all duration-300 cursor-pointer',
      'hover:border-ink-200 hover:shadow-card',
    ].join(' '),
    className
  )

  if (hoverable) {
    return (
      <motion.div
        className={base}
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}

export { Card as GlassCard }
