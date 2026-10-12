import { ArrowUp } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto] md:gap-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-white/[0.04] font-mono text-[0.78rem] font-medium text-fg">
              UF
            </span>
            <span className="font-medium text-fg">{profile.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
            {profile.title} · {profile.specialty}. Building business software from {profile.location.split(',')[0]}.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Elsewhere</p>
          <div className="flex gap-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="grid size-10 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <GitHubIcon className="size-[18px]" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="grid size-10 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <LinkedInIcon className="size-[17px]" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center">
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
