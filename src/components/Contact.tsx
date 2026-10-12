import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'

const channels = [
  { label: 'LinkedIn', handle: 'in/umerfarooq-dev', href: profile.links.linkedin, Icon: LinkedInIcon, note: 'Roles & opportunities' },
  { label: 'GitHub', handle: '@umerfarooq8743', href: profile.links.github, Icon: GitHubIcon, note: 'Code & experiments' },
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
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line py-28 md:py-36">
      <div className="container-page">
        <Reveal>
          <div className="surface edge-signal relative isolate overflow-hidden rounded-[var(--radius-xl)] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div
              aria-hidden="true"
              className="absolute -right-40 -bottom-56 -z-10 size-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.22),transparent)]"
            />
            <div aria-hidden="true" className="column-guides absolute inset-0 -z-10 opacity-60" />

            <p className="label flex items-center gap-3">
              <span className="text-signal-soft">07</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              Contact
            </p>

            <h2 id="contact-title" className="mt-8 max-w-[16ch] font-display text-[clamp(2.4rem,1.2rem+4.6vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-fg">
              Building something that has to <span className="text-signal">just work?</span>
            </h2>
            <p className="text-lead mt-8 max-w-[52ch] text-pretty text-fg-muted">
              Whether it’s a role, a product or an integration problem, I’d like to hear about it. Email is the fastest
              way to reach me.
            </p>

            {/* Email as the primary action */}
            <div className="mt-12 flex flex-col gap-4 border-y border-line py-6 lg:flex-row lg:items-center lg:justify-between">
              <a
                href={`mailto:${profile.email}`}
                className="group min-w-0 font-display text-[clamp(1.15rem,0.7rem+2.2vw,2.4rem)] font-semibold tracking-[-0.03em] break-all text-fg transition-colors hover:text-signal-soft sm:break-normal"
              >
                {profile.email}
                <ArrowUpRight
                  className="ml-2 inline size-[0.8em] align-baseline text-signal transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </a>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-5 text-sm font-medium text-fg transition-colors hover:border-white/25 hover:bg-white/[0.07] sm:flex-none"
                >
                  {copied === 'done' ? (
                    <Check className="size-4 text-ok" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                  {copied === 'done' ? 'Copied' : copied === 'failed' ? 'Copy failed' : 'Copy email'}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-signal px-6 text-sm font-semibold text-signal-ink shadow-signal transition-colors hover:bg-[#ff7d55] sm:flex-none"
                >
                  Send email
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              {copied === 'done' ? 'Email address copied to clipboard' : copied === 'failed' ? 'Could not copy email address' : ''}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {channels.map(({ label, handle, href, Icon, note }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-[var(--radius-md)] border border-line bg-bg/40 p-4 transition-colors hover:border-line-strong hover:bg-white/[0.04]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-fg">{label}</span>
                    <span className="block text-sm break-words text-fg-muted">{handle}</span>
                    <span className="mt-0.5 block text-xs text-fg-subtle">{note}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-fg-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
              <div className="flex items-center gap-4 rounded-[var(--radius-md)] border border-dashed border-line p-4 sm:col-span-2 lg:col-span-1">
                <span className="min-w-0">
                  <span className="label block">Based in</span>
                  <span className="mt-1.5 block text-sm text-fg">
                    {profile.location} · {profile.timezone}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
