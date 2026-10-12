import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { navItems, profile } from '../data/profile'

const linkClass = 'text-fg-muted transition-colors hover:text-fg'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-page grid gap-12 pt-20 pb-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="font-display text-2xl leading-snug font-semibold tracking-[-0.02em] text-pretty text-fg">
            Full-stack software engineer building business platforms, integrations and AI features.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-flex items-center gap-1.5 text-signal-soft underline-offset-4 transition-colors hover:text-signal hover:underline"
          >
            {profile.email}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="label mb-5">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {[...navItems, { id: 'contact', label: 'Contact' }].map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label mb-5">Elsewhere</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${linkClass}`}>
                LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${linkClass}`}>
                GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li className="text-fg-subtle">
              {profile.location} · {profile.timezone}
            </li>
          </ul>
        </div>
      </div>

      {/* Closing wordmark */}
      <div className="container-page pb-6 sm:pb-8" aria-hidden="true">
        <p className="font-display text-[clamp(2.75rem,14.6vw,12rem)] leading-[0.95] font-bold tracking-[-0.055em] whitespace-nowrap select-none">
          <span className="bg-gradient-to-b from-white/[0.14] to-white/[0.02] bg-clip-text text-transparent">Umer Farooq</span>
          <span className="text-signal/80">.</span>
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with React, TypeScript and Tailwind CSS.
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
