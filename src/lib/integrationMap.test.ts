// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  AI,
  CH,
  CHIP,
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
  TOP,
  VIEW_TOP,
  W,
  channels,
  chNodes,
  chips,
  coNodes,
  courierNames,
  hCurve,
  hubFacets,
  isLit,
  kindOf,
  links,
  moreCouriers,
  nodeState,
  notifyItems,
  ntNodes,
  vCurve,
  r2,
} from './integrationMap'

interface Box {
  id: string
  x: number
  y: number
  w: number
  h: number
}

const cards: Box[] = [
  ...chNodes.map((n) => ({ id: n.id, x: CH.x, y: n.y, w: CH.w, h: CH.h })),
  ...coNodes.map((n) => ({ id: n.id, x: CO.x, y: n.y, w: CO.w, h: CO.h })),
  ...ntNodes.map((n) => ({ id: n.id, x: n.x, y: NT.y, w: NT.w, h: NT.h })),
  { id: 'hub', ...HUB },
  { id: 'ai', ...AI },
]

const overlaps = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h

/** First and last point of an SVG path built by hCurve / vCurve. */
const endpoints = (d: string) => {
  const n = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
  return { start: { x: n[0], y: n[1] }, end: { x: n[n.length - 2], y: n[n.length - 1] } }
}

describe('integration map content', () => {
  it('shows the integrated services', () => {
    expect(channels.map((c) => c.label)).toEqual(['Shopify', 'WooCommerce', 'Daraz', 'Splendid Accounts'])
    expect(channels.map((c) => c.kind)).toEqual(['Storefront', 'Storefront', 'Marketplace', 'Accounting'])
    expect(courierNames).toEqual(['BlueEx', 'TCS', 'Leopards', 'PostEx', 'M&P', 'Call Courier Trax'])
    expect(notifyItems.map((n) => `${n.label} · ${n.sub}`)).toEqual(['Email · SMTP', 'SMS · Monty Mobile'])
    expect(hubFacets).toEqual(['orders', 'products', 'stock'])
  })

  it('derives the "more couriers" card from the published total', () => {
    expect(COURIER_TOTAL).toBe(20)
    expect(moreCouriers).toBe('14 more')
    expect(coNodes).toHaveLength(courierNames.length + 1)
    expect(coNodes.filter((n) => n.more).map((n) => n.label)).toEqual(['14 more'])
    expect(coNodes.at(-1)?.more).toBe(true)
  })

  it('gives every node a unique, typed id', () => {
    const ids = cards.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(chNodes.map((n) => n.id)).toEqual(['ch-0', 'ch-1', 'ch-2', 'ch-3'])
    expect(ntNodes.map((n) => n.id)).toEqual(['nt-0', 'nt-1'])
    expect(coNodes.map((n) => n.id)).toEqual(['co-0', 'co-1', 'co-2', 'co-3', 'co-4', 'co-5', 'co-6'])
  })
})

describe('integration map layout', () => {
  it('keeps every card inside the visible viewBox', () => {
    for (const c of cards) {
      expect(c.x, c.id).toBeGreaterThanOrEqual(0)
      expect(c.x + c.w, c.id).toBeLessThanOrEqual(W)
      expect(c.y, c.id).toBeGreaterThanOrEqual(VIEW_TOP)
      expect(c.y + c.h, c.id).toBeLessThanOrEqual(H)
    }
  })

  it('never overlaps two cards', () => {
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        expect(overlaps(cards[i], cards[j]), `${cards[i].id} × ${cards[j].id}`).toBe(false)
      }
    }
  })

  it('is mirror-symmetric around the hub', () => {
    expect(HUB_CX).toBe(W / 2)
    expect(CH.x).toBe(W - (CO.x + CO.w))
    expect(CH.w).toBe(CO.w)
    expect(PORT.in.x - (CH.x + CH.w)).toBe(CO.x - PORT.out.x)
    expect(AI.x + AI.w / 2).toBe(HUB_CX)
  })

  it('starts both columns on the same row and centres them on the hub', () => {
    expect(chNodes[0].y).toBe(TOP)
    expect(coNodes[0].y).toBe(TOP)
    expect((chNodes[0].cy + chNodes.at(-1)!.cy) / 2).toBe(HUB_CY)
    expect((coNodes[0].cy + coNodes.at(-1)!.cy) / 2).toBe(HUB_CY)
    // both columns end on the same baseline
    expect(chNodes.at(-1)!.y + CH.h).toBe(coNodes.at(-1)!.y + CO.h)
  })

  it('spaces each column evenly with a visible gap', () => {
    for (const [list, step, h] of [
      [chNodes, CH.step, CH.h],
      [coNodes, CO.step, CO.h],
    ] as const) {
      list.forEach((n, i) => {
        expect(n.y).toBe(TOP + i * step)
        expect(n.cy).toBe(n.y + h / 2)
      })
      expect(step).toBeGreaterThan(h)
    }
  })

  it('places the column headers above the first row', () => {
    expect(HEAD_Y).toBeGreaterThan(VIEW_TOP)
    expect(HEAD_Y).toBeLessThan(TOP)
  })

  it('places the notification cards symmetrically under the hub', () => {
    const [left, right] = ntNodes
    expect(HUB_CX - (left.x + NT.w)).toBe(NT.gap / 2)
    expect(right.x - HUB_CX).toBe(NT.gap / 2)
    expect(left.cx).toBe(left.x + NT.w / 2)
    expect(NT.y).toBeGreaterThan(HUB.y + HUB.h)
  })

  it('fits the facet chips inside the hub, left to right, evenly spaced', () => {
    expect(chips.map((c) => c.t)).toEqual([...hubFacets])
    expect(chips[0].x).toBe(HUB.x + CHIP.inset)
    chips.forEach((c) => expect(c.w).toBe(c.t.length * CHIP.charWidth + CHIP.padding))
    for (let i = 1; i < chips.length; i++) {
      expect(chips[i].x - (chips[i - 1].x + chips[i - 1].w)).toBeCloseTo(CHIP.gap)
    }
    const last = chips.at(-1)!
    expect(last.x + last.w).toBeLessThanOrEqual(HUB.x + HUB.w - CHIP.inset)
  })

  it('puts the four hub ports on the middle of each edge', () => {
    expect(PORT.in).toEqual({ x: HUB.x, y: HUB_CY })
    expect(PORT.out).toEqual({ x: HUB.x + HUB.w, y: HUB_CY })
    expect(PORT.up).toEqual({ x: HUB_CX, y: HUB.y })
    expect(PORT.down).toEqual({ x: HUB_CX, y: HUB.y + HUB.h })
  })
})

describe('wire curves', () => {
  it('hCurve leaves and enters horizontally', () => {
    expect(hCurve(0, 0, 100, 50)).toBe('M0 0 C55 0 45 50 100 50')
    expect(hCurve(10, 20, 30, 40)).toBe('M10 20 C21 20 19 40 30 40')
  })

  it('vCurve leaves and enters vertically', () => {
    expect(vCurve(0, 0, 50, 100)).toBe('M0 0 C0 55 50 45 50 100')
    expect(vCurve(5, 10, 25, 30)).toBe('M5 10 C5 21 25 19 25 30')
  })

  it('rounds control points to two decimals', () => {
    expect(r2(55.00000000000001)).toBe(55)
    expect(r2(1.005)).toBe(1)
    expect(r2(2.345)).toBe(2.35)
    expect(r2(-3.14159)).toBe(-3.14)
    expect(hCurve(0, 0, 1, 1)).toBe('M0 0 C0.55 0 0.45 1 1 1')
  })

  it('never emits floating-point noise in path data', () => {
    for (const l of links) expect(l.d, l.owner).not.toMatch(/\d\.\d{3,}/)
  })
})

describe('wires between nodes', () => {
  it('connects every node except the hub and AI exactly once', () => {
    const owners = links.map((l) => l.owner)
    expect(new Set(owners).size).toBe(owners.length)
    expect(owners.sort()).toEqual([...chNodes, ...coNodes, ...ntNodes].map((n) => n.id).sort())
  })

  it('runs channel wires from the card edge into the hub input port', () => {
    for (const n of chNodes) {
      const { start, end } = endpoints(links.find((l) => l.owner === n.id)!.d)
      expect(start).toEqual({ x: CH.x + CH.w, y: n.cy })
      expect(end).toEqual(PORT.in)
    }
  })

  it('runs courier wires from the hub output port to each card', () => {
    for (const n of coNodes) {
      const { start, end } = endpoints(links.find((l) => l.owner === n.id)!.d)
      expect(start).toEqual(PORT.out)
      expect(end).toEqual({ x: CO.x, y: n.cy })
    }
  })

  it('runs notification wires from the hub bottom port to the top of each card', () => {
    for (const n of ntNodes) {
      const { start, end } = endpoints(links.find((l) => l.owner === n.id)!.d)
      expect(start).toEqual(PORT.down)
      expect(end).toEqual({ x: n.cx, y: NT.y })
    }
  })

  it('colours wires by direction', () => {
    expect(new Set(links.filter((l) => kindOf(l.owner) === 'ch').map((l) => l.stroke))).toEqual(new Set(['url(#imap-in)']))
    expect(new Set(links.filter((l) => kindOf(l.owner) === 'co').map((l) => l.stroke))).toEqual(new Set(['url(#imap-out)']))
    expect(new Set(links.filter((l) => kindOf(l.owner) === 'nt').map((l) => l.stroke))).toEqual(new Set(['url(#imap-down)']))
  })

  it('uses the tuned traffic timings', () => {
    const delays = (kind: string) => links.filter((l) => kindOf(l.owner) === kind).map((l) => Number(l.delay.toFixed(2)))
    expect(delays('ch')).toEqual([0, -1.15, -2.3, -3.45])
    expect(delays('co')).toEqual([-0.4, -2.8, -1.6, -4, -1, -3.4, -2.2])
    expect(delays('nt')).toEqual([-1.2, -3.7])
  })

  it('starts traffic mid-flow with staggered, non-repeating timings', () => {
    for (const l of links) {
      expect(l.dur).toBeGreaterThan(0)
      expect(l.delay).toBeLessThanOrEqual(0)
      expect(-l.delay).toBeLessThan(l.dur * 3)
    }
    const courierDelays = links.filter((l) => kindOf(l.owner) === 'co').map((l) => l.delay)
    expect(new Set(courierDelays).size).toBe(courierDelays.length)
    expect(courierDelays).not.toEqual([...courierDelays].sort((a, b) => b - a)) // not a plain top-to-bottom sweep
  })
})

describe('hover tracing', () => {
  it('reads the node kind from its id', () => {
    expect(kindOf('ch-3')).toBe('ch')
    expect(kindOf('co-0')).toBe('co')
    expect(kindOf('nt-1')).toBe('nt')
    expect(kindOf('hub')).toBe('hub')
    expect(kindOf('ai')).toBe('ai')
  })

  it.each([
    // active, id, lit?
    ['hub', 'ch-0', true],
    ['hub', 'co-4', true],
    ['hub', 'ai', true],
    ['ch-1', 'ch-1', true],
    ['ch-1', 'hub', true],
    ['ch-1', 'co-2', true],
    ['ch-1', 'nt-0', true],
    ['ch-1', 'ch-2', false],
    ['ch-1', 'ai', false],
    ['co-2', 'ch-3', true],
    ['co-2', 'co-3', false],
    ['co-2', 'nt-1', false],
    ['co-2', 'ai', false],
    ['nt-0', 'ch-0', true],
    ['nt-0', 'nt-1', false],
    ['nt-0', 'co-0', false],
    ['ai', 'ai', true],
    ['ai', 'hub', true],
    ['ai', 'ch-0', false],
    ['ai', 'co-0', false],
  ] as const)('active %s → %s is lit: %s', (active, id, lit) => {
    expect(isLit(active, id)).toBe(lit)
  })

  it('reports no state while nothing is hovered', () => {
    expect(nodeState(null, 'ch-0')).toBeUndefined()
    expect(nodeState(null, 'hub')).toBeUndefined()
  })

  it('reports on / off while a node is hovered', () => {
    expect(nodeState('co-1', 'ch-0')).toBe('on')
    expect(nodeState('co-1', 'co-2')).toBe('off')
  })
})

describe('route readout', () => {
  it('has a route for every hoverable node', () => {
    for (const c of cards) expect(ROUTES[c.id], c.id).toBeTruthy()
  })

  it('describes each route in plain words', () => {
    expect(ROUTES.hub).toBe('4 channels → WinqoHub → 20+ couriers')
    expect(ROUTES.ai).toBe('WinqoHub ⇄ OpenAI API')
    expect(ROUTES['ch-0']).toBe('Shopify → WinqoHub → couriers')
    expect(ROUTES['co-2']).toBe('Channels → WinqoHub → Leopards')
    expect(ROUTES['co-6']).toBe('Channels → WinqoHub → 14 more couriers')
    expect(ROUTES['nt-1']).toBe('Channels → WinqoHub → SMS · Monty Mobile')
  })
})
