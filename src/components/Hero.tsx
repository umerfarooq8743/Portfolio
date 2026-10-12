import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { marqueeTech, profile, stats } from '../data/profile'
import { ButtonLink } from './ui/Button'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'
import { IntegrationMap } from './IntegrationMap'

const socialLink =
  'grid size-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:bg-white/[0.05] hover:text-fg'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-32 -z-10 h-[40rem] bg-[radial-gradient(45%_55%_at_18%_10%,rgba(45,212,191,0.12),transparent_70%),radial-gradient(45%_55%_at_82%_20%,rgba(99,102,241,0.16),transparent_70%)]"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] py-1.5 pr-4 pl-2 text-sm text-fg-muted backdrop-blur">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-300/10 px-2 py-0.5 font-mono text-[0.7rem] text-teal-200">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-teal-300" />
              Now
            </span>
            <span>
              Building <span className="text-fg">AI agents</span> for ShipKardo
              <span className="hidden sm:inline"> at i-Splendid</span>
            </span>
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-fg sm:text-6xl lg:text-[3.6rem] xl:text-[3.9rem]"
          >
            Hi, I’m Umer<span className="text-teal-300">.</span>
            <span className="text-gradient mt-1 block pb-2 lg:whitespace-nowrap">Full-Stack Engineer</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fg-muted">
            I engineer scalable, production-grade business platforms on the{' '}
            <span className="text-fg">MEAN stack</span> — Angular, Node.js, Express.js and MongoDB — with .NET, SQL
            Server, MySQL and Electron in the toolkit. My work powers order management, ERP, event booking and
            healthcare products: <span className="text-fg">20+ courier integrations</span>, multi-channel order sync
            across Shopify, WooCommerce and Daraz, and now <span className="text-fg">AI</span> — natural-language
            reporting and autonomous agents on the OpenAI API.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#work" variant="accent">
              View my work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Let’s connect
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </ButtonLink>
            <div className="flex items-center gap-2 sm:ml-2">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={socialLink}>
                <GitHubIcon className="size-[18px]" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={socialLink}>
                <LinkedInIcon className="size-[17px]" />
              </a>
            </div>
          </div>

          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-teal-300/80" aria-hidden="true" />
              {profile.location}
            </span>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
              {profile.email}
            </a>
          </p>
        </div>

        <div className="relative">
          <IntegrationMap />
        </div>
      </div>

      {/* Proof points */}
      <div className="container-page mt-20">
        <dl className="ring-gradient grid grid-cols-2 overflow-hidden rounded-2xl bg-white/[0.02] lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse p-5 sm:p-7 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className="mt-1.5 text-sm leading-snug text-fg-muted">{s.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Tech marquee (decorative; the full list lives in Skills) */}
      <div aria-hidden="true" className="marquee mt-14 overflow-hidden border-y border-line py-5">
        <div className="marquee-track flex w-max gap-10 pr-10">
          {[...marqueeTech, ...marqueeTech].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-sm tracking-wide whitespace-nowrap text-fg-subtle">
              {t}
              <span className="size-1 rounded-full bg-white/15" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
