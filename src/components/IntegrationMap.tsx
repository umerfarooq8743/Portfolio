/**
 * Illustrative diagram of the integrations around WinqoHub: selling channels
 * feed orders into the order hub, which books shipments with couriers and sends
 * notifications, with an AI layer on top. It shows *which* services are
 * integrated — not internal architecture.
 *
 * Desktop/tablet: SVG diagram. Mobile: the same information as a readable
 * vertical flow, so labels never shrink to illegible sizes.
 */

const channels = ['Shopify', 'WooCommerce', 'Daraz', 'Splendid Accounts']
const courierNames = ['BlueEx', 'TCS', 'Leopards', 'PostEx', 'M&P', 'Call Courier Trax']
const notifyItems = [
  { label: 'Email', sub: 'SMTP' },
  { label: 'SMS', sub: 'Monty Mobile' },
]

/* ---------- SVG geometry ---------- */
const sources = channels.map((label, i) => ({ label, y: 92 + i * 44 }))
const SOURCE_W = 150
const couriers = [...courierNames, '+ more'].map((label, i) => ({ label, y: 40 + i * 42 }))
const HUB = { x: 238, y: 140, w: 164, h: 100 }
const HUB_CY = HUB.y + HUB.h / 2
const COURIER_X = 492
const COURIER_W = 140
const NOTIFY_Y = 336
const notify = notifyItems.map((n, i) => ({ ...n, x: 226 + i * 98 }))

const sourcePaths = sources.map((s, i) => {
  const cy = s.y + 16
  const ty = HUB_CY - 21 + i * 14
  return `M${10 + SOURCE_W} ${cy} C${10 + SOURCE_W + 40} ${cy} ${HUB.x - 40} ${ty} ${HUB.x} ${ty}`
})
const courierPaths = couriers.map((c) => {
  const cy = c.y + 15
  return `M${HUB.x + HUB.w} ${HUB_CY} C${HUB.x + HUB.w + 44} ${HUB_CY} ${COURIER_X - 44} ${cy} ${COURIER_X} ${cy}`
})
const notifyPaths = notify.map((n, i) => {
  const sx = HUB.x + 52 + i * 60
  const tx = n.x + 44
  return `M${sx} ${HUB.y + HUB.h} C${sx} ${NOTIFY_Y - 40} ${tx} ${HUB.y + HUB.h + 40} ${tx} ${NOTIFY_Y}`
})

const packets = [
  { d: sourcePaths[0], dur: 3.6, begin: 0 },
  { d: sourcePaths[2], dur: 3.6, begin: 1.8 },
  { d: courierPaths[1], dur: 3.2, begin: 1 },
  { d: courierPaths[4], dur: 3.2, begin: 2.6 },
]

const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

function MapSvg() {
  return (
    <svg viewBox="0 0 642 380" className="h-auto w-full" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">WinqoHub integration map</title>
      <desc id="map-desc">
        Orders from Shopify, WooCommerce, Daraz and Splendid Accounts flow into the WinqoHub order hub, which books
        shipments through more than 20 couriers including BlueEx, TCS, Leopards, PostEx, M&amp;P and Call Courier Trax,
        and sends email and SMS notifications. An AI layer on the OpenAI API adds natural-language reporting and AI
        agents.
      </desc>

      <g fontFamily={mono} fontSize="9.5" letterSpacing="0.12em" fill="#827f78">
        <text x="10" y="78">SELLING CHANNELS</text>
        <text x={COURIER_X} y="26">COURIERS · 20+</text>
        <text x={notify[0].x - 12} y={NOTIFY_Y + 19} textAnchor="end">
          NOTIFY
        </text>
      </g>

      <g fill="none" stroke="rgba(243,241,236,0.14)" strokeWidth="1">
        {[...sourcePaths, ...courierPaths, ...notifyPaths].map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* AI layer */}
      <path d={`M${HUB.x + HUB.w / 2} 100 L${HUB.x + HUB.w / 2} ${HUB.y}`} stroke="rgba(169,193,255,0.5)" strokeDasharray="3 4" />
      <rect x={HUB.x} y="56" width={HUB.w} height="44" rx="10" fill="rgba(169,193,255,0.06)" stroke="rgba(169,193,255,0.35)" />
      <text x={HUB.x + 14} y="74" fontSize="9" letterSpacing="0.12em" fill="#a9c1ff" fontFamily={mono}>
        AI · OPENAI API
      </text>
      <text x={HUB.x + 14} y="90" fontSize="11.5" fill="#d9d6cf" fontFamily={sans}>
        NL reporting · agents
      </text>

      {/* Channels */}
      {sources.map((s) => (
        <g key={s.label}>
          <rect x="10" y={s.y} width={SOURCE_W} height="32" rx="8" fill="#131316" stroke="rgba(255,255,255,0.1)" />
          <circle cx="25" cy={s.y + 16} r="3" fill="#a9c1ff" />
          <text x="36" y={s.y + 20.5} fontSize="12.5" fill="#f3f1ec" fontFamily={sans}>
            {s.label}
          </text>
        </g>
      ))}

      {/* Hub */}
      <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="14" fill="rgba(255,107,61,0.08)" stroke="rgba(255,107,61,0.55)" />
      <text x={HUB.x + 16} y={HUB.y + 26} fontSize="9" letterSpacing="0.12em" fill="#ff9a72" fontFamily={mono}>
        ORDER HUB
      </text>
      <text x={HUB.x + 16} y={HUB.y + 54} fontSize="20" fontWeight="600" fill="#ffffff" fontFamily="var(--font-display)">
        WinqoHub
      </text>
      <text x={HUB.x + 16} y={HUB.y + 77} fontSize="11" fill="#a8a59e" fontFamily={sans}>
        orders · products · stock
      </text>

      {/* Couriers */}
      {couriers.map((c) => {
        const more = c.label === '+ more'
        return (
          <g key={c.label}>
            <rect
              x={COURIER_X}
              y={c.y}
              width={COURIER_W}
              height="30"
              rx="7"
              fill={more ? 'transparent' : '#131316'}
              stroke="rgba(255,255,255,0.1)"
              strokeDasharray={more ? '3 3' : undefined}
            />
            <text x={COURIER_X + 13} y={c.y + 19.5} fontSize="12" fill={more ? '#a8a59e' : '#e7e4dd'} fontFamily={sans}>
              {c.label}
            </text>
          </g>
        )
      })}

      {/* Notifications */}
      {notify.map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={NOTIFY_Y} width="88" height="30" rx="7" fill="#131316" stroke="rgba(255,255,255,0.1)" />
          <text x={n.x + 12} y={NOTIFY_Y + 19.5} fontSize="12" fill="#e7e4dd" fontFamily={sans}>
            {n.label}
            <tspan fill="#827f78" fontSize="9.5" fontFamily={mono} dx="6">
              {n.sub}
            </tspan>
          </text>
        </g>
      ))}

      {packets.map((p, i) => (
        <circle key={i} className="packet" r="2.5" fill="#ff9a72" opacity="0">
          <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={p.d} />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}

function FlowGroup({ label, items, tone }: { label: string; items: string[]; tone?: 'ice' }) {
  return (
    <div>
      <p className="label mb-3">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((it) => (
          <li
            key={it}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              tone === 'ice' ? 'border-ice/25 bg-ice/[0.06] text-ice' : 'border-line-strong bg-surface text-fg'
            }`}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FlowArrow() {
  return <span aria-hidden="true" className="mx-auto my-4 block h-8 w-px bg-gradient-to-b from-line-strong to-signal/60" />
}

/** Mobile: the same map as a vertical flow. */
function MapFlow() {
  return (
    <div className="md:hidden">
      <FlowGroup label="Selling channels" items={channels} />
      <FlowArrow />
      <div className="rounded-xl border border-signal/50 bg-signal/[0.07] p-4">
        <p className="label text-signal-soft">Order hub</p>
        <p className="mt-2 font-display text-xl font-semibold text-fg">WinqoHub</p>
        <p className="mt-1 text-sm text-fg-muted">orders · products · stock</p>
        <p className="mt-4 border-t border-line pt-3 text-sm text-ice">AI layer · NL reporting &amp; agents (OpenAI API)</p>
      </div>
      <FlowArrow />
      <FlowGroup label="Couriers · 20+" items={[...courierNames, '+ more']} />
      <div className="mt-6">
        <FlowGroup label="Notify" items={notifyItems.map((n) => `${n.label} · ${n.sub}`)} />
      </div>
    </div>
  )
}

export function IntegrationMap() {
  return (
    <figure className="surface overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
        <span className="label">WinqoHub · integration map</span>
        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.62rem] tracking-[0.1em] text-fg-subtle uppercase">
          Illustrative
        </span>
      </div>
      <div className="p-5 sm:p-8">
        <div className="hidden md:block">
          <MapSvg />
        </div>
        <MapFlow />
      </div>
      <figcaption className="border-t border-line px-5 py-3.5 text-xs leading-relaxed text-fg-subtle sm:px-6">
        Channels, couriers and AI I’ve integrated into WinqoHub. A simplified illustration, not a system diagram.
      </figcaption>
    </figure>
  )
}
