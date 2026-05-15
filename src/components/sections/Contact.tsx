import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { SiteConfig } from '@/types'

interface ContactProps { config: SiteConfig | null }

function Field({
  label, name, type = 'text', multiline = false, value, onChange, required = false,
}: {
  label: string; name: string; type?: string; multiline?: boolean
  value: string; onChange: (v: string) => void; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  const sharedProps = {
    id: name, name, required, value,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: 'w-full bg-transparent pt-6 pb-2 px-0 font-body text-sm text-ink-900 border-0 outline-none ring-0 placeholder-transparent resize-none',
  }

  return (
    <div className={['relative border-b transition-colors duration-200', focused ? 'border-accent' : 'border-canvas-300'].join(' ')}>
      <label
        htmlFor={name}
        className={['absolute left-0 font-mono text-xs transition-all duration-200 pointer-events-none',
          active ? 'top-0 text-accent tracking-widest uppercase' : 'top-4 text-ink-400',
        ].join(' ')}
      >
        {label}
      </label>
      {multiline
        ? <textarea {...sharedProps} rows={4} style={{ minHeight: 80 }} />
        : <input type={type} {...sharedProps} />
      }
    </div>
  )
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact({ config }: ContactProps) {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  function setField(key: keyof typeof form) {
    return (value: string) => setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...form,
        }).toString(),
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const SOCIALS = [
    { icon: Github,   href: config?.github   ?? '#', label: 'GitHub'   },
    { icon: Linkedin, href: config?.linkedin  ?? '#', label: 'LinkedIn' },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-canvas-100">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        <SectionTitle
          eyebrow="Contact"
          title="Say hello."
          subtitle="Open to senior front-end roles in Melbourne or remote. Happy to chat about Vue.js, design systems, or vintage synthesisers."
          centered
        />

        <motion.div
          ref={ref}
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left */}
            <div className="space-y-4 lg:col-span-2">
              <div className="border border-canvas-300 rounded-2xl p-6 bg-white">
                <p className="font-body text-sm leading-relaxed text-ink-500 mb-5">
                  I'm open to senior front-end roles in Melbourne or remote. If you think we'd be a good fit, let's talk.
                </p>
                <a
                  href={`mailto:${config?.email ?? 'jack.bodsworth@gmail.com'}`}
                  className="block font-mono text-sm text-ink-900 hover:text-accent transition-colors link-hover mb-1"
                >
                  {config?.email ?? 'jack.bodsworth@gmail.com'}
                </a>
                <p className="font-mono text-xs text-ink-400">Usually replies within 24 hours.</p>
                <div className="mt-5 flex gap-3">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas-300 text-ink-500 hover:border-accent/40 hover:text-accent transition-all"
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="border border-canvas-300 rounded-2xl px-5 py-4 bg-white">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-xs text-ink-500">
                    {config?.availableForWork ? 'Available for new roles' : 'Not actively looking'}
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="border border-canvas-300 rounded-2xl p-6 md:p-8 bg-white">
                {status === 'success' ? (
                  <motion.div
                    className="flex flex-col items-center gap-4 py-10 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle size={36} className="text-accent" strokeWidth={1.5} />
                    <h3 className="font-display font-bold text-xl text-ink-900">Message sent!</h3>
                    <p className="font-body text-sm text-ink-500">Thanks for reaching out. I'll be in touch soon.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 font-body text-sm text-ink-500 hover:text-ink-900 transition-colors link-hover"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-7">
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="bot-field" />
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field label="Name"  name="name"  value={form.name}  onChange={setField('name')}  required />
                      <Field label="Email" name="email" type="email" value={form.email} onChange={setField('email')} required />
                    </div>
                    <Field label="Subject" name="subject" value={form.subject} onChange={setField('subject')} />
                    <Field label="Message" name="message" multiline value={form.message} onChange={setField('message')} required />

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertCircle size={14} strokeWidth={1.5} />
                        <span className="font-body text-xs">Something went wrong. Please email directly.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 bg-accent text-white font-body text-sm font-semibold rounded-full py-3.5 hover:bg-accent-dim transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {status === 'sending'
                        ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        : <Send size={14} strokeWidth={1.5} />
                      }
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
