import { useEffect, useRef } from 'react'
import { ArrowUpRight, Info, X } from 'lucide-react'
import type { Project } from '../data/profile'
import { Tag } from './ui/Tag'

interface Props {
  project: Project | null
  onClose: () => void
}

/** Native <dialog> gives focus trapping, Escape-to-close and focus restoration for free. */
export function CaseStudyDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      dialog.scrollTop = 0
      document.documentElement.style.overflow = 'hidden'
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => {
      document.documentElement.style.overflow = ''
      onClose()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      className="case-study"
      aria-labelledby="case-study-title"
      onClick={(e) => {
        // Clicking the backdrop (the dialog element itself, outside the content) closes it.
        if (e.target === e.currentTarget) e.currentTarget.close()
      }}
    >
      {project && (
        <article>
          <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-bg-raised/95 px-6 py-5 backdrop-blur sm:px-10 sm:py-6">
            <div>
              <p className="label">
                {project.context}
                {project.status && <span className="text-warn"> · {project.status}</span>}
              </p>
              <h2 id="case-study-title" className="mt-2 font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] text-fg sm:text-[2.1rem]">
                {project.name}
              </h2>
              <p className="mt-1 text-signal-soft">{project.kind}</p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              aria-label="Close case study"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
            <section className="border-l-2 border-signal/60 pl-5">
              <h3 className="label mb-2">The problem</h3>
              <p className="text-lg leading-relaxed text-pretty text-fg">{project.problem}</p>
            </section>

            <section>
              <h3 className="label mb-3">Overview</h3>
              <p className="leading-relaxed text-pretty text-fg-muted">{project.caseStudy.overview}</p>
            </section>

            <section className="grid gap-8 border-y border-line py-8 sm:grid-cols-2">
              <div>
                <h3 className="label mb-3">My role</h3>
                <p className="text-fg">{project.role}</p>
              </div>
              <div>
                <h3 className="label mb-3">Stack</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h3 className="label mb-4">{project.status ? 'What it covers' : 'What I worked on'}</h3>
              <ul className="space-y-3">
                {project.caseStudy.contribution.map((c) => (
                  <li key={c} className="flex gap-3.5 leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-[0.7rem] h-px w-3.5 shrink-0 bg-signal" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            {project.caseStudy.involves && (
              <section>
                <h3 className="label mb-4">What the work involves</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.caseStudy.involves.map((item) => (
                    <div key={item.title} className="rounded-[var(--radius-md)] border border-line bg-white/[0.02] p-5">
                      <p className="font-display font-semibold tracking-[-0.01em] text-fg">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <p className="flex gap-3 rounded-[var(--radius-md)] border border-line bg-white/[0.02] p-4 text-sm leading-relaxed text-fg-muted">
              <Info className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
              {project.caseStudy.note}
            </p>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-sm font-semibold text-signal-ink transition-colors hover:bg-[#ff7d55]"
                  >
                    {l.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      )}
    </dialog>
  )
}
