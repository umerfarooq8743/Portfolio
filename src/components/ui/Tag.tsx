import type { ReactNode } from 'react'

type Tone = 'default' | 'signal' | 'ice'

const tones: Record<Tone, string> = {
  default: 'border-line bg-white/[0.025] text-fg-muted',
  signal: 'border-signal/30 bg-signal/[0.08] text-signal-soft',
  ice: 'border-ice/25 bg-ice/[0.07] text-ice',
}

/** Compact technical tag (stack items, statuses). */
export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.72rem] leading-5 ${tones[tone]}`}>
      {children}
    </span>
  )
}
