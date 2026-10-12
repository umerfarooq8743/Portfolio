import { Blocks, Bot, Layers, RefreshCw, Workflow } from 'lucide-react'
import { approach } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

const icons = [Bot, Workflow, RefreshCw, Blocks, Layers]

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="05"
          label="Approach"
          id="approach-title"
          title="The problems I like to solve."
          intro="The engineering work that fills my days — described in general terms, without exposing anything proprietary."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {approach.map((item, i) => {
            const Icon = icons[i % icons.length]
            if (item.wide) {
              return (
                <Reveal key={item.title} className="sm:col-span-2">
                  <div className="ring-gradient relative h-full overflow-hidden rounded-2xl bg-[linear-gradient(120deg,rgba(45,212,191,0.07),rgba(99,102,241,0.06)_45%,transparent_80%)] p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-teal-300/25 bg-teal-300/[0.08] text-teal-200">
                        <Icon className="size-[22px]" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/[0.06] px-2.5 py-0.5 font-mono text-[0.68rem] tracking-[0.1em] text-teal-200 uppercase">
                          <span aria-hidden="true" className="pulse-dot relative size-1.5 rounded-full bg-teal-300" />
                          Current focus
                        </p>
                        <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{item.title}</h3>
                        <p className="mt-3 max-w-3xl leading-relaxed text-pretty text-fg-muted sm:text-[1.0625rem]">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            }
            return (
              <Reveal key={item.title} delay={(i % 2) * 90}>
                <div className="card h-full p-6 transition-colors duration-300 hover:border-white/[0.13] sm:p-7">
                  <span className="grid size-10 place-items-center rounded-xl border border-accent/20 bg-accent/[0.08] text-accent-soft">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-fg">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-pretty text-fg-muted">{item.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
