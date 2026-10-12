import { useCallback, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'
import { ProjectVisual } from './ProjectVisual'
import { CaseStudyDialog } from './CaseStudyDialog'

function ContextLine({ project, number }: { project: Project; number?: string }) {
  return (
    <p className="flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.1em] text-fg-subtle uppercase">
      {number && <span className="text-teal-300">{number}</span>}
      {number && <span aria-hidden="true">/</span>}
      {project.context}
      {project.status && (
        <span className="rounded-full border border-amber-300/25 bg-amber-300/[0.06] px-2 py-px text-[0.65rem] tracking-normal text-amber-200 normal-case">
          {project.status}
        </span>
      )}
    </p>
  )
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-[0.95rem]">
      {items.map((h) => (
        <li key={h} className="flex gap-3 leading-relaxed text-fg-muted">
          <span aria-hidden="true" className="mt-[0.6rem] h-px w-3.5 shrink-0 bg-gradient-to-r from-teal-300 to-accent" />
          {h}
        </li>
      ))}
    </ul>
  )
}

function Actions({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="group/btn inline-flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-4 text-sm font-medium text-fg transition-colors hover:border-teal-300/40 hover:bg-white/[0.07]"
      >
        Read case study
        <span className="sr-only">: {project.name}</span>
        <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
      </button>
      {project.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          {l.label}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </div>
  )
}

/** Large alternating row used for flagship case studies. */
function FeaturedProject({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const flip = index % 2 === 1
  return (
    <article className="ring-gradient group relative overflow-hidden rounded-[1.4rem] bg-white/[0.018] p-4 sm:p-6 lg:p-8">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90 ${
          flip ? '-left-20 bg-indigo-500/15' : '-right-20 bg-teal-400/10'
        }`}
      />
      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={`transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-translate-y-1 ${flip ? 'lg:order-2' : ''}`}>
          <ProjectVisual kind={project.visual} label={project.name} />
        </div>
        <div className="px-1">
          <ContextLine project={project} number={String(index + 1).padStart(2, '0')} />
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-[2.1rem]">{project.name}</h3>
          <p className="mt-1.5 text-accent-soft">{project.kind}</p>
          <p className="mt-5 leading-relaxed text-pretty text-fg-muted">{project.summary}</p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 text-sm">
            <span className="font-mono text-xs tracking-[0.1em] text-fg-subtle uppercase">My role</span>
            <span className="text-fg">{project.role}</span>
          </p>
          <div className="mt-5">
            <Highlights items={project.highlights} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <Actions project={project} onOpen={onOpen} />
          </div>
        </div>
      </div>
    </article>
  )
}

/** Compact card for the remaining projects. */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden p-4 transition-[border-color,background-color] duration-300 hover:border-white/[0.14] hover:bg-white/[0.025] sm:p-5">
      <div className="transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5">
        <ProjectVisual kind={project.visual} label={project.name} />
      </div>
      <div className="flex flex-1 flex-col px-1 pt-6">
        <ContextLine project={project} />
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">{project.name}</h3>
        <p className="mt-1 text-sm text-accent-soft">{project.kind}</p>
        <p className="mt-4 leading-relaxed text-pretty text-fg-muted">{project.summary}</p>
        <p className="mt-5 flex flex-wrap items-baseline gap-x-3 text-sm">
          <span className="font-mono text-xs tracking-[0.1em] text-fg-subtle uppercase">My role</span>
          <span className="text-fg">{project.role}</span>
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7">
          <Actions project={project} onOpen={onOpen} />
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const close = useCallback(() => setActive(null), [])
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" aria-labelledby="work-title" className="section-tint scroll-mt-20 py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="02"
          label="Selected work"
          id="work-title"
          title="Production software for real businesses."
          intro="Order management with AI, ERP, event booking, healthcare and desktop messaging — platforms I’ve built, integrated and maintained in production, plus a full-stack system I’m building on my own. Proprietary work is shown with illustrative sketches, not screenshots."
        />

        <div className="space-y-6 lg:space-y-8">
          {featured.map((p, i) => (
            <Reveal key={p.id}>
              <FeaturedProject project={p} index={i} onOpen={() => setActive(p)} />
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <Reveal className="mt-20 mb-8 flex items-center gap-4">
              <h3 className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">More work</h3>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={i * 100} className="h-full">
                  <ProjectCard project={p} onOpen={() => setActive(p)} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      <CaseStudyDialog project={active} onClose={close} />
    </section>
  )
}
