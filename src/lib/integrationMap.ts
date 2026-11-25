/**
 * Model for the WinqoHub integration map: the services shown, the SVG geometry
 * (viewBox units) and the hover-tracing rules. Kept free of React so layout and
 * routing can be unit- and mutation-tested directly.
 */
import {
  Calculator,
  Mail,
  MessageSquareText,
  ShoppingBag,
  ShoppingCart,
  Store,
  type LucideIcon,
} from 'lucide-react'

/* ---------- data ---------- */
export const channels: readonly { label: string; kind: string; Icon: LucideIcon }[] = [
  { label: 'Shopify', kind: 'Storefront', Icon: ShoppingBag },
  { label: 'WooCommerce', kind: 'Storefront', Icon: ShoppingCart },
  { label: 'Daraz', kind: 'Marketplace', Icon: Store },
  { label: 'Splendid Accounts', kind: 'Accounting', Icon: Calculator },
]
export const courierNames: readonly string[] = ['BlueEx', 'TCS', 'Leopards', 'PostEx', 'M&P', 'Call Courier Trax']
export const COURIER_TOTAL = 20
export const moreCouriers = `${COURIER_TOTAL - courierNames.length} more`
export const hubFacets: readonly string[] = ['orders', 'products', 'stock']
export const notifyItems: readonly { label: string; sub: string; Icon: LucideIcon }[] = [
  { label: 'Email', sub: 'SMTP', Icon: Mail },
  { label: 'SMS', sub: 'Monty Mobile', Icon: MessageSquareText },
]

/* ---------- geometry (viewBox units) ---------- */
export const W = 680
export const H = 356
/** Top of the visible viewBox — crops the empty band above the column headers. */
export const VIEW_TOP = 18
/** First row of both side columns. */
export const TOP = 56
/** Column header baseline. */
export const HEAD_Y = 34
export const CH = { x: 12, w: 168, h: 44, step: 80 }
export const CO = { x: 500, w: 168, h: 32, step: 42 }
export const HUB = { x: 244, y: 138, w: 192, h: 120 }
export const HUB_CX = HUB.x + HUB.w / 2
export const HUB_CY = HUB.y + HUB.h / 2
export const AI = { x: 248, y: 56, w: 184, h: 46 }
export const NT = { y: 302, w: 120, h: 42, gap: 12 }

export const PORT = {
  in: { x: HUB.x, y: HUB_CY },
  out: { x: HUB.x + HUB.w, y: HUB_CY },
  up: { x: HUB_CX, y: HUB.y },
  down: { x: HUB_CX, y: HUB.y + HUB.h },
}

export const chNodes = channels.map((c, i) => {
  const y = TOP + i * CH.step
  return { ...c, id: `ch-${i}`, y, cy: y + CH.h / 2, route: `${c.label} → WinqoHub → couriers` }
})
export const coNodes = [...courierNames, moreCouriers].map((label, i) => {
  const y = TOP + i * CO.step
  const more = i === courierNames.length
  return {
    label,
    id: `co-${i}`,
    y,
    cy: y + CO.h / 2,
    more,
    route: `Channels → WinqoHub → ${more ? `${label} couriers` : label}`,
  }
})
export const ntNodes = notifyItems.map((n, i) => {
  const x = i === 0 ? HUB_CX - NT.gap / 2 - NT.w : HUB_CX + NT.gap / 2
  return { ...n, id: `nt-${i}`, x, cx: x + NT.w / 2, route: `Channels → WinqoHub → ${n.label} · ${n.sub}` }
})

/** Human-readable route for every hoverable node, shown in the map header. */
export const ROUTES: Readonly<Record<string, string>> = {
  hub: `${channels.length} channels → WinqoHub → ${COURIER_TOTAL}+ couriers`,
  ai: 'WinqoHub ⇄ OpenAI API',
  ...Object.fromEntries([...chNodes, ...coNodes, ...ntNodes].map((n) => [n.id, n.route])),
}

/* ---------- hub facet chips ---------- */
export const CHIP = { charWidth: 5.4, padding: 14, gap: 5, inset: 16 }
const chipWidths = hubFacets.map((t) => t.length * CHIP.charWidth + CHIP.padding)
export const chips = hubFacets.map((t, i) => ({
  t,
  w: chipWidths[i],
  x: HUB.x + CHIP.inset + chipWidths.slice(0, i).reduce((sum, w) => sum + w + CHIP.gap, 0),
}))

/* ---------- wires ---------- */
/** Rounds to 2 decimals so path data carries no floating-point noise (55.00000000000001). */
export const r2 = (n: number) => Math.round(n * 100) / 100

/** Horizontal S-curve: leaves and enters horizontally. */
export const hCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const k = (x2 - x1) * 0.55
  return `M${x1} ${y1} C${r2(x1 + k)} ${y1} ${r2(x2 - k)} ${y2} ${x2} ${y2}`
}
/** Vertical S-curve: leaves and enters vertically. */
export const vCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const k = (y2 - y1) * 0.55
  return `M${x1} ${y1} C${x1} ${r2(y1 + k)} ${x2} ${r2(y2 - k)} ${x2} ${y2}`
}

/** Staggered launch order so traffic reads as organic, not a metronome. */
const courierOrder = [0, 4, 2, 6, 1, 5, 3]

export interface Link {
  owner: string
  d: string
  stroke: string
  /** Seconds for one comet cycle. */
  dur: number
  /** Negative delay so the map starts mid-flow. */
  delay: number
}

export const links: readonly Link[] = [
  ...chNodes.map((n, i) => ({
    owner: n.id,
    d: hCurve(CH.x + CH.w, n.cy, PORT.in.x, PORT.in.y),
    stroke: 'url(#imap-in)',
    dur: 4.6,
    delay: -i * 1.15,
  })),
  ...coNodes.map((n, i) => ({
    owner: n.id,
    d: hCurve(PORT.out.x, PORT.out.y, CO.x, n.cy),
    stroke: 'url(#imap-out)',
    dur: 4.2,
    delay: -0.4 - courierOrder[i] * 0.6,
  })),
  ...ntNodes.map((n, i) => ({
    owner: n.id,
    d: vCurve(PORT.down.x, PORT.down.y, n.cx, NT.y),
    stroke: 'url(#imap-down)',
    dur: 5,
    delay: -1.2 - i * 2.5,
  })),
]

/* ---------- hover tracing ---------- */
export type NodeKind = 'ch' | 'co' | 'nt' | 'ai' | 'hub'

export const kindOf = (id: string) => id.split('-')[0] as NodeKind

/**
 * Is `id` on the route through `active`? Hovering a channel lights every
 * courier and notification it can reach; hovering a courier or notification
 * lights every channel that feeds it. The hub is on every route.
 */
export function isLit(active: string, id: string): boolean {
  if (active === 'hub' || id === 'hub' || id === active) return true
  const a = kindOf(active)
  const k = kindOf(id)
  if (a === 'ch') return k === 'co' || k === 'nt'
  if (a === 'co' || a === 'nt') return k === 'ch'
  return false
}

/** `data-state` for a node or wire: undefined while nothing is hovered. */
export function nodeState(active: string | null, id: string): 'on' | 'off' | undefined {
  if (!active) return undefined
  return isLit(active, id) ? 'on' : 'off'
}
