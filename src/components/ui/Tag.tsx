import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[0.72rem] leading-5 text-fg-muted">
      {children}
    </span>
  )
}
