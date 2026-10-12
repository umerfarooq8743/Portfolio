import type { JSX } from 'react'
import type { ProjectVisualKind } from '../data/profile'

/**
 * Abstract, illustrative UI sketches for proprietary work where real
 * screenshots can't be shown. They use skeleton bars rather than data so they
 * can't be mistaken for genuine application screenshots, and they're always
 * labelled "Illustrative".
 */

type Tone = 'signal' | 'ice' | 'ok' | 'neutral'

const pillTones: Record<Tone, string> = {
  signal: 'bg-signal/[0.12] text-signal-soft ring-signal/25',
  ice: 'bg-ice/[0.1] text-ice ring-ice/25',
  ok: 'bg-ok/[0.1] text-ok ring-ok/25',
  neutral: 'bg-white/[0.06] text-fg-muted ring-white/10',
}

function Bar({ w, tone = 'base' }: { w: string; tone?: 'base' | 'strong' | 'signal' | 'ice' }) {
  const color =
    tone === 'strong' ? 'bg-white/[0.2]' : tone === 'signal' ? 'bg-signal/70' : tone === 'ice' ? 'bg-ice/50' : 'bg-white/[0.08]'
  return <span className={`block h-1.5 rounded-full ${color}`} style={{ width: w }} />
}

function Pill({ label, tone }: { label: string; tone: Tone }) {
  return <span className={`rounded-full px-1.5 py-px font-mono text-[0.58rem] whitespace-nowrap ring-1 ring-inset ${pillTones[tone]}`}>{label}</span>
}

const panel = 'rounded-lg border border-white/[0.06] bg-white/[0.02]'

function OmsSketch() {
  const rows: { status: string; tone: Tone; w: string }[] = [
    { status: 'Booked', tone: 'signal', w: '62%' },
    { status: 'In transit', tone: 'ice', w: '48%' },
    { status: 'Delivered', tone: 'ok', w: '70%' },
    { status: 'Synced', tone: 'neutral', w: '55%' },
    { status: 'In transit', tone: 'ice', w: '40%' },
  ]
  return (
    <div className="flex h-full gap-3">
      <div className="hidden w-[22%] flex-col gap-2.5 border-r border-white/[0.06] pr-3 sm:flex">
        <Bar w="70%" tone="strong" />
        <div className="mt-2 space-y-2.5">
          {['80%', '60%', '72%', '55%', '66%'].map((w, i) => (
            <Bar key={i} w={w} tone={i === 0 ? 'signal' : 'base'} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <Bar w="30%" tone="strong" />
          <span className="h-4 w-14 rounded-md bg-signal/30" />
        </div>
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className={`flex items-center gap-3 px-2.5 py-2 ${panel}`}>
              <span className="size-2.5 shrink-0 rounded-sm bg-white/10" />
              <div className="flex-1">
                <Bar w={r.w} />
              </div>
              <Pill label={r.status} tone={r.tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AccountsSketch() {
  const bars = [38, 52, 44, 68, 58, 76, 64, 82]
  return (
    <div className="grid h-full grid-cols-5 gap-3">
      <div className={`col-span-3 flex flex-col p-3 ${panel}`}>
        <Bar w="40%" tone="strong" />
        <div className="mt-auto flex h-[70%] items-end gap-1.5 pt-3">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? 'bg-signal/75' : 'bg-white/[0.1]'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        {[0, 1].map((i) => (
          <div key={i} className={`flex-1 p-3 ${panel}`}>
            <Bar w="50%" />
            <span className="mt-2.5 block h-2.5 w-3/4 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
      <div className={`col-span-5 space-y-2 p-3 ${panel}`}>
        {['72%', '58%', '64%'].map((w, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <Bar w={w} />
            <span className="h-1.5 w-10 shrink-0 rounded-full bg-white/[0.14]" />
          </div>
        ))}
      </div>
    </div>
  )
}

function PosSketch() {
  return (
    <div className="grid h-full grid-cols-5 gap-3">
      <div className="col-span-3 grid grid-cols-3 content-start gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`flex aspect-[4/3] flex-col justify-end p-2 ${panel}`}>
            <Bar w="70%" tone={i === 4 ? 'signal' : 'base'} />
          </div>
        ))}
      </div>
      <div className={`col-span-2 flex flex-col p-3 ${panel}`}>
        <Bar w="55%" tone="strong" />
        <div className="mt-3 space-y-2.5">
          {['80%', '64%', '72%'].map((w, i) => (
            <div key={i} className="flex justify-between gap-3">
              <Bar w={w} />
              <span className="h-1.5 w-6 shrink-0 rounded-full bg-white/[0.14]" />
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-dashed border-white/10 pt-3">
          <span className="block h-6 rounded-md bg-signal/70" />
        </div>
      </div>
    </div>
  )
}

function HealthSketch() {
  return (
    <div className="flex h-full gap-4">
      <div className={`flex flex-1 flex-col p-3 ${panel}`}>
        <div className="mb-3 flex items-center justify-between">
          <Bar w="35%" tone="strong" />
          <span className="h-4 w-12 rounded-md bg-ice/25" />
        </div>
        <div className="space-y-2">
          {[
            { w: '58%', tag: 'Cardiology', tone: 'ice' as const },
            { w: '46%', tag: 'Pediatrics', tone: 'ok' as const },
            { w: '64%', tag: 'Dermatology', tone: 'signal' as const },
            { w: '40%', tag: 'General', tone: 'neutral' as const },
          ].map((r, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-2.5 py-2 ${panel}`}>
              <span className="size-4 shrink-0 rounded-full bg-white/10" />
              <div className="flex-1">
                <Bar w={r.w} />
              </div>
              <Pill label={r.tag} tone={r.tone} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden w-[34%] max-w-[9.5rem] shrink-0 flex-col rounded-[1.1rem] border border-white/[0.1] bg-surface p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:flex">
        <span className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/15" />
        <div className="rounded-lg bg-ice/[0.1] p-2">
          <Bar w="60%" tone="strong" />
          <div className="mt-2 flex items-center gap-1.5">
            <span className="size-5 rounded-full bg-white/15" />
            <Bar w="50%" />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-4 rounded ${i === 1 ? 'bg-signal/50' : 'bg-white/[0.06]'}`} />
          ))}
        </div>
        {['60%', '45%'].map((w, i) => (
          <div key={i} className="mt-1.5 flex items-center gap-1.5 rounded-md border border-white/[0.06] p-1.5">
            <span className={`size-3 rounded-sm ${i === 0 ? 'bg-warn/60' : 'bg-warn/30'}`} />
            <Bar w={w} />
          </div>
        ))}
      </div>
    </div>
  )
}

function BookingSketch() {
  const busy = new Set([3, 4, 9, 11, 16, 17, 18, 23, 25])
  return (
    <div className="grid h-full grid-cols-5 gap-3">
      <div className={`col-span-3 flex flex-col p-3 ${panel}`}>
        <div className="mb-2.5 flex items-center justify-between">
          <Bar w="35%" tone="strong" />
          <span className="flex gap-1">
            <span className="size-3 rounded bg-white/10" />
            <span className="size-3 rounded bg-white/10" />
          </span>
        </div>
        <div className="grid flex-1 grid-cols-7 gap-1">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={`rounded-[4px] ${i === 17 ? 'bg-signal/75' : busy.has(i) ? 'bg-ice/25' : 'bg-white/[0.04]'}`}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        {[
          { label: 'Party', tone: 'signal' as const },
          { label: 'Play session', tone: 'ice' as const },
          { label: 'Drop & dine', tone: 'ok' as const },
        ].map((s) => (
          <div key={s.label} className={`flex-1 p-2.5 ${panel}`}>
            <Pill label={s.label} tone={s.tone} />
            <div className="mt-2 space-y-1.5">
              <Bar w="80%" />
              <Bar w="55%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DesktopSketch() {
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-[38%] flex-col gap-2 border-r border-white/[0.06] pr-3">
        <span className="h-5 rounded-md bg-white/[0.05]" />
        {['70%', '55%', '62%', '48%'].map((w, i) => (
          <div key={i} className={`flex items-center gap-2 rounded-md p-1.5 ${i === 0 ? 'bg-ok/[0.08]' : ''}`}>
            <span className="size-5 shrink-0 rounded-full bg-white/10" />
            <div className="flex-1">
              <Bar w={w} tone={i === 0 ? 'strong' : 'base'} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 space-y-2">
          <span className="block h-6 w-[62%] rounded-lg rounded-tl-sm bg-white/[0.06]" />
          <span className="ml-auto block h-6 w-[54%] rounded-lg rounded-tr-sm bg-ok/25" />
          <span className="ml-auto block h-6 w-[40%] rounded-lg rounded-tr-sm bg-ok/25" />
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Pill label="Sent" tone="ok" />
          <Pill label="Queued" tone="ice" />
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.07] p-1.5">
          <div className="flex-1">
            <Bar w="60%" />
          </div>
          <span className="size-5 rounded-md bg-ok/50" />
        </div>
      </div>
    </div>
  )
}

const sketches: Record<ProjectVisualKind, () => JSX.Element> = {
  oms: OmsSketch,
  accounts: AccountsSketch,
  pos: PosSketch,
  health: HealthSketch,
  booking: BookingSketch,
  desktop: DesktopSketch,
}

interface ProjectVisualProps {
  kind: ProjectVisualKind
  label: string
  size?: 'md' | 'lg'
}

export function ProjectVisual({ kind, label, size = 'md' }: ProjectVisualProps) {
  const Sketch = sketches[kind]
  return (
    <div
      role="img"
      aria-label={`Illustrative interface sketch for ${label} (not a real screenshot)`}
      className="relative overflow-hidden rounded-[var(--radius-md)] border border-white/[0.08] bg-bg/80 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
    >
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <span className="size-2 rounded-full bg-white/10" />
        <span className="size-2 rounded-full bg-white/10" />
        <span className="size-2 rounded-full bg-white/10" />
        <span className="ml-auto font-mono text-[0.6rem] tracking-[0.12em] text-fg-subtle uppercase">Illustrative</span>
      </div>
      <div aria-hidden="true" className={size === 'lg' ? 'h-56 p-4 sm:h-72 sm:p-5' : 'h-52 p-4 sm:h-56'}>
        <Sketch />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-bg/80 to-transparent" />
    </div>
  )
}
