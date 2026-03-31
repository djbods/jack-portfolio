import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Github,   href: 'https://github.com/jackbodsworth',   label: 'GitHub'   },
  { icon: Linkedin, href: 'https://linkedin.com/in/jackbodsworth', label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com/jackbodsworth',  label: 'Twitter'  },
  { icon: Mail,     href: 'mailto:jack.bodsworth@gmail.com',    label: 'Email'    },
]

export function Footer() {
  return (
    <footer className="border-t border-amber-500/10 bg-void py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Wordmark */}
          <p className="font-display text-sm font-semibold text-warm-400">
            <span className="text-amber-500">Jack</span> Bodsworth
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-warm-800 text-warm-500 transition-all duration-200 hover:border-amber-500/40 hover:text-amber-400"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-warm-600">
            © {new Date().getFullYear()} — Built with React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
