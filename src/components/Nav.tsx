import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'

const sectionIds = [...navItems.map((n) => n.id), 'contact']

export function Nav() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, close on Escape / desktop resize, keep focus inside.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current || !toggleRef.current) return
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => {
      if (mq.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-[calc(var(--container-page)-1rem)] items-center justify-between gap-6 rounded-full border pr-2 pl-3 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-4 ${
          solid
            ? 'border-line-strong bg-bg/75 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-line bg-bg/30 backdrop-blur-md'
        }`}
      >
        <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-[0.6rem] bg-fg font-display text-[0.8rem] font-bold tracking-tight text-bg transition-transform duration-300 group-hover:-rotate-6"
          >
            UF
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.95rem] font-semibold tracking-tight text-fg">{profile.name}</span>
            <span className="mt-1 hidden font-mono text-[0.65rem] tracking-[0.12em] text-fg-subtle uppercase sm:block">
              Full-stack engineer
            </span>
          </span>
        </a>

        <ul className="hidden items-center rounded-full border border-line bg-white/[0.025] p-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
                    isActive ? 'bg-white/[0.07] text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full bg-signal transition-[opacity,transform] duration-300 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="grid size-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            className="grid size-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          >
            <LinkedInIcon className="size-[17px]" />
          </a>
          <a
            href={profile.cv}
            download
            className="group ml-1 inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:border-white/25 hover:bg-white/[0.06]"
          >
            CV
            <Download className="size-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="shine group inline-flex h-10 items-center gap-1.5 rounded-full bg-signal pr-3.5 pl-4.5 text-sm font-semibold text-signal-ink shadow-signal transition-colors hover:bg-[#ff7d55]"
          >
            Let’s talk
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-10 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-white/[0.06] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="mx-auto mt-2 flex max-h-[calc(100dvh-5.5rem)] flex-col overflow-y-auto rounded-[var(--radius-xl)] border border-line-strong bg-bg-raised shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] lg:hidden"
        >
          <ul className="flex flex-col px-6 pt-4">
            {[...navItems, { id: 'contact', label: 'Contact' }].map((item, i) => (
              <li key={item.id} className="intro border-b border-line" style={{ ['--intro-delay' as string]: `${i * 45}ms` }}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-fg">{item.label}</span>
                  <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 px-6 pt-8 pb-6">
            <div className="flex gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-signal text-[0.95rem] font-semibold text-signal-ink"
              >
                Email me
              </a>
              <a
                href={profile.cv}
                download
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong text-[0.95rem] font-medium text-fg"
              >
                <Download className="size-4" aria-hidden="true" /> Download CV
              </a>
            </div>
            <div className="flex gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong text-sm text-fg"
              >
                <GitHubIcon className="size-4" /> GitHub
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong text-sm text-fg"
              >
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
