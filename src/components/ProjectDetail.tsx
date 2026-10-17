import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Info, X } from 'lucide-react'
import { projects, type Project } from '../data/profile'
import { spotlight } from '../hooks/useSpotlight'
import { ProjectVisual } from './ProjectVisual'
import { CountUp } from './ui/CountUp'
import { Tag } from './ui/Tag'

const ease = [0.25, 1, 0.5, 1] as const
const num = (i: number) => String(i + 1).padStart(2, '0')

/** The sheet is its own scroll container, so in-view animations observe it instead of the window. */
const ScrollRoot = createContext<RefObject<HTMLDivElement | null> | null>(null)

const rise: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease, delay } }),
}

function InView({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const root = useContext(ScrollRoot)
  return (
    <motion.div
      className={className}
      variants={rise}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ root: root ?? undefined, once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="label mb-6 flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-6 bg-signal/70" />
      {children}
    </p>
  )
}

/* ---------------------------------------------------------------- */

function Title({ text }: { text: string }) {
  return (
    <h2
      id="project-detail-title"
      className="font-display text-[clamp(3rem,1.4rem+7vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-fg"
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

function Flow({ title, steps }: { title: string; steps: string[] }) {
  const root = useContext(ScrollRoot)
  return (
    <InView>
      <SectionLabel>{title}</SectionLabel>
      <div className="no-scrollbar -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2">
        <motion.ol
          className="flex min-w-max items-start gap-y-10 lg:min-w-0 lg:flex-wrap"
          initial="hidden"
          whileInView="show"
          viewport={{ root: root ?? undefined, once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.09 }}
        >
          {steps.map((step, i) => (
            <motion.li
              key={step}
              className="flex items-start"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
            >
              <div className="flex w-28 flex-col items-center text-center sm:w-32">
                <span className="relative grid size-11 place-items-center rounded-full border border-signal/40 bg-signal/[0.08] font-mono text-xs text-signal-soft">
                  {num(i)}
                  <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-signal/20 ring-offset-4 ring-offset-bg" />
                </span>
                <span className="mt-4 px-1 text-sm leading-snug font-medium text-fg">{step}</span>
              </div>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="relative mt-[1.35rem] block h-px w-8 overflow-hidden bg-line sm:w-10">
                  <motion.span
                    className="absolute inset-0 origin-left bg-gradient-to-r from-signal to-signal-soft"
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.5, ease, delay: 0.15 } } }}
                  />
                </span>
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </InView>
  )
}

function Body({ project, index, onNavigate }: { project: Project; index: number; onNavigate: (p: Project) => void }) {
  const root = useContext(ScrollRoot)
  const { scrollY } = useScroll({ container: root ?? undefined })
  const visualScale = useTransform(scrollY, [0, 700], [1, 0.93])
  const visualOpacity = useTransform(scrollY, [0, 700], [1, 0.45])
  const next = projects[(index + 1) % projects.length]
  const cs = project.caseStudy

  return (
    <article aria-labelledby="project-detail-title">
      {/* ---------- Hero ---------- */}
      <header className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="aurora absolute -top-48 right-[-15%] -z-10 h-[40rem] w-[55rem] bg-[radial-gradient(closest-side,rgba(255,107,61,0.18),transparent)]"
        />
        <div aria-hidden="true" className="container-page absolute inset-x-0 top-0 -z-10 h-full">
          <div className="column-guides h-full w-full border-x border-white/[0.04]" />
        </div>

        <div className="container-page pt-14 pb-12 md:pt-20">
          <motion.p
            className="label flex flex-wrap items-center gap-x-3 gap-y-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
          >
            <span className="text-signal-soft">{num(index)}</span>
            <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
            <span>{project.context}</span>
            {project.period && (
              <>
                <span aria-hidden="true" className="text-fg-subtle/50">/</span>
                <span>{project.period}</span>
              </>
            )}
            {project.status && (
              <span className="rounded-full border border-warn/30 bg-warn/[0.08] px-2 py-0.5 tracking-[0.06em] text-warn normal-case">
                {project.status}
              </span>
            )}
          </motion.p>

          <div className="mt-8">
            <Title text={project.name} />
          </div>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
          >
            <p className="text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] text-signal-soft">{project.kind}</p>
            {project.formerly && (
              <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.7rem] tracking-[0.08em] text-fg-muted uppercase">
                formerly {project.formerly}
              </span>
            )}
          </motion.div>

          <motion.div
            className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
          >
            <p className="text-lead max-w-[58ch] text-pretty text-fg-muted lg:col-span-7">{project.summary}</p>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[0.95rem] font-semibold text-signal-ink shadow-signal transition-colors hover:bg-[#ff7d55]"
                >
                  {l.label}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
              <span className="inline-flex h-12 items-center rounded-full border border-line-strong px-5 text-sm text-fg-muted">
                {project.role}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="container-page"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.55 }}
        >
          <motion.div style={{ scale: visualScale, opacity: visualOpacity }} className="origin-top">
            <ProjectVisual kind={project.visual} label={project.name} size="xl" />
          </motion.div>
        </motion.div>
      </header>

      <div className="container-page space-y-24 py-20 md:space-y-32 md:py-28">
        {/* ---------- Metrics ---------- */}
        {project.metrics && (
          <InView>
            <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
              {project.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col gap-3 py-8 ${i % 2 === 1 ? 'border-l border-line pl-6' : 'pr-6'} ${
                    i > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''
                  } ${i < 2 ? 'max-lg:border-b max-lg:border-line' : ''}`}
                >
                  <dt className="text-sm leading-snug text-fg-muted">{m.label}</dt>
                  <dd className="order-first font-display text-[clamp(2.5rem,1.8rem+2.6vw,4.25rem)] leading-none font-semibold tracking-[-0.045em] text-fg">
                    <CountUp value={m.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </InView>
        )}

        {/* ---------- Problem + overview ---------- */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <InView className="lg:col-span-5">
            <SectionLabel>The problem</SectionLabel>
            <p className="font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.35rem)] leading-[1.2] font-medium tracking-[-0.025em] text-pretty text-fg">
              “{project.problem}”
            </p>
          </InView>
          <InView className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-[1.0625rem] leading-[1.8] text-pretty text-fg-muted">{cs.overview}</p>
          </InView>
        </div>

        {/* ---------- Pipeline ---------- */}
        {cs.flow && <Flow title={cs.flow.title} steps={cs.flow.steps} />}

        {/* ---------- What's inside ---------- */}
        {cs.capabilities && (
          <div>
            <InView>
              <SectionLabel>What’s inside</SectionLabel>
            </InView>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cs.capabilities.map((c, i) => (
                <InView key={c.title} delay={i * 0.08}>
                  <div onPointerMove={spotlight} className="surface surface-interactive spotlight h-full overflow-hidden p-6">
                    <span className="font-mono text-xs text-signal-soft">{num(i)}</span>
                    <p className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-fg">{c.title}</p>
                    <ul className="mt-4 space-y-2">
                      {c.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[0.92rem] leading-snug text-fg-muted">
                          <span aria-hidden="true" className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-signal/70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Contribution ---------- */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <InView className="lg:col-span-4">
            <SectionLabel>{project.status ? 'What I built' : 'What I worked on'}</SectionLabel>
            <p className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-fg">
              My contribution, <span className="text-fg-muted">in detail.</span>
            </p>
          </InView>
          <ol className="lg:col-span-8">
            {cs.contribution.map((c, i) => (
              <InView key={c} delay={Math.min(i, 4) * 0.05}>
                <li className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-5 transition-colors last:border-b hover:border-line-strong">
                  <span className="font-mono text-sm text-fg-subtle transition-colors group-hover:text-signal-soft">{num(i)}</span>
                  <span className="leading-relaxed text-pretty text-fg-muted transition-colors group-hover:text-fg">{c}</span>
                </li>
              </InView>
            ))}
          </ol>
        </div>

        {/* ---------- What the work involves ---------- */}
        {cs.involves && (
          <div>
            <InView>
              <SectionLabel>What the work involves</SectionLabel>
            </InView>
            <div className="grid gap-4 md:grid-cols-2">
              {cs.involves.map((item, i) => (
                <InView key={item.title} delay={(i % 2) * 0.08}>
                  <div onPointerMove={spotlight} className="surface surface-interactive spotlight h-full overflow-hidden p-7 sm:p-8">
                    <p className="font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-fg">{item.title}</p>
                    <p className="mt-3 leading-relaxed text-pretty text-fg-muted">{item.body}</p>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Stack + note ---------- */}
        <InView className="grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>Role</SectionLabel>
            <p className="text-lg text-fg">{project.role}</p>
          </div>
          <div className="lg:col-span-8">
            <SectionLabel>Stack</SectionLabel>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Tag tone={s.startsWith('OpenAI') ? 'ice' : 'default'}>{s}</Tag>
                </li>
              ))}
            </ul>
            <p className="mt-10 flex gap-3 rounded-[var(--radius-md)] border border-line bg-white/[0.02] p-4 text-sm leading-relaxed text-fg-muted">
              <Info className="mt-0.5 size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
              {cs.note}
            </p>
          </div>
        </InView>
      </div>

      {/* ---------- Next project ---------- */}
      <button
        type="button"
        onClick={() => onNavigate(next)}
        className="group relative block w-full overflow-hidden border-t border-line text-left"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-signal/[0.06] transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-y-100"
        />
        <span className="container-page relative flex items-end justify-between gap-6 py-16 md:py-24">
          <span>
            <span className="label block">Next case study</span>
            <span className="mt-5 block font-display text-[clamp(2.5rem,1.2rem+6vw,7rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-fg transition-colors duration-500 group-hover:text-signal-soft">
              {next.name}
            </span>
            <span className="mt-4 block text-fg-muted">{next.kind}</span>
          </span>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:-rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-ink md:size-24">
            <ArrowRight className="size-6 md:size-8" aria-hidden="true" />
          </span>
        </span>
      </button>
    </article>
  )
}

/* ---------------------------------------------------------------- */

interface SheetProps {
  project: Project
  origin: DOMRect | null
  onClose: () => void
  onNavigate: (p: Project) => void
}

function clipFrom(origin: DOMRect | null) {
  if (!origin) return 'inset(0px 0px 0px 0px round 0px)'
  const vw = window.innerWidth
  const vh = window.innerHeight
  const top = Math.max(0, origin.top)
  const left = Math.max(0, origin.left)
  const right = Math.max(0, vw - origin.right)
  const bottom = Math.max(0, vh - origin.bottom)
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 28px)`
}

function Sheet({ project, origin, onClose, onNavigate }: SheetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ container: ref })
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 })

  const index = projects.findIndex((p) => p.id === project.id)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  // Lock page scroll, move focus in, restore it on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      document.documentElement.style.overflow = prevOverflow
      opener?.focus?.({ preventScroll: true })
    }
  }, [])

  // Jump to the top when switching between projects.
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 })
  }, [project.id])

  // Keyboard: Escape closes, arrows switch project, Tab stays inside the sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowRight' && !e.altKey) onNavigate(next)
      if (e.key === 'ArrowLeft' && !e.altKey) onNavigate(prev)
      if (e.key !== 'Tab' || !ref.current) return
      const focusables = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusables.length) return
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
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onNavigate, next, prev])

  const from = clipFrom(origin)
  const full = 'inset(0px 0px 0px 0px round 0px)'

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[70] bg-[rgb(5_5_6/0.7)] backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="fixed inset-0 z-[71] overflow-y-auto overscroll-contain bg-bg"
        initial={reduce ? { opacity: 0 } : { clipPath: from, opacity: origin ? 1 : 0 }}
        animate={reduce ? { opacity: 1 } : { clipPath: full, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { clipPath: from, opacity: origin ? 0.4 : 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      >
        <div aria-hidden="true" className="page-atmosphere" />

        {/* Sticky bar */}
        <div className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-xl">
          <div className="container-page flex h-16 items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              All work
            </button>
            <p className="label hidden sm:block">
              Case study <span className="text-fg">{num(index)}</span> / {num(projects.length - 1)}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate(prev)}
                aria-label={`Previous project: ${prev.name}`}
                className="grid size-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(next)}
                aria-label={`Next project: ${next.name}`}
                className="grid size-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="ml-1 grid size-10 place-items-center rounded-full bg-fg text-bg transition-transform hover:rotate-90"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <motion.div aria-hidden="true" style={{ scaleX: progress }} className="h-px origin-left bg-gradient-to-r from-signal to-ice" />
        </div>

        <ScrollRoot.Provider value={ref}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease }}
            >
              <Body project={project} index={index} onNavigate={onNavigate} />
            </motion.div>
          </AnimatePresence>
        </ScrollRoot.Provider>
      </motion.div>
    </>
  )
}

interface Props {
  project: Project | null
  origin: DOMRect | null
  onClose: () => void
  onNavigate: (p: Project) => void
}

/** Full-screen case study that expands out of the card that opened it. */
export function ProjectDetail({ project, origin, onClose, onNavigate }: Props) {
  return createPortal(
    <AnimatePresence>
      {project && <Sheet key="project-sheet" project={project} origin={origin} onClose={onClose} onNavigate={onNavigate} />}
    </AnimatePresence>,
    document.body,
  )
}
