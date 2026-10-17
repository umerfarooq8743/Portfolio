import type { PointerEvent } from 'react'

/** Pointer handler that feeds the cursor position to the `.spotlight` glow as CSS variables. */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
