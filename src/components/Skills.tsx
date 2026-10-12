import { alsoExplored, skillGroups } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-tint scroll-mt-20 py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="04"
          label="Skills"
          id="skills-title"
          title="The stack behind the work."
          intro="Grouped by how I use them in production — no arbitrary percentage bars. The core stack is where I spend my working days; AI is where I’m pushing next."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={(i % 3) * 70}
              className={`bg-ink-950 p-6 sm:p-7 ${group.span ?? ''} ${i === 0 ? 'relative bg-[linear-gradient(160deg,rgba(45,212,191,0.08),transparent_55%)]' : ''} ${group.title.startsWith('AI') ? 'relative bg-[linear-gradient(160deg,rgba(129,140,248,0.1),transparent_60%)]' : ''}`}
            >
              <h3 className="flex items-baseline justify-between gap-4">
                <span className="font-medium text-fg">{group.title}</span>
                <span className="font-mono text-[0.68rem] text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
              </h3>
              <p className="mt-1 text-sm text-fg-subtle">{group.caption}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-lg border px-2.5 py-1 text-sm ${
                      i === 0 ? 'border-teal-300/25 bg-teal-300/[0.06] text-fg' : group.title.startsWith('AI') ? 'border-indigo-300/25 bg-indigo-400/[0.07] text-fg' : 'border-line bg-white/[0.02] text-fg-muted'
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fg-subtle">
          <span className="eyebrow">Also explored</span>
          {alsoExplored.map((s, i) => (
            <span key={s} className="text-fg-muted">
              {s}
              {i < alsoExplored.length - 1 && <span aria-hidden="true" className="ml-3 text-fg-subtle">/</span>}
            </span>
          ))}
          <span className="basis-full text-xs sm:basis-auto">— through personal projects on GitHub</span>
        </Reveal>
      </div>
    </section>
  )
}
