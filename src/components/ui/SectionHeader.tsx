import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  index: string
  label: string
  id: string
  title: ReactNode
  intro?: ReactNode
  /** Extra content aligned to the right of the title row (e.g. a link). */
  aside?: ReactNode
}

export function SectionHeader({ index, label, id, title, intro, aside }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.14em] uppercase">
        <span className="text-teal-300">{index}</span>
        <span aria-hidden="true" className="text-fg-subtle">/</span>
        <span className="text-accent-soft">{label}</span>
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-4">
        <h2 id={id} className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-balance text-fg sm:text-[2.6rem] sm:leading-[1.1]">
          {title}
        </h2>
        <span aria-hidden="true" className="mb-3 hidden h-px min-w-12 flex-1 bg-gradient-to-r from-line-strong to-transparent md:block" />
        {aside}
      </div>
      {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-fg-muted sm:text-lg">{intro}</p>}
    </Reveal>
  )
}
