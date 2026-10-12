import { ArrowUpRight } from 'lucide-react'
import { profile, repos } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'
import { GitHubIcon } from './ui/BrandIcons'

export function OpenSource() {
  return (
    <section aria-labelledby="github-title" className="border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeader
          index="06"
          label="On GitHub"
          id="github-title"
          title={
            <>
              Learning <span className="text-fg-muted">in public.</span>
            </>
          }
          intro="Earlier personal projects from 2023, kept public as a record of how I learned the stack. My professional work lives in private company repositories."
          aside={
            <a
              href={profile.links.githubRepos}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] px-5 text-sm font-medium text-fg transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              <GitHubIcon className="size-4" />
              All repositories
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          }
        />

        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2">
          {repos.map((repo, i) => (
            <Reveal as="li" key={repo.name} delay={(i % 2) * 70} className="bg-bg">
              <a
                href={`${profile.links.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-white/[0.025] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs text-fg-subtle">umerfarooq8743/{repo.name}</p>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-fg-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-soft"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] text-fg">{repo.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pretty text-fg-muted">{repo.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
                  {repo.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                  <span className="ml-auto font-mono text-xs text-fg-subtle">{repo.year}</span>
                </div>
                <span className="sr-only">(opens GitHub in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
