// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { parseCount } from '../lib/count'
import { experience, navItems, profile, projects, stats } from './profile'

const isHttps = (href: string) => {
  const u = new URL(href)
  return u.protocol === 'https:' && !!u.hostname
}

describe('projects', () => {
  it('have unique, kebab-case ids', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  })

  it('have one lead case study, then features, then the index list', () => {
    const tiers = projects.map((p) => p.tier)
    expect(tiers.filter((t) => t === 'lead')).toHaveLength(1)
    expect(tiers[0]).toBe('lead')
    // array order drives the 01, 02… numbering, so tiers must not interleave
    const rank = { lead: 0, feature: 1, index: 2 } as const
    for (let i = 1; i < tiers.length; i++) expect(rank[tiers[i]]).toBeGreaterThanOrEqual(rank[tiers[i - 1]])
  })

  it('fill the feature grid evenly at two and three columns', () => {
    expect(projects.filter((p) => p.tier === 'feature').length % 6).toBe(0)
  })

  it.each(projects.map((p) => [p.name, p] as const))('%s has a complete case study', (_, p) => {
    expect(p.name.trim()).not.toBe('')
    expect(p.problem.length).toBeGreaterThan(40)
    expect(p.summary.length).toBeGreaterThan(80)
    expect(p.highlights.length).toBeGreaterThanOrEqual(3)
    expect(p.stack.length).toBeGreaterThanOrEqual(4)
    expect(new Set(p.stack).size).toBe(p.stack.length)
    expect(p.caseStudy.overview.length).toBeGreaterThan(200)
    expect(p.caseStudy.contribution.length).toBeGreaterThanOrEqual(3)
    expect(p.caseStudy.note.trim()).not.toBe('')
    if (p.formerly) expect(p.formerly).not.toBe(p.name)
    if (p.caseStudy.flow) expect(p.caseStudy.flow.steps.length).toBeGreaterThanOrEqual(3)
    for (const c of p.caseStudy.capabilities ?? []) expect(c.items.length).toBeGreaterThan(0)
    for (const a of p.caseStudy.architecture ?? []) expect(a.detail.length).toBeGreaterThan(20)
  })

  it.each(projects.filter((p) => p.metrics).map((p) => [p.name, p.metrics!] as const))(
    '%s has distinct, readable metrics',
    (_, metrics) => {
      expect(metrics.length).toBeGreaterThanOrEqual(3)
      expect(new Set(metrics.map((m) => m.label)).size).toBe(metrics.length)
      for (const m of metrics) {
        expect(m.value.trim()).not.toBe('')
        // anything that starts with a digit must count up to its real value
        if (/^\d/.test(m.value)) expect(parseCount(m.value), m.value).not.toBeNull()
      }
    },
  )

  it('link only to absolute https URLs with a label', () => {
    for (const p of projects) {
      for (const l of p.links) {
        expect(l.label.trim(), p.id).not.toBe('')
        expect(isHttps(l.href), l.href).toBe(true)
      }
    }
  })

  it.each([
    ['winqohub', 'https://winqoai.com/hub/'],
    ['splendid-accounts', 'https://splendidaccounts.com/'],
    ['manifest-erp', 'https://app-manifest-erp.vercel.app/'],
    ['vantra-erp', 'https://app-vantra-erp.vercel.app/'],
    ['atelier-one', 'https://app-atelier-one.vercel.app/'],
    ['toolnest', 'https://app-toolnest.vercel.app/'],
    ['alam-pakwan-house', 'https://app-alam-pakwan-house.vercel.app/'],
  ])('%s links to its live site', (id, href) => {
    expect(projects.find((p) => p.id === id)?.links.map((l) => l.href)).toContain(href)
  })

  it('uses the current product names', () => {
    const names = projects.map((p) => p.name)
    expect(names).toContain('Toolnest')
    expect(names).not.toContain('Atlas Workspace')
    expect(projects.find((p) => p.id === 'toolnest')?.formerly).toBe('Atlas Workspace')
  })
})

describe('headline stats', () => {
  it('count every product in the portfolio', () => {
    expect(stats.find((s) => s.label === 'Products & platforms built')?.value).toBe(String(projects.length))
  })

  it('are all distinct and non-empty', () => {
    expect(new Set(stats.map((s) => s.label)).size).toBe(stats.length)
    for (const s of stats) expect(s.value.trim()).not.toBe('')
  })
})

describe('experience', () => {
  it('runs newest first with valid start months', () => {
    const starts = experience.map((r) => r.start)
    for (const s of starts) expect(s).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/)
    expect([...starts].sort().reverse()).toEqual(starts)
  })

  it('has exactly one current role', () => {
    expect(experience.filter((r) => r.current)).toHaveLength(1)
  })

  it('links client sites over https, including Summit Diagnostix', () => {
    const sites = experience.flatMap((r) => r.sites ?? [])
    for (const s of sites) if (s.url) expect(isHttps(s.url), s.url).toBe(true)
    expect(sites.find((s) => s.name === 'Summit Diagnostix')?.url).toBe('https://summitdiagnostix.com/')
  })
})

describe('profile', () => {
  it('has working contact links', () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/)
    for (const href of Object.values(profile.links)) expect(isHttps(href), href).toBe(true)
    expect(profile.cv).toMatch(/^\/.+\.pdf$/)
  })

  it('has unique navigation targets', () => {
    const ids = navItems.map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
