import { Bot } from 'lucide-react'
import { approach } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { IntegrationMap } from './IntegrationMap'

export function Engineering() {
  const focus = approach.find((a) => a.wide)
  const principles = approach.filter((a) => !a.wide)

  return (
    <section id="engineering" aria-labelledby="engineering-title" className="scroll-mt-20 border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeader
          index="02"
          label="Engineering"
          id="engineering-title"
          title={
            <>
              The hard problems live <span className="text-fg-muted">between systems.</span>
            </>
          }
          intro="Most of my work happens where one system meets another — selling channels, couriers, ledgers, mobile apps and now AI. This is what that looks like in ShipKardo, and how I approach it."
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <IntegrationMap />
          </Reveal>

          {focus && (
            <Reveal delay={120} className="lg:col-span-4">
              <article className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-fg p-6 text-bg shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.28),transparent)]"
                />
                <div className="relative flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-bg text-fg">
                    <Bot className="size-5" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-[#b8411a] uppercase">
                    <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-signal" />
                    Current focus
                  </span>
                </div>
                <h3 className="text-h3 relative mt-8 text-bg">{focus.title}</h3>
                <p className="relative mt-4 leading-relaxed text-pretty text-black/70">{focus.body}</p>
                <ul className="relative mt-auto flex flex-wrap gap-2 pt-8">
                  {['OpenAI API', 'NL reporting', 'AI agents'].map((t) => (
                    <li key={t} className="rounded-md border border-black/10 bg-black/[0.04] px-2 py-0.5 font-mono text-[0.72rem] text-black/75">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )}
        </div>

        <ol className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="border-t border-line-strong pt-6">
              <span className="font-mono text-xs text-signal-soft">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-display text-xl leading-snug font-semibold tracking-[-0.02em] text-fg">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-fg-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
