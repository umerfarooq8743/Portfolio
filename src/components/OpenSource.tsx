import { ArrowUpRight } from 'lucide-react'
import { profile, repos } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'
import { GitHubIcon } from './ui/BrandIcons'

export function OpenSource() {
  return (
    <section aria-labelledby="github-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="06"
          label="On GitHub"
          id="github-title"
          title="Learning in public."
          intro="Earlier personal projects from 2023, kept public as a record of how I learned the stack. My professional work lives in private company repositories."
          aside={
            <a
              href={profile.links.githubRepos}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:bg-white/[0.06]"
            >
              <GitHubIcon className="size-4" />
              All repositories
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          }
        />

        <ul className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo, i) => (
            <Reveal as="li" key={repo.name} delay={(i % 2) * 80} className="h-full">
              <a
                href={`${profile.links.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.03]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-fg-subtle">umerfarooq8743/{repo.name}</p>
                    <h3 className="mt-1.5 text-lg font-medium tracking-tight text-fg">{repo.title}</h3>
                  </div>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-fg-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-fg-muted">{repo.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
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
