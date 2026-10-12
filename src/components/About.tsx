import { Award } from 'lucide-react'
import { profile } from '../data/profile'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

const facts = [
  { term: 'Role', detail: 'Software Engineer — MEAN Stack' },
  { term: 'Company', detail: 'i-Splendid, since March 2023' },
  { term: 'Focus', detail: 'Angular · Node.js · Express.js · MongoDB' },
  { term: 'Also', detail: '.NET · SQL Server · MySQL' },
  { term: 'Location', detail: `${profile.location} · ${profile.timezone}` },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="01"
          label="About"
          id="about-title"
          title="I build the software businesses run on — and the connections between it."
        />

        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-[1.0625rem] leading-[1.75] text-pretty text-fg-muted">
            <p>
              I’m a full-stack software engineer who builds the business software companies run on — applications
              where an order, an invoice or a stock count has to be right, every time. Since March 2023 I’ve been a software engineer at{' '}
              <span className="text-fg">i-Splendid</span>, building the Angular frontend of{' '}
              <span className="text-fg">Splendid Accounts</span>, a complete ERP solution — invoices and returns, POS, inventory, CRM, profit &amp;
              loss reporting and its role-based permissions — and both the frontend and backend of{' '}
              <span className="text-fg">ShipKardo</span>, an order management system.
            </p>
            <p>
              A lot of that happens at the edges between systems: bringing orders in from Shopify, WooCommerce,
              Daraz and Splendid Accounts, booking shipments through 20+ courier integrations like TCS, Leopards
              and PostEx, keeping product and inventory data in step, and notifying people by email when something changes. It’s taught me to care about the
              unglamorous parts — clear data flow, predictable behaviour when a third party misbehaves, and
              interfaces that operations teams can trust. Most recently I’ve brought AI into ShipKardo:
              natural-language reporting on the OpenAI API, and AI agents that take an instruction and decide how
              to get the task done.
            </p>
<p>
              At i-Splendid I’ve also built the admin panel and mobile-facing APIs for{' '}
              <span className="text-fg">NurseNova</span>, a healthcare app (Angular, Node.js, MySQL), and worked on{' '}
              <span className="text-fg">Mounties</span>, an Australian booking portal for a children’s play venue
              (Angular, .NET, SQL Server), and built <span className="text-fg">WinQo</span>, an Electron desktop app
              for sending WhatsApp messages. I favour maintainable architecture over clever code, and usability over novelty —
              and I’m still learning every week.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="card ring-gradient overflow-hidden">
              <div className="flex items-center gap-4 border-b border-line p-5">
                <img
                  src={profile.photo}
                  alt="Portrait of Umer Farooq"
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="size-16 rounded-xl object-cover ring-1 ring-white/10"
                />
                <div>
                  <p className="font-medium text-fg">{profile.name}</p>
                  <p className="text-sm text-fg-muted">{profile.specialty}</p>
                </div>
              </div>
              <dl className="divide-y divide-line">
                {facts.map((f) => (
                  <div key={f.term} className="grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5 text-sm">
                    <dt className="eyebrow pt-0.5">{f.term}</dt>
                    <dd className="text-fg">{f.detail}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-3 border-t border-line bg-white/[0.02] px-5 py-4 text-sm">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-teal-300/10 text-teal-200">
                  <Award className="size-4" aria-hidden="true" />
                </span>
                <p className="text-fg-muted">
                  <span className="text-fg">Employee of the Month</span> at i-Splendid, April 2024
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
