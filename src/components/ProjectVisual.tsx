import type { ProjectVisualKind } from '../data/profile'

/**
 * Abstract, illustrative UI sketches for proprietary/unreleased projects where
 * real screenshots can't be shown. They use skeleton bars instead of data so
 * they can't be mistaken for genuine application screenshots.
 */

function Bar({ w, tone = 'base' }: { w: string; tone?: 'base' | 'strong' | 'accent' }) {
  const color = tone === 'strong' ? 'bg-white/20' : tone === 'accent' ? 'bg-accent/60' : 'bg-white/[0.09]'
  return <span className={`block h-1.5 rounded-full ${color}`} style={{ width: w }} />
}

function Pill({ label, tone }: { label: string; tone: 'indigo' | 'sky' | 'green' | 'violet' }) {
  const tones = {
    indigo: 'bg-indigo-400/10 text-indigo-300 ring-indigo-400/20',
    sky: 'bg-sky-400/10 text-sky-300 ring-sky-400/20',
    green: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
    violet: 'bg-violet-400/10 text-violet-300 ring-violet-400/20',
  }
  return <span className={`rounded-full px-1.5 py-px font-mono text-[0.58rem] ring-1 ring-inset ${tones[tone]}`}>{label}</span>
}

function OmsSketch() {
  const rows: { status: string; tone: 'indigo' | 'sky' | 'green' | 'violet'; w: string }[] = [
    { status: 'Booked', tone: 'indigo', w: '62%' },
    { status: 'In transit', tone: 'sky', w: '48%' },
    { status: 'Delivered', tone: 'green', w: '70%' },
    { status: 'Synced', tone: 'violet', w: '55%' },
    { status: 'In transit', tone: 'sky', w: '40%' },
  ]
  return (
    <div className="flex h-full gap-3">
      <div className="hidden w-[22%] flex-col gap-2.5 border-r border-white/[0.06] pr-3 sm:flex">
        <Bar w="70%" tone="strong" />
        <div className="mt-2 space-y-2.5">
          {['80%', '60%', '72%', '55%', '66%'].map((w, i) => (
            <Bar key={i} w={w} tone={i === 0 ? 'accent' : 'base'} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <Bar w="30%" tone="strong" />
          <span className="h-4 w-14 rounded-md bg-accent/25" />
        </div>
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
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
      <div className="col-span-3 flex flex-col rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
        <Bar w="40%" tone="strong" />
        <div className="mt-auto flex h-[70%] items-end gap-1.5 pt-3">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? 'bg-accent/70' : 'bg-indigo-300/20'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
            <Bar w="50%" />
            <span className="mt-2.5 block h-2.5 w-3/4 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
      <div className="col-span-5 space-y-2 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
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
          <div key={i} className="flex aspect-[4/3] flex-col justify-end rounded-md border border-white/[0.05] bg-white/[0.025] p-2">
            <Bar w="70%" tone={i === 4 ? 'accent' : 'base'} />
          </div>
        ))}
      </div>
      <div className="col-span-2 flex flex-col rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
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
          <span className="block h-6 rounded-md bg-gradient-to-r from-indigo-500/60 to-violet-500/50" />
        </div>
      </div>
    </div>
  )
}

function HealthSketch() {
  return (
    <div className="relative flex h-full gap-4">
      {/* Admin panel (what I built) */}
      <div className="flex flex-1 flex-col rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
        <div className="mb-3 flex items-center justify-between">
          <Bar w="35%" tone="strong" />
          <span className="h-4 w-12 rounded-md bg-teal-300/25" />
        </div>
        <div className="space-y-2">
          {[
            { w: '58%', tag: 'Cardiology', tone: 'sky' as const },
            { w: '46%', tag: 'Pediatrics', tone: 'green' as const },
            { w: '64%', tag: 'Dermatology', tone: 'violet' as const },
            { w: '40%', tag: 'General', tone: 'indigo' as const },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
              <span className="size-4 shrink-0 rounded-full bg-white/10" />
              <div className="flex-1">
                <Bar w={r.w} />
              </div>
              <Pill label={r.tag} tone={r.tone} />
            </div>
          ))}
        </div>
      </div>
      {/* Mobile app that consumes the APIs */}
      <div className="hidden w-[34%] max-w-[9.5rem] shrink-0 flex-col rounded-[1.1rem] border border-white/[0.1] bg-ink-900 p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:flex">
        <span className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/15" />
        <div className="rounded-lg bg-gradient-to-br from-teal-300/20 to-indigo-400/10 p-2">
          <Bar w="60%" tone="strong" />
          <div className="mt-2 flex items-center gap-1.5">
            <span className="size-5 rounded-full bg-white/15" />
            <Bar w="50%" />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-4 rounded ${i === 1 ? 'bg-teal-300/40' : 'bg-white/[0.06]'}`} />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 rounded-md border border-white/[0.06] p-1.5">
          <span className="size-3 rounded-sm bg-amber-300/50" />
          <Bar w="60%" />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 rounded-md border border-white/[0.06] p-1.5">
          <span className="size-3 rounded-sm bg-amber-300/30" />
          <Bar w="45%" />
        </div>
      </div>
    </div>
  )
}

function BookingSketch() {
  const days = Array.from({ length: 28 })
  const busy = new Set([3, 4, 9, 11, 16, 17, 18, 23, 25])
  return (
    <div className="grid h-full grid-cols-5 gap-3">
      <div className="col-span-3 flex flex-col rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <Bar w="35%" tone="strong" />
          <span className="flex gap-1">
            <span className="size-3 rounded bg-white/10" />
            <span className="size-3 rounded bg-white/10" />
          </span>
        </div>
        <div className="grid flex-1 grid-cols-7 gap-1">
          {days.map((_, i) => (
            <span
              key={i}
              className={`rounded-[4px] ${
                i === 17 ? 'bg-teal-300/60' : busy.has(i) ? 'bg-indigo-400/25' : 'bg-white/[0.04]'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        {[
          { label: 'Party', tone: 'violet' as const },
          { label: 'Play session', tone: 'sky' as const },
          { label: 'Drop & dine', tone: 'green' as const },
        ].map((s) => (
          <div key={s.label} className="flex-1 rounded-lg border border-white/[0.05] bg-white/[0.02] p-2.5">
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
          <div key={i} className={`flex items-center gap-2 rounded-md p-1.5 ${i === 0 ? 'bg-emerald-400/[0.08]' : ''}`}>
            <span className="size-5 shrink-0 rounded-full bg-white/10" />
            <div className="flex-1 space-y-1">
              <Bar w={w} tone={i === 0 ? 'strong' : 'base'} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 space-y-2">
          <span className="block h-6 w-[62%] rounded-lg rounded-tl-sm bg-white/[0.06]" />
          <span className="ml-auto block h-6 w-[54%] rounded-lg rounded-tr-sm bg-emerald-400/25" />
          <span className="ml-auto block h-6 w-[40%] rounded-lg rounded-tr-sm bg-emerald-400/25" />
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Pill label="Sent" tone="green" />
          <Pill label="Queued" tone="sky" />
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.07] p-1.5">
          <div className="flex-1">
            <Bar w="60%" />
          </div>
          <span className="size-5 rounded-md bg-emerald-400/50" />
        </div>
      </div>
    </div>
  )
}

export function ProjectVisual({ kind, label }: { kind: ProjectVisualKind; label: string }) {
  return (
    <div
      role="img"
      aria-label={`Illustrative interface sketch for ${label} (not a real screenshot)`}
      className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-ink-950/70"
    >
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <span className="size-2 rounded-full bg-white/10" />
        <span className="size-2 rounded-full bg-white/10" />
        <span className="size-2 rounded-full bg-white/10" />
        <span className="ml-auto font-mono text-[0.6rem] tracking-wider text-fg-subtle uppercase">Illustrative</span>
      </div>
      <div aria-hidden="true" className="h-52 p-4 sm:h-60">
        {kind === 'oms' && <OmsSketch />}
        {kind === 'accounts' && <AccountsSketch />}
        {kind === 'pos' && <PosSketch />}
        {kind === 'health' && <HealthSketch />}
        {kind === 'booking' && <BookingSketch />}
        {kind === 'desktop' && <DesktopSketch />}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-950/80 to-transparent"
      />
    </div>
  )
}
