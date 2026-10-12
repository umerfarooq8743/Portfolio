import { ArrowUpRight, Award } from 'lucide-react'
import { experience } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeader
          index="04"
          label="Experience"
          id="experience-title"
          title={
            <>
              Where I’ve been <span className="text-fg-muted">building.</span>
            </>
          }
        />

        <ol className="space-y-20 md:space-y-28">
          {experience.map((role) => {
            const [from, to] = role.period.split(' — ')
            return (
              <li key={role.company} className="grid gap-8 md:grid-cols-12 md:gap-8">
                {/* Company rail */}
                <Reveal className="md:col-span-4 lg:col-span-3">
                  <div className="md:sticky md:top-28">
                    <p className="label flex items-center gap-2.5">
                      {role.current && <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-signal" />}
                      <time dateTime={role.start}>{from}</time> — {to}
                    </p>
                    <h3 className="mt-4 font-display text-[2rem] leading-none font-semibold tracking-[-0.035em] text-fg">
                      {role.company}
                    </h3>
                    <p className="mt-3 text-fg-muted">{role.title}</p>
                    {role.recognition && (
                      <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/[0.07] px-3 py-1.5 text-[0.78rem] whitespace-nowrap text-signal-soft">
                        <Award className="size-3.5" aria-hidden="true" />
                        {role.recognition}
                      </p>
                    )}
                  </div>
                </Reveal>

                {/* Detail */}
                <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
                  {role.summary && (
                    <Reveal>
                      <p className="text-lead max-w-[62ch] text-pretty text-fg-muted">{role.summary}</p>
                    </Reveal>
                  )}

                  {role.tracks && (
                    <ul className="mt-10 border-b border-line">
                      {role.tracks.map((t, i) => (
                        <Reveal as="li" key={t.name} delay={i * 50} className="grid gap-3 border-t border-line py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
                          <div>
                            <p className="font-display text-lg font-semibold tracking-[-0.015em] text-fg">{t.name}</p>
                            <div className="mt-2">
                              <Tag tone={i === 0 ? 'signal' : 'default'}>{t.focus}</Tag>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {t.points.map((p) => (
                              <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
                                <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-line-strong" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </Reveal>
                      ))}
                    </ul>
                  )}

                  {role.shared && (
                    <Reveal className="mt-6">
                      <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-fg-subtle">
                        {role.shared.map((s) => (
                          <li key={s} className="flex items-center gap-2.5">
                            <span aria-hidden="true" className="size-1 rounded-full bg-fg-subtle" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )}

                  {role.sites && (
                    <ul className="mt-10 border-b border-line">
                      {role.sites.map((site, i) => (
                        <Reveal as="li" key={site.name} delay={i * 50} className="border-t border-line">
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group grid gap-3 py-6 transition-colors sm:grid-cols-[11rem_1fr_auto] sm:items-start sm:gap-8"
                          >
                            <div>
                              <p className="font-display text-lg font-semibold tracking-[-0.015em] text-fg transition-colors group-hover:text-signal-soft">
                                {site.name}
                              </p>
                              {site.url && (
                                <p className="mt-1 font-mono text-xs text-fg-subtle">
                                  {site.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="text-[0.95rem] leading-relaxed text-fg-muted">{site.description}</p>
                              {site.tags && (
                                <p className="mt-3 flex flex-wrap gap-1.5">
                                  {site.tags.map((t) => (
                                    <Tag key={t}>{t}</Tag>
                                  ))}
                                </p>
                              )}
                            </div>
                            <ArrowUpRight
                              className="hidden size-5 text-fg-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg sm:block"
                              aria-hidden="true"
                            />
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        </Reveal>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
