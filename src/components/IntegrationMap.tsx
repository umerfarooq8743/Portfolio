/**
 * Illustrative diagram of the integration landscape Umer works in at i-Splendid:
 * selling channels feed orders into an order hub, which books shipments with couriers
 * and sends notifications. It depicts *which* services are integrated — not any
 * internal architecture.
 */

const sources = ['Shopify', 'WooCommerce', 'Daraz', 'Splendid Accounts'].map((label, i) => ({ label, y: 82 + i * 42 }))
const SOURCE_W = 134
const couriers = ['BlueEx', 'TCS', 'Leopards', 'PostEx', 'M&P', 'Call Courier Trax', '+ more'].map((label, i) => ({
  label,
  y: 34 + i * 40,
}))
const notify = [
  { label: 'Email', sub: 'SMTP', x: 170 },
  { label: 'SMS', sub: 'gateway', x: 256 },
]

const HUB = { x: 180, y: 114, w: 128, h: 86 }
const HUB_CY = HUB.y + HUB.h / 2
const COURIER_X = 352
const COURIER_W = 124

const sourcePaths = sources.map((s, i) => {
  const cy = s.y + 15
  const ty = HUB_CY - 15 + i * 10
  return `M${4 + SOURCE_W} ${cy} C${4 + SOURCE_W + 22} ${cy} ${HUB.x - 22} ${ty} ${HUB.x} ${ty}`
})
const courierPaths = couriers.map((c) => {
  const cy = c.y + 14
  return `M${HUB.x + HUB.w} ${HUB_CY} C${HUB.x + HUB.w + 24} ${HUB_CY} ${COURIER_X - 22} ${cy} ${COURIER_X} ${cy}`
})
const notifyPaths = notify.map((n, i) => {
  const sx = HUB.x + 44 + i * 40
  const tx = n.x + 37
  return `M${sx} ${HUB.y + HUB.h} C${sx} 252 ${tx} 252 ${tx} 300`
})

// A handful of packets — enough to suggest flow without becoming noise.
const packets = [
  { d: sourcePaths[0], dur: 3.2, begin: 0 },
  { d: sourcePaths[2], dur: 3.2, begin: 1.6 },
  { d: sourcePaths[3], dur: 3.2, begin: 2.6 },
  { d: courierPaths[1], dur: 2.8, begin: 0.9 },
  { d: courierPaths[3], dur: 2.8, begin: 2.2 },
  { d: courierPaths[5], dur: 2.8, begin: 3.4 },
  { d: notifyPaths[0], dur: 2.4, begin: 1.4 },
]

export function IntegrationMap() {
  return (
    <figure className="card overflow-hidden p-0 shadow-[0_40px_120px_-40px_rgba(99,102,241,0.35)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <span className="eyebrow">Integration map</span>
        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-fg-subtle uppercase">
          Illustrative
        </span>
      </div>

      <div className="px-3 pt-4 pb-2 sm:px-5">
        <svg
          viewBox="0 0 480 340"
          className="h-auto w-full"
          role="img"
          aria-labelledby="map-title map-desc"
        >
          <title id="map-title">Order flow integrations</title>
          <desc id="map-desc">
            Orders from Shopify, WooCommerce, Daraz and Splendid Accounts flow into an order hub, which books
            shipments through more than 20 couriers including BlueEx, TCS, Leopards, PostEx, M&amp;P and Call Courier
            Trax, and sends email and SMS notifications. An AI layer on the OpenAI API adds natural-language reporting
            and AI agents.
          </desc>
          <defs>
            <linearGradient id="hub-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="hub-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="packet-glow">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Column labels */}
          <g fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em" fill="#7c7c90">
            <text x="4" y="70">SELLING CHANNELS</text>
            <text x={COURIER_X} y="22">COURIERS · 20+</text>
            <text x="160" y="319" textAnchor="end">
              NOTIFY
            </text>
          </g>

          {/* Connectors */}
          <g fill="none" stroke="rgba(165,180,252,0.22)" strokeWidth="1.2">
            {[...sourcePaths, ...courierPaths, ...notifyPaths].map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* Source nodes */}
          {sources.map((s) => (
            <g key={s.label}>
              <rect x="4" y={s.y} width={SOURCE_W} height="30" rx="8" fill="#111119" stroke="rgba(255,255,255,0.12)" />
              <circle cx="17" cy={s.y + 15} r="3" fill="#5eead4" />
              <text x="27" y={s.y + 19.5} fontSize="12" fill="#ececf1" fontFamily="var(--font-sans)">
                {s.label}
              </text>
            </g>
          ))}

          {/* AI layer (natural-language reporting + agents) */}
          <g>
            <path
              d={`M${HUB.x + HUB.w / 2} 76 L${HUB.x + HUB.w / 2} ${HUB.y}`}
              stroke="rgba(94,234,212,0.45)"
              strokeDasharray="3 3"
              fill="none"
            />
            <rect x={HUB.x} y="38" width={HUB.w} height="38" rx="9" fill="rgba(94,234,212,0.06)" stroke="rgba(94,234,212,0.4)" />
            <text x={HUB.x + 12} y="53" fontSize="9" letterSpacing="0.08em" fill="#5eead4" fontFamily="var(--font-mono)">
              AI · OPENAI API
            </text>
            <text x={HUB.x + 12} y="68" fontSize="10.5" fill="#d4d4de" fontFamily="var(--font-sans)">
              NL reporting · agents
            </text>
          </g>

          {/* Hub */}
          <g>
            <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="12" fill="url(#hub-fill)" stroke="url(#hub-stroke)" />
            <text x={HUB.x + 14} y={HUB.y + 24} fontSize="9.5" letterSpacing="0.08em" fill="#a5b4fc" fontFamily="var(--font-mono)">
              ORDER HUB
            </text>
            <text x={HUB.x + 14} y={HUB.y + 47} fontSize="16" fontWeight="600" fill="#ffffff" fontFamily="var(--font-sans)">
              ShipKardo
            </text>
            <text x={HUB.x + 14} y={HUB.y + 68} fontSize="9.5" fill="#a1a1b3" fontFamily="var(--font-sans)">
              orders · products · stock
            </text>
          </g>

          {/* Courier nodes */}
          {couriers.map((c) => (
            <g key={c.label}>
              <rect
                x={COURIER_X}
                y={c.y}
                width={COURIER_W}
                height="28"
                rx="7"
                fill={c.label === '+ more' ? 'transparent' : '#111119'}
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray={c.label === '+ more' ? '3 3' : undefined}
              />
              <text
                x={COURIER_X + 12}
                y={c.y + 18.5}
                fontSize="12"
                fill={c.label === '+ more' ? '#a1a1b3' : '#d4d4de'}
                fontFamily="var(--font-sans)"
              >
                {c.label}
              </text>
            </g>
          ))}

          {/* Notification nodes */}
          {notify.map((n) => (
            <g key={n.label}>
              <rect x={n.x} y="300" width="74" height="30" rx="7" fill="#111119" stroke="rgba(255,255,255,0.1)" />
              <text x={n.x + 10} y="319.5" fontSize="12" fill="#d4d4de" fontFamily="var(--font-sans)">
                {n.label}
                <tspan fill="#7c7c90" fontSize="9.5" fontFamily="var(--font-mono)" dx="5">
                  {n.sub}
                </tspan>
              </text>
            </g>
          ))}

          {/* Moving packets (hidden for reduced motion) */}
          {packets.map((p, i) => (
            <g key={i} className="packet">
              <circle r="6" fill="url(#packet-glow)" opacity="0">
                <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={p.d} />
                <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
              </circle>
              <circle r="2" fill="#e0e7ff" opacity="0">
                <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" path={p.d} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>
      </div>

      <figcaption className="border-t border-line px-4 py-3 text-xs leading-relaxed text-fg-subtle sm:px-5">
        Channels, couriers and AI I’ve integrated into ShipKardo. A simplified illustration, not a system diagram.
      </figcaption>
    </figure>
  )
}
