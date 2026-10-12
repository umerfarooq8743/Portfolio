import { alsoExplored, skillGroups } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'

export function Skills() {
  const [core, ...groups] = skillGroups

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeader
          index="05"
          label="Skills"
          id="skills-title"
          title={
            <>
              The stack <span className="text-fg-muted">behind the work.</span>
            </>
          }
          intro="Grouped by how I use them in production — no arbitrary percentage bars. The core stack is where I spend my working days; AI is where I’m pushing next."
        />

        {/* Core stack — set large, as type */}
        <Reveal>
          <div className="surface edge-signal overflow-hidden rounded-[var(--radius-xl)] p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="label text-signal-soft">{core.title}</h3>
              <p className="label">{core.caption}</p>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10">
              {core.items.map((item) => (
                <li key={item} className="flex items-center gap-3 sm:gap-4">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-[3px] bg-signal sm:size-2.5" />
                  <span className="font-display text-[clamp(1.6rem,1.1rem+2vw,3rem)] leading-tight font-semibold tracking-[-0.035em] text-fg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Supporting groups */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => {
            const ai = group.title.startsWith('AI')
            return (
              <Reveal
                key={group.title}
                delay={(i % 3) * 70}
                className={`bg-bg p-6 sm:p-8 ${ai ? 'bg-[linear-gradient(160deg,rgba(169,193,255,0.07),transparent_60%)]' : ''}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-fg">{group.title}</h3>
                  <span className="font-mono text-[0.68rem] text-fg-subtle">{String(i + 2).padStart(2, '0')}</span>
                </div>
                <p className={`mt-1 text-sm ${ai ? 'text-ice' : 'text-fg-subtle'}`}>{group.caption}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag tone={ai ? 'ice' : 'default'}>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="label">Also explored</span>
          {alsoExplored.map((s) => (
            <span key={s} className="text-fg-muted">
              {s}
            </span>
          ))}
          <span className="text-fg-subtle">— through personal projects on GitHub</span>
        </Reveal>
      </div>
    </section>
  )
}
