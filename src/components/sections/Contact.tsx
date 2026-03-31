import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import { AmberButton } from '@/components/ui/AmberButton'
import type { SiteConfig } from '@/types'

interface ContactProps {
  config: SiteConfig | null
}

// ─── Floating label input ─────────────────────────────────────────────────────

function Field({
  label,
  name,
  type = 'text',
  multiline = false,
  value,
  onChange,
  required = false,
}: {
  label: string
  name: string
  type?: string
  multiline?: boolean
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  const sharedProps = {
    id:         name,
    name,
    required,
    value,
    onFocus:    () => setFocused(true),
    onBlur:     () => setFocused(false),
    onChange:   (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  onChange(e.target.value),
    className:  [
      'w-full bg-transparent pt-5 pb-2 px-0 font-body text-sm text-warm-100',
      'border-0 outline-none ring-0 placeholder-transparent resize-none',
    ].join(' '),
  }

  return (
    <div className="group relative border-b border-warm-700 transition-colors duration-200 focus-within:border-amber-500">
      <label
        htmlFor={name}
        className={[
          'absolute left-0 font-mono text-xs transition-all duration-200 pointer-events-none',
          active
            ? 'top-0 text-amber-500 tracking-widest uppercase'
            : 'top-4 text-warm-500 tracking-wide',
        ].join(' ')}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          {...sharedProps}
          rows={4}
          style={{ minHeight: 80 }}
        />
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-amber-500"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ width: '100%' }}
      />
    </div>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact({ config }: ContactProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  function setField(key: keyof typeof form) {
    return (value: string) => setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    // ── Replace this block with your preferred form backend ──────────────────
    // Options: Formspree, EmailJS, Netlify Forms, Firebase Functions, etc.
    // Example using Formspree:
    //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   })
    //   if (res.ok) setStatus('success')
    //   else        setStatus('error')
    // ─────────────────────────────────────────────────────────────────────────

    // Placeholder delay simulating a request
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const SOCIALS = [
    { icon: Github,   href: config?.github   ?? '#', label: 'GitHub'   },
    { icon: Linkedin, href: config?.linkedin  ?? '#', label: 'LinkedIn' },
    { icon: Twitter,  href: config?.twitter   ?? '#', label: 'Twitter'  },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-void py-24 md:py-32">
      {/* Amber bottom glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="05 / Contact"
          title="Let's build something great."
          subtitle="Whether you have a specific project in mind, want to explore working together, or just want to say hello — my inbox is always open."
          centered
        />

        <motion.div
          ref={ref}
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid gap-8 lg:grid-cols-5">
            {/* ── Left: contact info ────────────────────────────── */}
            <div className="space-y-6 lg:col-span-2">
              <GlassCard>
                <p className="mb-6 font-body text-sm leading-relaxed text-warm-400">
                  I'm currently open to senior and staff-level front-end roles in Melbourne
                  (or remote). If you think we'd be a good fit, let's talk.
                </p>

                <div className="space-y-3">
                  <a
                    href={`mailto:${config?.email ?? 'jack.bodsworth@gmail.com'}`}
                    className="block font-mono text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {config?.email ?? 'jack.bodsworth@gmail.com'}
                  </a>
                  <p className="font-mono text-xs text-warm-600">
                    Usually replies within 24 hours.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-warm-800 text-warm-500 transition-all hover:border-amber-500/40 hover:text-amber-400"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </GlassCard>

              {/* Availability pill */}
              <GlassCard className="!py-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                  </span>
                  <span className="font-mono text-xs text-warm-400">
                    {config?.availableForWork
                      ? 'Available for new roles'
                      : 'Not actively looking'}
                  </span>
                </div>
              </GlassCard>
            </div>

            {/* ── Right: contact form ───────────────────────────── */}
            <div className="lg:col-span-3">
              <GlassCard>
                {status === 'success' ? (
                  <motion.div
                    className="flex flex-col items-center gap-4 py-8 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle size={40} className="text-amber-500" />
                    <h3 className="font-display text-xl font-bold text-warm-50">
                      Message sent!
                    </h3>
                    <p className="font-body text-sm text-warm-400">
                      Thanks for reaching out. I'll be in touch soon.
                    </p>
                    <AmberButton
                      variant="ghost"
                      onClick={() => setStatus('idle')}
                    >
                      Send another
                    </AmberButton>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field label="Name" name="name" value={form.name} onChange={setField('name')} required />
                      <Field label="Email" name="email" type="email" value={form.email} onChange={setField('email')} required />
                    </div>
                    <Field label="Subject" name="subject" value={form.subject} onChange={setField('subject')} />
                    <Field label="Message" name="message" multiline value={form.message} onChange={setField('message')} required />

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle size={14} />
                        <span className="font-body text-xs">
                          Something went wrong. Please try emailing directly.
                        </span>
                      </div>
                    )}

                    <AmberButton
                      variant="solid"
                      size="lg"
                      disabled={status === 'sending'}
                      icon={
                        status === 'sending' ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-void border-t-transparent" />
                        ) : (
                          <Send size={14} />
                        )
                      }
                      className="w-full justify-center"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </AmberButton>
                  </form>
                )}
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
