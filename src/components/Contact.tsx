import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'

const channels = [
  {
    label: 'LinkedIn',
    handle: 'in/umerfarooq-dev',
    href: profile.links.linkedin,
    Icon: LinkedInIcon,
    note: 'Opportunities',
  },
  {
    label: 'GitHub',
    handle: '@umerfarooq8743',
    href: profile.links.github,
    Icon: GitHubIcon,
    note: 'Code & projects',
  },
]

export function Contact() {
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied('done')
    } catch {
      setCopied('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied('idle'), 2200)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate scroll-mt-20 overflow-hidden border-t border-line py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[30rem] bg-[radial-gradient(50%_60%_at_50%_100%,rgba(99,102,241,0.14),transparent_70%)]"
      />
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2.5 font-mono text-xs tracking-[0.14em] uppercase">
            <span className="text-teal-300">07</span>
            <span aria-hidden="true" className="text-fg-subtle">/</span>
            <span className="text-accent-soft">Contact</span>
          </p>
          <h2 id="contact-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-balance text-fg sm:text-5xl md:text-6xl">
            Let’s build something <span className="text-gradient">reliable.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fg-muted">
            Whether it’s a role, a project or a conversation about Angular and Node.js, I’m happy to hear from you.
          </p>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-3xl">
          <div className="card ring-gradient flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:items-center sm:p-3 sm:pl-6">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 pt-3 sm:p-0">
              <Mail className="size-5 shrink-0 text-teal-300" aria-hidden="true" />
              <span className="truncate font-mono text-sm text-fg sm:text-[0.95rem]">{profile.email}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:bg-white/[0.06] sm:flex-none"
              >
                {copied === 'done' ? (
                  <Check className="size-4 text-ok" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
                {copied === 'done' ? 'Copied' : copied === 'failed' ? 'Copy failed' : 'Copy'}
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-300 to-indigo-300 px-5 text-sm font-medium text-ink-950 transition-[filter] hover:brightness-110 sm:flex-none"
              >
                Send email
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied === 'done' ? 'Email address copied to clipboard' : copied === 'failed' ? 'Could not copy email address' : ''}
          </p>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {channels.map(({ label, handle, href, Icon, note }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex items-center gap-4 p-5 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.03]"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-fg">{label}</span>
                    <span className="block truncate text-sm text-fg-muted">
                      {handle} · {note}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-fg-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-fg-subtle">
            {profile.location} · {profile.timezone}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
