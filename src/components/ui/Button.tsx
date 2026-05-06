import { motion } from 'framer-motion'
import type { ButtonProps } from '@/types'
import { cn } from '@/lib/utils'

export function Button({
  children,
  variant  = 'solid',
  size     = 'md',
  href,
  onClick,
  className,
  icon,
  external = false,
  disabled = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-sm',
  }

  const variantClasses = {
    solid:   'bg-accent text-white hover:bg-accent-dim font-semibold shadow-sm',
    outline: 'border border-ink-200 text-ink-800 hover:border-ink-400 hover:bg-canvas-200',
    ghost:   'text-ink-500 hover:text-ink-900 hover:bg-canvas-200',
  }

  const base = cn(
    'inline-flex items-center gap-2 rounded-full font-body tracking-wide',
    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
    'disabled:opacity-40 disabled:pointer-events-none',
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
        whileTap={{ scale: 0.97 }}
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
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  )
}
