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
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden,   setHidden]   = useState(false)

  useEffect(() => {
    if (!isAtTop) setHidden(direction === 'down' && !menuOpen)
  }, [direction, isAtTop, menuOpen])

  function handleLinkClick(href: string) {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isAtTop
            ? 'bg-transparent'
            : 'bg-canvas-100/90 backdrop-blur-md border-b border-canvas-300',
        ].join(' ')}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <nav className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-5 md:px-10">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero') }}
            className="font-display text-base font-bold tracking-tight text-ink-900 hover:text-accent transition-colors duration-200"
          >
            JB
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className="font-body text-sm text-ink-500 hover:text-ink-900 transition-colors duration-200 link-hover"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="mailto:jack.bodsworth@gmail.com"
            className="hidden md:inline-flex items-center font-body text-sm font-semibold text-white bg-accent rounded-full px-5 py-2 hover:bg-accent-dim transition-colors duration-200"
          >
            Hire me
          </a>

          {/* Mobile toggle */}
          <button
            className="p-2 text-ink-600 hover:text-ink-900 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-canvas-100 md:hidden flex flex-col"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-canvas-300">
              <span className="font-display text-base font-bold text-ink-900">JB</span>
              <button className="p-2 text-ink-500" onClick={() => setMenuOpen(false)}>
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col px-6 pt-6 gap-0">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left font-display text-3xl font-bold text-ink-900 py-4 border-b border-canvas-300 hover:text-accent transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href="mailto:jack.bodsworth@gmail.com"
                className="mt-8 self-start font-body text-sm font-semibold text-white bg-accent rounded-full px-6 py-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
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
