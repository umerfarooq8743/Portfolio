import type { CSSProperties } from 'react'

const items = [
  'Angular', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'React', 'PostgreSQL', 'OpenAI API',
  'Shopify', 'WooCommerce', 'Daraz', 'TCS', 'Leopards', 'PostEx', 'BlueEx', 'M&P',
  'Prisma', 'Socket.IO', 'Electron', '.NET', 'SQL Server', 'Docker',
]

/** Infinite ticker of the stack and the services I've integrated. Pauses on hover. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <li key={t} className="flex items-center">
          <span
            className={`px-6 font-display text-[clamp(1.25rem,0.9rem+1.4vw,2rem)] font-semibold tracking-[-0.03em] whitespace-nowrap ${
              i % 4 === 0 ? 'text-fg' : 'text-fg-subtle/70'
            }`}
          >
            {t}
          </span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-signal/70" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Technologies and integrations" className="marquee overflow-hidden border-y border-line py-7">
      <div className="marquee-track flex w-max" style={{ '--marquee-dur': '55s' } as CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
