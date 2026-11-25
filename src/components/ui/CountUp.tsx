import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { formatCount, parseCount } from '../../lib/count'

/**
 * Counts the leading number of a value like "20+", "1,368" or "12" up from
 * zero once it scrolls into view. Values without a plain leading number
 * ("Apr ’24", "24/7") render as-is.
 */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    const parsed = parseCount(value)
    if (!el || !parsed || !inView || reduce) return
    const controls = animate(0, parsed.target, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => {
        el.textContent = `${formatCount(v, value)}${parsed.suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{value}</span>
    </span>
  )
}
