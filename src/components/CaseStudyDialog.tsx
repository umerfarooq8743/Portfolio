import { useEffect, useRef } from 'react'
import { ArrowUpRight, Info, X } from 'lucide-react'
import type { Project } from '../data/profile'
import { Tag } from './ui/Tag'

interface Props {
  project: Project | null
  onClose: () => void
}

/** Native <dialog> gives us focus trapping, Escape-to-close and focus restoration for free. */
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
      className="case-study w-full"
      aria-labelledby="case-study-title"
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself, outside the content) closes it.
        if (e.target === e.currentTarget) e.currentTarget.close()
      }}
    >
      {project && (
        <article>
          <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-ink-900/95 px-6 py-5 backdrop-blur sm:px-8">
            <div>
              <p className="eyebrow">
                {project.context}
                {project.status && <span className="text-amber-300/90"> · {project.status}</span>}
              </p>
              <h2 id="case-study-title" className="mt-1.5 text-2xl font-semibold tracking-tight text-fg">
                {project.name}
                <span className="font-normal text-fg-muted"> — {project.kind}</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              aria-label="Close case study"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div className="space-y-9 px-6 py-7 sm:px-8">
            <section>
              <h3 className="eyebrow mb-3">Overview</h3>
              <p className="leading-relaxed text-pretty text-fg-muted">{project.caseStudy.overview}</p>
            </section>

            <section className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow mb-2">My role</h3>
                <p className="text-fg">{project.role}</p>
              </div>
              <div>
                <h3 className="eyebrow mb-2">Stack</h3>
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
              <h3 className="eyebrow mb-3">{project.status ? 'What it covers' : 'What I worked on'}</h3>
              <ul className="space-y-2.5">
                {project.caseStudy.contribution.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            {project.caseStudy.involves && (
              <section>
                <h3 className="eyebrow mb-3">What the work involves</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.caseStudy.involves.map((item) => (
                    <div key={item.title} className="rounded-xl border border-line bg-white/[0.02] p-4">
                      <p className="text-sm font-medium text-fg">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <p className="flex gap-3 rounded-xl border border-line bg-white/[0.02] p-4 text-sm leading-relaxed text-fg-muted">
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
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:bg-white/[0.06]"
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
