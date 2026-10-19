import { Award, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

const facts = [
  { term: 'Role', detail: 'Software Engineer — MEAN Stack' },
  { term: 'Company', detail: 'i-Splendid · since Mar 2023' },
  { term: 'Core', detail: 'Angular · Node.js · Express · MongoDB' },
  { term: 'Also', detail: 'React · PostgreSQL · .NET · Electron' },
  { term: 'Education', detail: 'BS Computer Science · University of Karachi' },
  { term: 'Based in', detail: `${profile.location} · UTC+5` },
]

const principles = [
  {
    title: 'Correct before clever',
    body: 'In software that handles money, stock and appointments, a predictable system beats an elegant one.',
  },
  {
    title: 'Own it end to end',
    body: 'From the data model to the screen, so a feature is designed once instead of stitched together.',
  },
  {
    title: 'Keep learning',
    body: 'Angular, React, .NET, Electron and now AI agents — I pick up what the work needs and go deep on it.',
  },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeader
          index="03"
          label="About"
          id="about-title"
          title={
            <>
              Software people rely on, <span className="text-fg-muted">every working day.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Portrait + facts */}
          <Reveal className="lg:col-span-4">
            <div className="surface overflow-hidden rounded-[var(--radius-xl)] lg:sticky lg:top-28">
              <div className="flex items-center gap-4 p-5">
                <img
                  src={profile.photo}
                  alt="Portrait of Umer Farooq"
                  width={72}
                  height={72}
                  loading="lazy"
                  decoding="async"
                  className="size-[4.5rem] rounded-2xl object-cover ring-1 ring-white/10"
                />
                <div>
                  <p className="font-display text-lg font-semibold tracking-[-0.01em] text-fg">{profile.name}</p>
                  <p className="text-sm text-fg-muted">Full-stack software engineer</p>
                </div>
              </div>
              <dl className="border-t border-line">
                {facts.map((f) => (
                  <div key={f.term} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-line px-5 py-3.5 text-sm last:border-b-0">
                    <dt className="label pt-0.5">{f.term}</dt>
                    <dd className="text-fg">{f.detail}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-3 border-t border-line bg-signal/[0.06] px-5 py-4 text-sm">
                <Award className="size-4 shrink-0 text-signal-soft" aria-hidden="true" />
                <p className="text-fg-muted">
                  <span className="text-fg">Employee of the Month</span> · i-Splendid, April 2024
                </p>
              </div>
              <a
                href={profile.cv}
                download
                className="group flex items-center justify-between gap-3 border-t border-line px-5 py-4 text-sm font-medium text-fg transition-colors hover:bg-white/[0.04]"
              >
                Download my CV
                <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-signal-ink">
                  <Download className="size-3.5" aria-hidden="true" />
                </span>
              </a>
            </div>
          </Reveal>

          {/* Story */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="font-display text-[clamp(1.45rem,1.15rem+1.1vw,2.1rem)] leading-[1.3] font-medium tracking-[-0.02em] text-pretty text-fg">
                I’m a full-stack engineer at i-Splendid, building the software businesses run their day on — order
                management, ERPs, and the integrations that hold them together.
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-10 space-y-6 text-[1.0625rem] leading-[1.75] text-pretty text-fg-muted">
              <p>
                On <span className="text-fg">WinqoHub</span> I work across the stack — Angular in front, Node.js, Express
                and MongoDB behind it — with 20+ courier integrations, selling channels like Shopify, WooCommerce and
                Daraz, email and SMS feeding into it. Lately that includes AI: natural-language reporting and agents
                built on the OpenAI API. On <span className="text-fg">Splendid Accounts</span> I built the Angular
                frontend of the ERP, from invoices, returns and POS to profit &amp; loss reporting and role-based
                permissions.
              </p>
              <p>
                Around those products I’ve delivered client work too: the admin panel and mobile APIs for{' '}
                <span className="text-fg">NurseNova</span>, a booking portal for <span className="text-fg">Mounties</span>{' '}
                in Australia, and <span className="text-fg">WinQo</span>, an Electron desktop app. Before i-Splendid I
                built websites at 3DM Solutions and started out as an intern at Service4Digital.
              </p>
              <p>
                Outside work I build complete systems end to end: <span className="text-fg">Manifest ERP</span> (formerly ClearPort), a
                multi-tenant customs-clearing platform on React, Node.js and PostgreSQL,{' '}
                <span className="text-fg">Vantra ERP</span>, a multi-company trading ERP with POS and double-entry
                accounting on Angular, Node.js and MySQL, and{' '}
                <span className="text-fg">Atelier One</span> (formerly RobeApp), a multi-company suite for tailoring
                businesses on the MEAN stack.
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-14">
              <p className="label mb-6">How I work</p>
              <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                {principles.map((p) => (
                  <li key={p.title} className="border-t border-line-strong pt-5">
                    <p className="font-display text-lg font-semibold tracking-[-0.015em] text-fg">{p.title}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{p.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
