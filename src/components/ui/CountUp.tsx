import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Counts the leading number of a value like "20+", "5M" or "12" up from zero
 * once it scrolls into view. Values without a plain leading number
 * ("Apr ’24", "24/7") render as-is.
 */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const match = value.includes('/') ? null : /^(\d+)(.*)$/.exec(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !match || !inView || reduce) return
    const target = Number(match[1])
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${match[2]}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{value}</span>
    </span>
  )
}
