import { ArrowUpRight, Award } from 'lucide-react'
import { experience } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="03" label="Experience" id="experience-title" title="Where I’ve been building." />

        <ol className="relative">
          {experience.map((role, i) => (
            <Reveal as="li" key={role.company} delay={i * 80} className="relative grid gap-4 pb-14 last:pb-0 md:grid-cols-[13rem_1fr] md:gap-10">
              {/* Timeline rail */}
              <span aria-hidden="true" className="absolute top-2 bottom-0 left-[5px] w-px bg-line md:left-[calc(13rem+1.25rem)] [li:last-child>&]:hidden" />

              <div className="relative pl-8 md:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 left-0 size-[11px] rounded-full border md:left-[calc(13rem+1.25rem-5px)] ${
                    role.current ? 'pulse-dot border-accent bg-accent' : 'border-line-strong bg-ink-950'
                  }`}
                />
                <p className="font-mono text-sm text-fg-muted">
                  <time dateTime={role.start}>{role.period.split(' — ')[0]}</time> — {role.period.split(' — ')[1]}
                </p>
              </div>

              <div className="pl-8 md:pl-10">
                <h3 className="text-xl font-semibold tracking-tight text-fg">{role.title}</h3>
                <p className="mt-1 text-accent-soft">{role.company}</p>
                {role.summary && <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">{role.summary}</p>}

                {role.tracks && (
                  <div className="mt-7 gap-4 lg:columns-2">
                    {role.tracks.map((t) => (
                      <div key={t.name} className="card mb-4 break-inside-avoid p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-fg">{t.name}</p>
                          <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.68rem] text-fg-muted">
                            {t.focus}
                          </span>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm">
                          {t.points.map((p) => (
                            <li key={p} className="flex gap-2.5 leading-relaxed text-fg-muted">
                              <span aria-hidden="true" className="mt-[0.55rem] h-px w-3 shrink-0 bg-accent" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {role.shared && (
                  <ul className="mt-5 space-y-2 text-sm">
                    {role.shared.map((p) => (
                      <li key={p} className="flex gap-2.5 leading-relaxed text-fg-muted">
                        <span aria-hidden="true" className="mt-[0.55rem] h-px w-3 shrink-0 bg-white/25" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}

                {role.sites && (
                  <ul className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {role.sites.map((site) => {
                      const inner = (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium text-fg">{site.name}</p>
                              {site.url && (
                                <p className="mt-0.5 font-mono text-xs text-fg-subtle">
                                  {site.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                </p>
                              )}
                            </div>
                            {site.url && (
                              <ArrowUpRight
                                className="size-4 shrink-0 text-fg-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{site.description}</p>
                          {site.tags && (
                            <p className="mt-4 flex flex-wrap gap-1.5">
                              {site.tags.map((t) => (
                                <span key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[0.7rem] text-fg-muted">
                                  {t}
                                </span>
                              ))}
                            </p>
                          )}
                        </>
                      )
                      return (
                        <li key={site.name}>
                          {site.url ? (
                            <a
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="card group block h-full p-5 transition-colors hover:border-white/[0.14] hover:bg-white/[0.03]"
                            >
                              {inner}
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          ) : (
                            <div className="card h-full p-5">{inner}</div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}

                {role.recognition && (
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1.5 text-sm text-accent-soft">
                    <Award className="size-4" aria-hidden="true" />
                    {role.recognition}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
