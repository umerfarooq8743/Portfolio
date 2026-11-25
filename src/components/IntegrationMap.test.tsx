import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { IntegrationMap } from './IntegrationMap'

const node = (container: HTMLElement, id: string) => container.querySelector<SVGGElement>(`[data-node="${id}"]`)!
const states = (container: HTMLElement, selector: string) =>
  [...container.querySelectorAll<SVGElement>(selector)].map((el) => el.getAttribute('data-state'))

describe('IntegrationMap', () => {
  it('describes the map for assistive technology', () => {
    render(<IntegrationMap />)
    const img = screen.getByRole('img', { name: /WinqoHub integration map/i })
    expect(img).toHaveAccessibleDescription(/Shopify, WooCommerce, Daraz and Splendid Accounts/)
    expect(img).toHaveAccessibleDescription(/more than 20 couriers/)
    expect(img).toHaveAccessibleDescription(/OpenAI API/)
  })

  it('renders every node once', () => {
    const { container } = render(<IntegrationMap />)
    const ids = [...container.querySelectorAll('[data-node]')].map((n) => n.getAttribute('data-node'))
    expect(ids).toEqual(['ai', 'ch-0', 'ch-1', 'ch-2', 'ch-3', 'hub', 'co-0', 'co-1', 'co-2', 'co-3', 'co-4', 'co-5', 'co-6', 'nt-0', 'nt-1'])
  })

  it('shows a hint until a node is hovered', () => {
    render(<IntegrationMap />)
    expect(screen.getByText('Hover a node to trace its route')).toBeInTheDocument()
  })

  it('traces a courier’s route: channels and hub on, other couriers off', () => {
    const { container } = render(<IntegrationMap />)
    fireEvent.pointerEnter(node(container, 'co-2'))

    expect(screen.getByText('Channels → WinqoHub → Leopards')).toBeInTheDocument()
    expect(node(container, 'co-2')).toHaveAttribute('data-state', 'on')
    expect(node(container, 'hub')).toHaveAttribute('data-state', 'on')
    expect(node(container, 'ch-0')).toHaveAttribute('data-state', 'on')
    expect(node(container, 'co-1')).toHaveAttribute('data-state', 'off')
    expect(node(container, 'nt-0')).toHaveAttribute('data-state', 'off')
    expect(node(container, 'ai')).toHaveAttribute('data-state', 'off')
  })

  it('lights only the wires on the traced route', () => {
    const { container } = render(<IntegrationMap />)
    fireEvent.pointerEnter(node(container, 'ch-0'))
    const linkStates = states(container, '.imap-link')
    // 4 channel wires, 7 courier wires, 2 notification wires, then the AI link
    expect(linkStates).toEqual(['on', 'off', 'off', 'off', 'on', 'on', 'on', 'on', 'on', 'on', 'on', 'on', 'on', 'off'])
  })

  it('lights everything from the hub', () => {
    const { container } = render(<IntegrationMap />)
    fireEvent.pointerEnter(node(container, 'hub'))
    expect(screen.getByText('4 channels → WinqoHub → 20+ couriers')).toBeInTheDocument()
    expect(new Set(states(container, '.imap-node'))).toEqual(new Set(['on']))
    expect(new Set(states(container, '.imap-link'))).toEqual(new Set(['on']))
  })

  it('resets when the pointer leaves', () => {
    const { container } = render(<IntegrationMap />)
    fireEvent.pointerEnter(node(container, 'ai'))
    expect(screen.getByText('WinqoHub ⇄ OpenAI API')).toBeInTheDocument()
    fireEvent.pointerLeave(node(container, 'ai'))
    expect(screen.getByText('Hover a node to trace its route')).toBeInTheDocument()
    expect(states(container, '.imap-node').every((s) => s === null)).toBe(true)
  })

  it('gives each traffic comet its own timing', () => {
    const { container } = render(<IntegrationMap />)
    const comets = [...container.querySelectorAll<SVGPathElement>('.imap-comet')]
    expect(comets).toHaveLength(13)
    for (const c of comets) {
      expect(c.getAttribute('pathLength')).toBe('1')
      expect(c.style.getPropertyValue('--flow-dur')).toMatch(/^\d+(\.\d+)?s$/)
      expect(c.style.getPropertyValue('--flow-delay')).toMatch(/^-?\d+(\.\d+)?s$/)
    }
  })

  it('keeps the mobile flow in step with the diagram', () => {
    const { container } = render(<IntegrationMap />)
    const flow = container.querySelector<HTMLElement>('.md\\:hidden')!
    const scope = within(flow)
    for (const label of ['Shopify', 'Splendid Accounts', 'BlueEx', 'Call Courier Trax', '+ 14 more', 'Email', 'Monty Mobile', 'WinqoHub']) {
      expect(scope.getByText(label)).toBeInTheDocument()
    }
  })
})
