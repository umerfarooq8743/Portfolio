import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { projects } from '../data/profile'
import { Projects } from './Projects'

describe('Projects', () => {
  it('lists every project with its case-study button', () => {
    render(<Projects />)
    for (const p of projects) {
      expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument()
      expect(screen.getAllByRole('button', { name: `View case study: ${p.name}` }).length).toBeGreaterThan(0)
    }
  })

  it('numbers projects in reading order', () => {
    const { container } = render(<Projects />)
    const numbers = [...container.querySelectorAll('article p.label > span:first-child')].map((n) => n.textContent)
    expect(numbers).toEqual(projects.map((_, i) => String(i + 1).padStart(2, '0')))
  })

  it('opens every external link safely in a new tab', () => {
    render(<Projects />)
    const external = screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('http'))
    expect(external.length).toBeGreaterThanOrEqual(projects.filter((p) => p.links.length).length)
    for (const a of external) {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a.getAttribute('rel')).toContain('noopener')
      expect(a).toHaveTextContent('(opens in a new tab)')
    }
  })

  it('links the new and updated projects to their live sites', () => {
    render(<Projects />)
    for (const href of [
      'https://app-alam-pakwan-house.vercel.app/',
      'https://app-toolnest.vercel.app/',
      'https://app-atelier-one.vercel.app/',
      'https://app-manifest-erp.vercel.app/',
      'https://app-vantra-erp.vercel.app/',
    ]) {
      expect(screen.getAllByRole('link').some((a) => a.getAttribute('href') === href), href).toBe(true)
    }
  })

  it('opens a case study from a deep link', async () => {
    window.location.hash = '#work/alam-pakwan-house'
    render(<Projects />)
    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByRole('heading', { level: 2, name: 'Alam Pakwan House' })).toBeInTheDocument()
  })

  it('still opens Toolnest from the old Atlas Workspace link', async () => {
    window.location.hash = '#work/atlas-workspace'
    render(<Projects />)
    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByRole('heading', { level: 2, name: 'Toolnest' })).toBeInTheDocument()
  })

  it('stays closed for an unknown deep link', () => {
    window.location.hash = '#work/not-a-project'
    render(<Projects />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
