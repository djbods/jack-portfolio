import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export function Navbar() {
  const { isAtTop, direction } = useScrollProgress()
  const [menuOpen, setMenuOpen]   = useState(false)
  const [hidden,   setHidden]     = useState(false)

  // Auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    if (!isAtTop) setHidden(direction === 'down' && !menuOpen)
  }, [direction, isAtTop, menuOpen])

  function handleLinkClick(href: string) {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navBg = isAtTop
    ? 'bg-transparent'
    : 'bg-void/80 backdrop-blur-md border-b border-amber-500/10'

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBg}`}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo / wordmark */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero') }}
            className="font-display text-lg font-bold text-warm-50 hover:text-amber-400 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-amber-500">J</span>B
            <span className="ml-1 font-mono text-xs text-amber-500/60">_</span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <motion.button
                  onClick={() => handleLinkClick(link.href)}
                  className="group relative font-body text-sm text-warm-400 hover:text-warm-50 transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <span className="mr-1 font-mono text-xs text-amber-500/50">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  {link.label}
                  {/* Underline hover effect */}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="mailto:jack.bodsworth@gmail.com"
            className="hidden items-center gap-2 rounded-lg border border-amber-500/30 px-4 py-2 font-body text-sm text-amber-400 hover:border-amber-400 hover:bg-amber-500/5 transition-all duration-200 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Hire me
          </motion.a>

          {/* Mobile menu toggle */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-warm-400 hover:text-warm-50 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="font-display text-3xl font-bold text-warm-50 hover:text-amber-400 transition-colors"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href="mailto:jack.bodsworth@gmail.com"
                className="mt-4 rounded-xl border border-amber-500/40 px-8 py-4 font-body text-amber-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Hire me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
