import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { projects, type ProjectVisualKind } from '../data/profile'
import { ProjectVisual } from './ProjectVisual'

const kinds: ProjectVisualKind[] = ['oms', 'accounts', 'pos', 'health', 'booking', 'desktop', 'customs', 'workspace', 'catering']

describe('ProjectVisual', () => {
  it.each(kinds)('renders the %s sketch, labelled as illustrative', (kind) => {
    const { container } = render(<ProjectVisual kind={kind} label="Demo" />)
    const img = screen.getByRole('img', { name: 'Illustrative interface sketch for Demo (not a real screenshot)' })
    expect(img).toHaveTextContent('Illustrative')
    // the sketch itself must draw something, and stay hidden from screen readers
    const body = container.querySelector('[aria-hidden="true"].p-4, [aria-hidden="true"][class*="p-4"]')
    expect(body?.childElementCount).toBeGreaterThan(0)
  })

  it('has a sketch for every project', () => {
    for (const p of projects) expect(kinds).toContain(p.visual)
  })

  it('shows the catering sketch’s inquiry pipeline', () => {
    render(<ProjectVisual kind="catering" label="Alam Pakwan House" />)
    for (const tag of ['Request a quote', 'Inquiries', 'New', 'Quote sent', 'Confirmed']) {
      expect(screen.getByText(tag)).toBeInTheDocument()
    }
  })

  it.each([
    ['md', 'h-52'],
    ['lg', 'h-56'],
    ['xl', 'h-64'],
  ] as const)('sizes the %s variant', (size, cls) => {
    const { container } = render(<ProjectVisual kind="oms" label="Demo" size={size} />)
    expect(container.querySelector(`.${cls}`)).not.toBeNull()
  })
})
