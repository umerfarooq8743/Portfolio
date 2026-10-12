import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  index: string
  label: string
  id: string
  title: ReactNode
  intro?: ReactNode
  /** Optional element shown under the intro (e.g. a link). */
  aside?: ReactNode
}

/**
 * Editorial section opener: a numbered label in the left rail,
 * headline and intro in the main column.
 */
export function SectionHeader({ index, label, id, title, intro, aside }: SectionHeaderProps) {
  return (
    <Reveal className="mb-14 grid gap-5 md:mb-20 md:grid-cols-12 md:gap-8">
      <p className="label flex items-center gap-3 self-start md:col-span-3 md:pt-4">
        <span className="text-signal-soft">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        <span>{label}</span>
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="text-h2 max-w-[18ch] text-fg">
          {title}
        </h2>
        {intro && <p className="text-lead mt-6 max-w-[60ch] text-pretty text-fg-muted">{intro}</p>}
        {aside && <div className="mt-8">{aside}</div>}
      </div>
    </Reveal>
  )
}
