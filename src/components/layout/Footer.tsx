import { Github, Linkedin, Mail } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Github,   href: 'https://github.com/djbods',             label: 'GitHub'   },
  { icon: Linkedin, href: 'https://linkedin.com/in/jackbodsworth',  label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:jack.bodsworth@gmail.com',        label: 'Email'    },
]

export function Footer() {
  return (
    <footer className="border-t border-canvas-300 bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-sm font-bold text-ink-900 tracking-tight">
            Jack Bodsworth
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink-400 hover:text-accent transition-colors duration-200"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-ink-400">
            © {new Date().getFullYear()} — Melbourne, AU
          </p>
        </div>
      </div>
    </footer>
  )
}
