import type { CSSProperties, PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowDown, Bot, Download, LayoutDashboard, RefreshCw, Truck } from 'lucide-react'
import { profile, stats } from '../data/profile'
import { spotlight } from '../hooks/useSpotlight'
import { ButtonLink } from './ui/Button'
import { CountUp } from './ui/CountUp'

const delay = (ms: number) => ({ '--intro-delay': `${ms}ms` }) as CSSProperties

const capabilities = [
  {
    title: 'Sync orders & stock',
    body: 'Orders and inventory kept in step across every selling channel.',
    Icon: RefreshCw,
    tags: ['Shopify', 'WooCommerce', 'Daraz', 'Splendid'],
  },
  {
    title: 'Ship with 20+ couriers',
    body: 'Booking, tracking and notifications through local couriers.',
    Icon: Truck,
    tags: ['TCS', 'Leopards', 'PostEx', '+ more'],
  },
  {
    title: 'ERP frontends',
    body: 'Accounting, customs-clearing and tailoring ERPs — with role-based permissions.',
    Icon: LayoutDashboard,
    tags: ['Angular', 'React', 'POS', 'RBAC'],
  },
  {
    title: 'AI on real data',
    body: 'Natural-language reporting and agents that act on instructions.',
    Icon: Bot,
    tags: ['OpenAI API', 'Agents'],
    ai: true,
  },
]

/** Decorative route line: a shipment-style path between nodes, drawn once on load. */
function RouteLine() {
  const d = 'M20 300 C 120 300, 140 180, 250 180 S 380 250, 470 120 S 600 40, 700 60'
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 340"
      fill="none"
      className="pointer-events-none absolute -top-6 right-[-6rem] hidden w-[46rem] max-w-none opacity-70 lg:block"
    >
      <defs>
        <linearGradient id="route-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff6b3d" stopOpacity="0" />
          <stop offset="35%" stopColor="#ff6b3d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a9c1ff" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d={d} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <path d={d} stroke="url(#route-stroke)" strokeWidth="1.5" strokeDasharray="1200" strokeDashoffset="1200" className="route-draw" />
      {[
        [250, 180],
        [470, 120],
        [700, 60],
      ].map(([cx, cy], i) => (
        <g key={i} className="intro" style={delay(900 + i * 220)}>
          <circle cx={cx} cy={cy} r="10" fill="rgba(255,107,61,0.08)" />
          <circle cx={cx} cy={cy} r="3.5" fill={i === 2 ? '#a9c1ff' : '#ff6b3d'} />
        </g>
      ))}
    </svg>
  )
}

/** Splits a line into words that rise into place one after another. */
function Words({ text, start }: { text: string; start: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: start + i * 0.08 }}
          >
            {w}
          </motion.span>
          {'\u00a0'}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  // Pointer parallax for the warm light behind the headline.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const glowX = useTransform(sx, (v) => v * 60)
  const glowY = useTransform(sy, (v) => v * 40)
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-20 md:pt-[calc(var(--header-h)+3.5rem)] md:pb-28"
    >
      {/* Atmosphere: editorial column guides inside the content width + one warm light */}
      <div aria-hidden="true" className="container-page absolute inset-x-0 top-0 -z-10 h-full">
        <div className="column-guides h-full w-full border-x border-white/[0.04]" />
      </div>
      <motion.div aria-hidden="true" style={{ x: glowX, y: glowY }} className="absolute -top-40 right-[-10%] -z-10 h-[42rem] w-[60rem]">
        <div className="aurora size-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.18),transparent)]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ x: useTransform(sx, (v) => v * -50), y: useTransform(sy, (v) => v * -30) }}
        className="absolute top-[30%] left-[-15%] -z-10 h-[30rem] w-[40rem] bg-[radial-gradient(closest-side,rgba(169,193,255,0.07),transparent)]"
      />

      <div className="container-page relative">
        <RouteLine />

        {/* Status row */}
        <div className="intro flex flex-wrap items-center justify-between gap-4" style={delay(0)}>
          <p className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-bg/60 py-1.5 pr-4 pl-2 text-sm text-fg-muted backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full bg-signal/[0.12] px-2.5 py-0.5 font-mono text-[0.68rem] tracking-[0.1em] text-signal-soft uppercase">
              <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-signal" />
              Now
            </span>
            <span>
              Building <span className="text-fg">AI agents</span> for WinqoHub
            </span>
          </p>
          <p className="label hidden md:block">
            {profile.location} <span className="text-fg-subtle/60">/</span> {profile.timezone}
          </p>
        </div>

        {/* Headline */}
        <h1 id="hero-title" className="mt-10 md:mt-12">
          <span className="intro mb-5 block font-mono text-xs font-normal tracking-[0.04em] text-fg-muted sm:text-sm md:mb-6 md:text-base" style={delay(80)}>
            Umer Farooq <span className="text-fg-subtle">—</span> Full-stack software engineer
          </span>
          <span className="text-display block text-fg">
            <Words text="Building the software" start={0.15} />
          </span>
          <span className="text-display block text-fg">
            <Words text="businesses" start={0.4} />
            <motion.span
              className="relative inline-block text-signal"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.55 }}
            >
              run on.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.12em] left-0 h-[0.16em] w-[96%] overflow-visible"
              >
                <path
                  d="M3 16 C 60 6, 140 4, 200 9 S 280 18, 297 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  className="underline-draw"
                />
              </svg>
            </motion.span>
          </span>
        </h1>

        {/* Value + proof */}
        <div className="mt-12 grid gap-14 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="intro lg:col-span-6" style={delay(380)}>
            <p className="text-lead max-w-[46ch] text-pretty text-fg-muted">
              I build full-stack platforms that keep orders moving, stock accurate and teams in control — on{' '}
              <span className="text-fg">Angular, Node.js, Express and MongoDB</span>. From{' '}
              <span className="text-fg">20+ courier integrations</span> and multi-channel order sync to{' '}
              <span className="text-fg">AI agents</span> on the OpenAI API.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#work" size="lg">
                See selected work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={profile.cv} download variant="secondary" size="lg">
                Download CV
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <dl className="intro grid grid-cols-2 self-end border-t border-line lg:col-span-5 lg:col-start-8" style={delay(480)}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-2 py-6 ${i % 2 === 1 ? 'border-l border-line pl-6' : 'pr-6'} ${
                  i < 2 ? 'border-b border-line' : ''
                }`}
              >
                <dt className="text-sm leading-snug text-fg-muted">{s.label}</dt>
                <dd className="order-first font-display text-[2.4rem] leading-none font-semibold tracking-[-0.04em] text-fg sm:text-5xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Capability strip */}
        <ul
          className="intro mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line shadow-[var(--shadow-card)] sm:grid-cols-2 md:mt-24 lg:grid-cols-4"
          style={delay(580)}
        >
          {capabilities.map(({ title, body, Icon, tags, ai }, i) => (
            <li
              key={title}
              onPointerMove={spotlight}
              className="spotlight group relative flex flex-col bg-bg-raised p-6 transition-colors duration-500 hover:bg-surface sm:p-7"
            >
              {/* Hover: signal hairline + soft corner light */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent to-transparent transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-x-100 ${
                  ai ? 'via-ice' : 'via-signal'
                }`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  ai ? 'bg-[radial-gradient(closest-side,rgba(169,193,255,0.14),transparent)]' : 'bg-[radial-gradient(closest-side,rgba(255,107,61,0.14),transparent)]'
                }`}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className={`grid size-10 place-items-center rounded-xl border transition-[background-color,transform] duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                    ai
                      ? 'border-ice/25 bg-ice/[0.07] text-ice'
                      : 'border-signal/25 bg-signal/[0.08] text-signal-soft group-hover:bg-signal/[0.14]'
                  }`}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="font-mono text-[0.68rem] tracking-[0.12em] text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <p className="relative mt-6 font-display text-[1.2rem] leading-snug font-semibold tracking-[-0.02em] text-fg">{title}</p>
              <p className="relative mt-2 text-[0.95rem] leading-relaxed text-pretty text-fg-muted">{body}</p>

              <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-6" aria-label={`${title}: examples`}>
                {tags.map((t) => (
                  <li
                    key={t}
                    className={`rounded-md border px-2 py-0.5 font-mono text-[0.68rem] ${
                      ai ? 'border-ice/20 bg-ice/[0.05] text-ice/90' : 'border-line bg-white/[0.025] text-fg-muted'
                    }`}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
