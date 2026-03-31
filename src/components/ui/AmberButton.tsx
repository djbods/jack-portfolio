import { motion } from 'framer-motion'
import type { AmberButtonProps } from '@/types'
import { cn } from '@/lib/utils'

/**
 * AmberButton — the primary CTA component.
 * Three variants: solid (amber fill), outline (amber border), ghost (text-only).
 */
export function AmberButton({
  children,
  variant    = 'solid',
  size       = 'md',
  href,
  onClick,
  className,
  icon,
  external   = false,
  disabled   = false,
}: AmberButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variantClasses = {
    solid:   'bg-amber-500 text-void hover:bg-amber-400 shadow-amber-sm hover:shadow-amber font-semibold',
    outline: 'border border-amber-500/50 text-amber-400 hover:border-amber-400 hover:text-amber-300 hover:bg-amber-500/5',
    ghost:   'text-amber-400 hover:text-amber-300 hover:bg-amber-500/5',
  }

  const base = cn(
    'inline-flex items-center gap-2 rounded-xl font-body tracking-wide',
    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50',
    'disabled:opacity-50 disabled:pointer-events-none',
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={base}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={base}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
