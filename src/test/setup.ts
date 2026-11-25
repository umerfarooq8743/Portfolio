import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

// Pure-logic suites run in the Node environment; only DOM suites need the rest.
const hasDom = typeof window !== 'undefined'

if (hasDom) {
  const { cleanup } = await import('@testing-library/react')
  afterEach(() => {
    cleanup()
    window.location.hash = ''
  })

  // jsdom has no IntersectionObserver (Reveal, motion's useInView) — nothing ever intersects.
  if (!('IntersectionObserver' in window)) {
    class NoopIntersectionObserver {
      readonly root = null
      readonly rootMargin = ''
      readonly thresholds: number[] = []
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
    vi.stubGlobal('IntersectionObserver', NoopIntersectionObserver)
  }

  // jsdom does not implement element scrolling.
  Element.prototype.scrollTo ??= function scrollTo() {}

  // jsdom has no matchMedia; motion's useReducedMotion reads it.
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  }
}
