import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'

const sectionIds = navItems.map((n) => n.id)

const iconLink =
  'grid size-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg'

export function Nav() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
    const mq = window.matchMedia('(min-width: 768px)')
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-line bg-ink-950/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-ink-950"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
          <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-gradient-to-b from-white/[0.08] to-white/[0.02] font-mono text-[0.78rem] font-medium tracking-tight text-fg transition-colors group-hover:border-accent/50">
            UF
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-fg sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'bg-white/[0.06] text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={iconLink}>
            <GitHubIcon className="size-[18px]" />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={iconLink}>
            <LinkedInIcon className="size-[17px]" />
          </a>
          <a
            href="#contact"
            className="ml-2 inline-flex h-9 items-center rounded-full border border-line-strong bg-white/[0.04] px-4 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:bg-white/[0.08]"
          >
            Let’s talk
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-white/[0.06] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" ref={panelRef} className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink-950 md:hidden">
          <ul className="container-page flex flex-col pt-4">
            {navItems.map((item, i) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className="flex items-baseline gap-4 py-5 text-2xl font-medium tracking-tight text-fg"
                >
                  <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-page mt-8 flex gap-3">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong text-sm text-fg">
              <GitHubIcon className="size-4" /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong text-sm text-fg">
              <LinkedInIcon className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
