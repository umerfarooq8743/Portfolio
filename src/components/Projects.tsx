import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/profile'
import { spotlight } from '../hooks/useSpotlight'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'
import { ProjectVisual } from './ProjectVisual'
import { ProjectDetail } from './ProjectDetail'

type Open = (e: MouseEvent<HTMLElement>) => void

/** Whole card opens the case study, except clicks on its own links. */
const cardClick = (open: Open) => (e: MouseEvent<HTMLElement>) => {
  if ((e.target as HTMLElement).closest('a, button')) return
  open(e)
}

const num = (i: number) => String(i + 1).padStart(2, '0')

function Meta({ project, index }: { project: Project; index: number }) {
  return (
    <p className="label flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-signal-soft">{num(index)}</span>
      <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
      <span>{project.context}</span>
      {project.formerly && <span className="tracking-[0.06em] text-fg-subtle normal-case">formerly {project.formerly}</span>}
      {project.status && (
        <span className="rounded-full border border-warn/30 bg-warn/[0.08] px-2 py-0.5 tracking-[0.06em] text-warn normal-case">
          {project.status}
        </span>
      )}
    </p>
  )
}

function CaseStudyButton({ project, onOpen, emphasis = false }: { project: Project; onOpen: Open; emphasis?: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={`group/cs inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
        emphasis
          ? 'shine bg-fg text-bg hover:bg-white'
          : 'border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07]'
      }`}
    >
      View case study
      <span className="sr-only">: {project.name}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/cs:translate-x-1" aria-hidden="true" />
    </button>
  )
}

function ExternalLinks({ project }: { project: Project }) {
  return (
    <>
      {project.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
        >
          {l.label}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </>
  )
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((h) => (
        <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
          <span aria-hidden="true" className="mt-[0.7rem] h-px w-3.5 shrink-0 bg-signal" />
          {h}
        </li>
      ))}
    </ul>
  )
}

/* ---------- Tier 1: lead case study ---------- */
function LeadProject({ project, index, onOpen }: { project: Project; index: number; onOpen: Open }) {
  return (
    <article
      onClick={cardClick(onOpen)}
      onPointerMove={spotlight}
      className="surface edge-signal spotlight group cursor-pointer overflow-hidden rounded-[var(--radius-xl)] bg-[radial-gradient(90%_70%_at_100%_0%,rgba(255,107,61,0.09),transparent_60%)]"
    >
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="flex flex-col lg:col-span-5">
          <Meta project={project} index={index} />
          <h3 className="mt-8 font-display text-[clamp(2.5rem,1.6rem+3vw,4.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-fg transition-colors duration-500 group-hover:text-signal-soft">
            {project.name}
          </h3>
          <p className="mt-3 text-lg text-signal-soft">{project.kind}</p>

          <div className="mt-8 border-l-2 border-signal/60 pl-5">
            <p className="label mb-2">The problem</p>
            <p className="leading-relaxed text-pretty text-fg">{project.problem}</p>
          </div>
          <p className="mt-6 leading-relaxed text-pretty text-fg-muted">{project.summary}</p>

          <div className="mt-auto hidden flex-wrap items-center gap-x-5 gap-y-3 pt-10 lg:flex">
            <CaseStudyButton project={project} onOpen={onOpen} emphasis />
            <ExternalLinks project={project} />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:-translate-y-1.5 group-hover:scale-[1.01]">
            <ProjectVisual kind={project.visual} label={project.name} size="lg" />
          </div>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="label mb-3">My role</dt>
              <dd className="text-fg">{project.role}</dd>
              <dt className="label mt-6 mb-3">Stack</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <Tag tone={s.startsWith('OpenAI') ? 'ice' : 'default'}>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="label mb-3">Highlights</dt>
              <dd>
                <Highlights items={project.highlights} />
              </dd>
            </div>
          </dl>
          {/* On small screens the CTA follows the details */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 lg:hidden">
            <CaseStudyButton project={project} onOpen={onOpen} emphasis />
            <ExternalLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  )
}

/* ---------- Tier 2: large feature card ---------- */
function FeatureProject({ project, index, onOpen }: { project: Project; index: number; onOpen: Open }) {
  return (
    <article
      onClick={cardClick(onOpen)}
      onPointerMove={spotlight}
      className="surface surface-interactive spotlight group flex h-full cursor-pointer flex-col overflow-hidden rounded-[var(--radius-xl)] p-5 sm:p-7"
    >
      <div className="transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:-translate-y-1.5 group-hover:scale-[1.015]">
        <ProjectVisual kind={project.visual} label={project.name} />
      </div>
      <div className="flex flex-1 flex-col pt-8">
        <Meta project={project} index={index} />
        <h3 className="text-h3 mt-5 text-fg transition-colors duration-500 group-hover:text-signal-soft">{project.name}</h3>
        <p className="mt-2 text-signal-soft">{project.kind}</p>
        <p className="mt-5 leading-relaxed text-pretty text-fg">{project.problem}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-fg-muted">{project.summary}</p>

        <div className="mt-7 border-t border-line pt-6">
          <p className="text-sm">
            <span className="label mr-3">My role</span>
            <span className="text-fg">{project.role}</span>
          </p>
          <div className="mt-5">
            <Highlights items={project.highlights} />
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
          <CaseStudyButton project={project} onOpen={onOpen} />
          <ExternalLinks project={project} />
        </div>
      </div>
    </article>
  )
}

/* ---------- Tier 3: editorial index row ---------- */
function IndexProject({ project, index, onOpen }: { project: Project; index: number; onOpen: Open }) {
  return (
    <article
      onClick={cardClick(onOpen)}
      className="group relative grid cursor-pointer gap-5 border-t border-line py-8 transition-colors duration-300 hover:border-line-strong md:grid-cols-12 md:gap-8 md:py-10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gradient-to-r from-signal to-transparent transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-x-100"
      />
      <div className="md:col-span-4">
        <Meta project={project} index={index} />
        <h3 className="mt-4 font-display text-[1.85rem] leading-tight font-semibold tracking-[-0.03em] text-fg transition-[color,transform] duration-500 group-hover:translate-x-1.5 group-hover:text-signal-soft">
          {project.name}
        </h3>
        <p className="mt-1.5 text-signal-soft">{project.kind}</p>
      </div>
      <div className="md:col-span-5">
        <p className="leading-relaxed text-pretty text-fg">{project.problem}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-fg-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between gap-5 md:col-span-3 md:items-end md:text-right">
        <p className="text-sm">
          <span className="label block">My role</span>
          <span className="mt-2 block text-fg">{project.role}</span>
        </p>
        <CaseStudyButton project={project} onOpen={onOpen} />
      </div>
    </article>
  )
}

const hashId = () => /^#work\/([\w-]+)$/.exec(window.location.hash)?.[1]

export function Projects() {
  const [active, setActive] = useState<Project | null>(() => projects.find((p) => p.id === hashId()) ?? null)
  const [origin, setOrigin] = useState<DOMRect | null>(null)
  const pushed = useRef(false)

  // Deep links (#work/<id>) and the browser back button open / close the case study.
  useEffect(() => {
    const sync = () => {
      pushed.current = false
      setActive(projects.find((p) => p.id === hashId()) ?? null)
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const show = useCallback((p: Project) => {
    setActive(p)
    const url = `#work/${p.id}`
    if (pushed.current) history.replaceState(null, '', url)
    else {
      history.pushState(null, '', url)
      pushed.current = true
    }
  }, [])

  const openFrom = (p: Project) => (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget.closest('article') ?? e.currentTarget
    setOrigin(card.getBoundingClientRect())
    show(p)
  }

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false
      history.back()
    } else {
      history.replaceState(null, '', '#work')
      setActive(null)
    }
  }, [])

  const lead = projects.filter((p) => p.tier === 'lead')
  const features = projects.filter((p) => p.tier === 'feature')
  const index = projects.filter((p) => p.tier === 'index')
  const order = (p: Project) => projects.indexOf(p)

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeader
          index="01"
          label="Selected work"
          id="work-title"
          title={
            <>
              Production software, <span className="text-fg-muted">built for real businesses.</span>
            </>
          }
          intro="Order management with AI, a customs-clearing ERP, a trading ERP with POS, an accounting ERP, tailoring POS, booking, healthcare and desktop messaging. Open any project for the full case study — proprietary work is shown with illustrative sketches, never fake screenshots."
        />

        <div className="space-y-6 lg:space-y-8">
          {lead.map((p) => (
            <Reveal key={p.id}>
              <LeadProject project={p} index={order(p)} onOpen={openFrom(p)} />
            </Reveal>
          ))}

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
            {features.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className={`h-full ${features.length % 2 === 1 && i === features.length - 1 ? 'md:max-xl:col-span-2' : ''}`}>
                <FeatureProject project={p} index={order(p)} onOpen={openFrom(p)} />
              </Reveal>
            ))}
          </div>
        </div>

        {index.length > 0 && (
          <div className="mt-24">
            <Reveal className="mb-2 flex items-end justify-between gap-6">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-fg">More from the workbench</h3>
              <span className="label hidden sm:block">{index.length} projects</span>
            </Reveal>
            <div className="border-b border-line">
              {index.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <IndexProject project={p} index={order(p)} onOpen={openFrom(p)} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectDetail project={active} origin={origin} onClose={close} onNavigate={show} />
    </section>
  )
}
