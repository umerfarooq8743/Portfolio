/**
 * Illustrative diagram of the integrations around WinqoHub: selling channels
 * feed orders into the order hub, which books shipments with couriers and sends
 * notifications, with an AI layer on top. It shows *which* services are
 * integrated — not internal architecture.
 *
 * Desktop/tablet: interactive SVG — hover any node to trace its route through
 * the hub. Mobile: the same information as a readable vertical flow, so labels
 * never shrink to illegible sizes.
 */
import { useState, type CSSProperties } from 'react'
import { Plus, Sparkles, Truck } from 'lucide-react'
import {
  AI,
  CH,
  CO,
  COURIER_TOTAL,
  H,
  HEAD_Y,
  HUB,
  HUB_CX,
  HUB_CY,
  NT,
  PORT,
  ROUTES,
  VIEW_TOP,
  W,
  channels,
  chNodes,
  chips,
  coNodes,
  courierNames,
  hubFacets,
  links,
  moreCouriers,
  nodeState,
  notifyItems,
  ntNodes,
} from '../lib/integrationMap'

/* ---------- colours (mirror the theme tokens in index.css) ---------- */
const C = {
  bg: '#0a0a0b',
  fg: '#f3f1ec',
  muted: '#a8a59e',
  subtle: '#827f78',
  signal: '#ff6b3d',
  signalSoft: '#ff9a72',
  ice: '#a9c1ff',
}
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'
const display = 'var(--font-display)'

type Active = string | null

/* ---------- desktop SVG ---------- */
function MapSvg({ active, onActive }: { active: Active; onActive: (id: Active) => void }) {
  const state = (id: string) => nodeState(active, id)
  const node = (id: string) => ({
    className: 'imap-node',
    'data-node': id,
    'data-state': state(id),
    onPointerEnter: () => onActive(id),
    onPointerLeave: () => onActive(null),
  })

  return (
    <svg
      viewBox={`0 ${VIEW_TOP} ${W} ${H - VIEW_TOP}`}
      className="h-auto w-full select-none"
      role="img"
      aria-labelledby="imap-title"
      aria-describedby="imap-desc"
    >
      <title id="imap-title">WinqoHub integration map</title>
      <desc id="imap-desc">
        Orders from Shopify, WooCommerce, Daraz and Splendid Accounts flow into the WinqoHub order hub, which books
        shipments through more than 20 couriers including BlueEx, TCS, Leopards, PostEx, M&amp;P and Call Courier Trax,
        and sends email and SMS notifications. An AI layer on the OpenAI API adds natural-language reporting and AI
        agents.
      </desc>

      <defs>
        <pattern id="imap-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.75" fill="#fff" fillOpacity="0.075" />
        </pattern>
        <radialGradient id="imap-fade" cx="50%" cy="52%" r="62%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="imap-mask">
          <rect width={W} height={H} fill="url(#imap-fade)" />
        </mask>

        <radialGradient id="imap-hub-glow">
          <stop offset="0" stopColor={C.signal} stopOpacity="0.26" />
          <stop offset="1" stopColor={C.signal} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="imap-ai-glow">
          <stop offset="0" stopColor={C.ice} stopOpacity="0.14" />
          <stop offset="1" stopColor={C.ice} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="imap-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#19191d" />
          <stop offset="1" stopColor="#121215" />
        </linearGradient>
        <linearGradient id="imap-hub-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.signal} stopOpacity="0.17" />
          <stop offset="0.55" stopColor={C.signal} stopOpacity="0.05" />
          <stop offset="1" stopColor={C.signal} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="imap-hub-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.signalSoft} stopOpacity="0.95" />
          <stop offset="0.5" stopColor={C.signal} stopOpacity="0.4" />
          <stop offset="1" stopColor={C.ice} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="imap-sheen" gradientUnits="userSpaceOnUse" x1={HUB.x + 20} y1="0" x2={HUB.x + HUB.w - 20} y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* Wire gradients are in user space so straight wires (zero-height bbox) still render. */}
        <linearGradient id="imap-in" gradientUnits="userSpaceOnUse" x1={CH.x + CH.w} y1="0" x2={PORT.in.x} y2="0">
          <stop offset="0" stopColor={C.ice} />
          <stop offset="1" stopColor={C.signalSoft} />
        </linearGradient>
        <linearGradient id="imap-out" gradientUnits="userSpaceOnUse" x1={PORT.out.x} y1="0" x2={CO.x} y2="0">
          <stop offset="0" stopColor={C.signalSoft} />
          <stop offset="1" stopColor={C.fg} />
        </linearGradient>
        <linearGradient id="imap-down" gradientUnits="userSpaceOnUse" x1="0" y1={PORT.down.y} x2="0" y2={NT.y}>
          <stop offset="0" stopColor={C.signalSoft} />
          <stop offset="1" stopColor={C.fg} />
        </linearGradient>

        <filter id="imap-glow" filterUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Atmosphere */}
      <g pointerEvents="none">
        <rect width={W} height={H} fill="url(#imap-dots)" mask="url(#imap-mask)" />
        <ellipse cx={HUB_CX} cy={HUB_CY} rx="176" ry="128" fill="url(#imap-hub-glow)" />
        <ellipse cx={HUB_CX} cy={AI.y + AI.h / 2} rx="130" ry="48" fill="url(#imap-ai-glow)" />
      </g>

      {/* Column headers */}
      <g fontFamily={mono} fontSize="9" letterSpacing="0.14em" pointerEvents="none">
        <text x={CH.x} y={HEAD_Y} fill={C.subtle}>
          SELLING CHANNELS
        </text>
        <text x={CH.x + CH.w} y={HEAD_Y} fill={C.muted} textAnchor="end">
          {String(channels.length).padStart(2, '0')}
        </text>
        <text x={CO.x} y={HEAD_Y} fill={C.subtle}>
          COURIERS
        </text>
        <text x={CO.x + CO.w} y={HEAD_Y} fill={C.muted} textAnchor="end">
          {COURIER_TOTAL}+
        </text>
        <text x={ntNodes[0].x} y={NT.y - 9} fill={C.subtle}>
          NOTIFY
        </text>
        <path
          d={`M${CH.x} ${HEAD_Y + 9} H${CH.x + CH.w} M${CO.x} ${HEAD_Y + 9} H${CO.x + CO.w}`}
          stroke="#fff"
          strokeOpacity="0.08"
        />
      </g>

      {/* Wires + flowing traffic */}
      <g fill="none" pointerEvents="none">
        {links.map((l) => (
          <g key={l.owner} className="imap-link" data-state={state(l.owner)}>
            <path className="imap-wire" d={l.d} stroke={l.stroke} strokeWidth="1.25" />
            <path
              className="imap-comet"
              d={l.d}
              pathLength={1}
              stroke={l.stroke}
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#imap-glow)"
              style={{ '--flow-dur': `${l.dur}s`, '--flow-delay': `${l.delay}s` } as CSSProperties}
            />
          </g>
        ))}
        <g className="imap-link" data-state={state('ai')}>
          <path
            className="imap-dash"
            d={`M${PORT.up.x} ${PORT.up.y} L${HUB_CX} ${AI.y + AI.h}`}
            stroke={C.ice}
            strokeOpacity="0.6"
            strokeWidth="1.25"
            strokeDasharray="3 4"
          />
        </g>
      </g>

      {/* AI layer */}
      <g {...node('ai')}>
        <rect x={AI.x} y={AI.y} width={AI.w} height={AI.h} rx="11" fill="#111216" />
        <rect
          className="imap-card"
          x={AI.x}
          y={AI.y}
          width={AI.w}
          height={AI.h}
          rx="11"
          fill={C.ice}
          fillOpacity="0.05"
          stroke={C.ice}
          strokeOpacity="0.32"
        />
        <rect x={AI.x + 10} y={AI.y + 10} width="26" height="26" rx="7.5" fill={C.ice} fillOpacity="0.1" stroke={C.ice} strokeOpacity="0.25" />
        <Sparkles x={AI.x + 16.5} y={AI.y + 16.5} size={13} color={C.ice} strokeWidth={1.8} aria-hidden="true" />
        <text x={AI.x + 46} y={AI.y + 19.5} fontFamily={mono} fontSize="8.5" letterSpacing="0.14em" fill={C.ice}>
          AI · OPENAI API
        </text>
        <text x={AI.x + 46} y={AI.y + 34.5} fontFamily={sans} fontSize="11.5" fill="#dedbd4">
          NL reporting · agents
        </text>
        <circle cx={HUB_CX} cy={AI.y + AI.h} r="2.5" fill={C.bg} stroke={C.ice} strokeOpacity="0.8" />
      </g>

      {/* Channels */}
      {chNodes.map(({ id, y, cy, label, kind, Icon }) => (
        <g key={id} {...node(id)}>
          <rect className="imap-card" x={CH.x} y={y} width={CH.w} height={CH.h} rx="10" fill="url(#imap-card)" stroke="#fff" strokeOpacity="0.09" />
          <rect x={CH.x + 9} y={y + 9} width="26" height="26" rx="7.5" fill={C.ice} fillOpacity="0.08" stroke={C.ice} strokeOpacity="0.2" />
          <Icon x={CH.x + 15.5} y={y + 15.5} size={13} color={C.ice} strokeWidth={1.8} aria-hidden="true" />
          <text x={CH.x + 44} y={y + 19.5} fontFamily={sans} fontSize="12.5" fontWeight="500" fill={C.fg}>
            {label}
          </text>
          <text x={CH.x + 44} y={y + 32.5} fontFamily={mono} fontSize="8" letterSpacing="0.12em" fill={C.subtle}>
            {kind.toUpperCase()}
          </text>
          <circle cx={CH.x + CH.w} cy={cy} r="2.5" fill={C.bg} stroke={C.ice} strokeOpacity="0.75" />
        </g>
      ))}

      {/* Hub */}
      <g {...node('hub')}>
        <g pointerEvents="none">
          <rect className="imap-pulse" x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="16" fill="none" stroke={C.signal} vectorEffect="non-scaling-stroke" />
          <rect
            className="imap-pulse"
            style={{ animationDelay: '-1.8s' }}
            x={HUB.x}
            y={HUB.y}
            width={HUB.w}
            height={HUB.h}
            rx="16"
            fill="none"
            stroke={C.signal}
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="16" fill="#141416" />
        <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="16" fill="url(#imap-hub-fill)" stroke="url(#imap-hub-stroke)" strokeWidth="1.2" />
        <path d={`M${HUB.x + 20} ${HUB.y + 0.75} H${HUB.x + HUB.w - 20}`} stroke="url(#imap-sheen)" />

        <circle className="imap-ping" cx={HUB.x + 19} cy={HUB.y + 22.5} r="3" fill={C.signal} />
        <circle cx={HUB.x + 19} cy={HUB.y + 22.5} r="3" fill={C.signal} />
        <text x={HUB.x + 29} y={HUB.y + 25.5} fontFamily={mono} fontSize="8.5" letterSpacing="0.14em" fill={C.signalSoft}>
          ORDER HUB
        </text>
        <text x={HUB.x + 16} y={HUB.y + 58} fontFamily={display} fontSize="24" fontWeight="650" letterSpacing="-0.02em" fill="#fff">
          WinqoHub
        </text>
        <path d={`M${HUB.x + 16} ${HUB.y + 72.5} H${HUB.x + HUB.w - 16}`} stroke="#fff" strokeOpacity="0.08" />
        {chips.map((c) => (
          <g key={c.t}>
            <rect x={c.x} y={HUB.y + 82} width={c.w} height="20" rx="6" fill="#fff" fillOpacity="0.035" stroke="#fff" strokeOpacity="0.1" />
            <text x={c.x + c.w / 2} y={HUB.y + 95.5} textAnchor="middle" fontFamily={sans} fontSize="10" fill={C.muted}>
              {c.t}
            </text>
          </g>
        ))}

        {Object.values(PORT).map((p) => (
          <g key={`${p.x}-${p.y}`}>
            <circle cx={p.x} cy={p.y} r="4.5" fill={C.bg} stroke={C.signal} strokeOpacity="0.8" />
            <circle cx={p.x} cy={p.y} r="1.75" fill={C.signalSoft} />
          </g>
        ))}
      </g>

      {/* Couriers */}
      {coNodes.map(({ id, y, cy, label, more }) => (
        <g key={id} {...node(id)}>
          <rect
            className="imap-card"
            x={CO.x}
            y={y}
            width={CO.w}
            height={CO.h}
            rx="8"
            fill={more ? 'transparent' : 'url(#imap-card)'}
            stroke="#fff"
            strokeOpacity={more ? 0.14 : 0.09}
            strokeDasharray={more ? '3 3' : undefined}
          />
          <rect
            x={CO.x + 7}
            y={y + 6}
            width="20"
            height="20"
            rx="6"
            fill={more ? 'transparent' : C.signal}
            fillOpacity="0.08"
            stroke={more ? '#fff' : C.signal}
            strokeOpacity={more ? 0.16 : 0.22}
            strokeDasharray={more ? '2 2' : undefined}
          />
          {more ? (
            <Plus x={CO.x + 11.5} y={y + 10.5} size={11} color={C.muted} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Truck x={CO.x + 11.5} y={y + 10.5} size={11} color={C.signalSoft} strokeWidth={1.9} aria-hidden="true" />
          )}
          <text x={CO.x + 36} y={y + 20.5} fontFamily={sans} fontSize="12" fill={more ? C.muted : '#e7e4dd'}>
            {label}
          </text>
          <circle cx={CO.x} cy={cy} r="2.5" fill={C.bg} stroke={C.signalSoft} strokeOpacity="0.75" />
        </g>
      ))}

      {/* Notifications */}
      {ntNodes.map(({ id, x, cx, label, sub, Icon }) => (
        <g key={id} {...node(id)}>
          <rect className="imap-card" x={x} y={NT.y} width={NT.w} height={NT.h} rx="10" fill="url(#imap-card)" stroke="#fff" strokeOpacity="0.09" />
          <rect x={x + 9} y={NT.y + 9} width="24" height="24" rx="7" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.12" />
          <Icon x={x + 15} y={NT.y + 15} size={12} color={C.muted} strokeWidth={1.8} aria-hidden="true" />
          <text x={x + 42} y={NT.y + 19} fontFamily={sans} fontSize="12" fontWeight="500" fill={C.fg}>
            {label}
          </text>
          <text x={x + 42} y={NT.y + 32} fontFamily={mono} fontSize="8" letterSpacing="0.08em" fill={C.subtle}>
            {sub.toUpperCase()}
          </text>
          <circle cx={cx} cy={NT.y} r="2.5" fill={C.bg} stroke={C.signalSoft} strokeOpacity="0.75" />
        </g>
      ))}
    </svg>
  )
}

/* ---------- mobile flow ---------- */
function GroupLabel({ label, count }: { label: string; count?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-line pb-2">
      <p className="label">{label}</p>
      {count && <span className="font-mono text-[0.68rem] tracking-[0.12em] text-fg-muted">{count}</span>}
    </div>
  )
}

function FlowConnector() {
  return (
    <div aria-hidden="true" className="relative mx-auto my-3 h-10 w-px bg-gradient-to-b from-ice/40 to-signal/70">
      <span className="imap-drop absolute top-0 -left-[2px] size-[5px] rounded-full bg-signal-soft shadow-[0_0_10px_rgba(255,154,114,0.85)]" />
    </div>
  )
}

/** Mobile: the same map as a vertical flow. */
function MapFlow() {
  return (
    <div className="md:hidden">
      <GroupLabel label="Selling channels" count={String(channels.length).padStart(2, '0')} />
      <ul className="grid grid-cols-2 gap-2">
        {channels.map(({ label, kind, Icon }) => (
          <li key={label} className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-surface px-3 py-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-ice/20 bg-ice/[0.08] text-ice">
              <Icon className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm leading-snug text-fg">{label}</span>
              <span className="block font-mono text-[0.58rem] tracking-[0.12em] text-fg-subtle uppercase">{kind}</span>
            </span>
          </li>
        ))}
      </ul>

      <FlowConnector />

      <div className="relative overflow-hidden rounded-2xl border border-signal/45 bg-[linear-gradient(180deg,rgba(255,107,61,0.15),rgba(255,107,61,0.03))] p-5 shadow-[0_24px_60px_-32px_rgba(255,107,61,0.7)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 size-56 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.28),transparent)]"
        />
        <p className="label relative flex items-center gap-2 text-signal-soft">
          <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
          Order hub
        </p>
        <p className="relative mt-2 font-display text-2xl font-semibold tracking-tight text-fg">WinqoHub</p>
        <ul className="relative mt-3 flex flex-wrap gap-1.5">
          {hubFacets.map((f) => (
            <li key={f} className="rounded-md border border-line-strong bg-white/[0.035] px-2 py-0.5 text-xs text-fg-muted">
              {f}
            </li>
          ))}
        </ul>
        <div className="relative mt-4 flex items-center gap-3 border-t border-line pt-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-ice/25 bg-ice/[0.08] text-ice">
            <Sparkles className="size-4" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ice uppercase">AI · OpenAI API</p>
            <p className="text-sm text-fg">NL reporting · agents</p>
          </div>
        </div>
      </div>

      <FlowConnector />

      <GroupLabel label="Couriers" count={`${COURIER_TOTAL}+`} />
      <ul className="flex flex-wrap gap-2">
        {courierNames.map((c) => (
          <li key={c} className="flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-2.5 py-1.5 text-sm text-fg">
            <Truck className="size-3 text-signal-soft" strokeWidth={1.9} aria-hidden="true" />
            {c}
          </li>
        ))}
        <li className="rounded-lg border border-dashed border-line-strong px-2.5 py-1.5 text-sm text-fg-muted">+ {moreCouriers}</li>
      </ul>

      <div className="mt-7">
        <GroupLabel label="Notify" />
        <ul className="grid grid-cols-2 gap-2">
          {notifyItems.map(({ label, sub, Icon }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-surface px-3 py-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-line-strong bg-white/[0.04] text-fg-muted">
                <Icon className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm leading-snug text-fg">{label}</span>
                <span className="block font-mono text-[0.58rem] tracking-[0.1em] text-fg-subtle uppercase">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function IntegrationMap() {
  const [active, setActive] = useState<Active>(null)
  const route = active ? ROUTES[active] : null

  return (
    <figure className="surface edge-signal overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-5 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_8px_rgba(255,107,61,0.8)]" />
          <span className="label">WinqoHub · integration map</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span
            aria-hidden="true"
            className={`hidden font-mono text-[0.64rem] tracking-[0.06em] transition-colors duration-300 md:inline ${
              route ? 'text-signal-soft' : 'text-fg-subtle'
            }`}
          >
            {route ?? 'Hover a node to trace its route'}
          </span>
          <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em] text-fg-subtle uppercase">
            Illustrative
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="hidden md:block" onPointerLeave={() => setActive(null)}>
          <MapSvg active={active} onActive={setActive} />
        </div>
        <MapFlow />
      </div>

      <figcaption className="flex flex-col gap-3 border-t border-line px-5 py-3.5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <span className="text-xs leading-relaxed text-fg-subtle">
          Channels, couriers and AI I’ve integrated into WinqoHub. A simplified illustration, not a system diagram.
        </span>
        <ul aria-hidden="true" className="hidden shrink-0 items-center gap-4 md:flex">
          <li className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.1em] text-fg-subtle uppercase">
            <span className="h-px w-5 bg-gradient-to-r from-ice to-signal" />
            Order flow
          </li>
          <li className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.1em] text-fg-subtle uppercase">
            <span className="w-5 border-t border-dashed border-ice/70" />
            AI layer
          </li>
        </ul>
      </figcaption>
    </figure>
  )
}
