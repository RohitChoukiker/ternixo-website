'use client'

import { ArrowDown, ArrowUpRight, GitCommitHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'

type Track = 'Git' | 'Docker' | 'Linux'
const tracks: Record<Track, { accent: string; commands: string[]; output: string[]; complete: string }> = {
  Git: { accent: 'var(--accent-git)', commands: ['git checkout -b feature/lab-3', 'git commit -m "fix merge conflict"'], output: ['Switched to a new branch \'feature/lab-3\'', '[feature/lab-3 19ad84e] fix merge conflict'], complete: '✓ lab complete' },
  Docker: { accent: 'var(--accent-docker)', commands: ['docker compose up --watch', 'docker compose ps'], output: ['Services are running in watch mode', 'ternixo-web   Up 8 seconds'], complete: '✓ lab complete' },
  Linux: { accent: 'var(--accent-linux)', commands: ['chmod +x deploy.sh', './deploy.sh --check'], output: ['permissions updated', 'all system checks passed'], complete: '✓ lab complete' },
}
const trackOrder: Track[] = ['Git', 'Docker', 'Linux']

export function Hero() {
  const [track, setTrack] = useState<Track>('Git')
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const active = tracks[track]

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setTyped(active.commands.join('\n')); setDone(true); return }
    setTyped(''); setDone(false)
    const full = active.commands.join('\n')
    let i = 0
    let nextTimer: ReturnType<typeof setTimeout> | undefined
    const timer = window.setInterval(() => {
      i += 1; setTyped(full.slice(0, i))
      if (i >= full.length) {
        window.clearInterval(timer)
        setDone(true)
        nextTimer = setTimeout(() => {
          setTrack((current) => trackOrder[(trackOrder.indexOf(current) + 1) % trackOrder.length])
        }, 1800)
      }
    }, 34)
    return () => { window.clearInterval(timer); if (nextTimer) clearTimeout(nextTimer) }
  }, [track, active.commands])

  const parts = typed.split('\n')
  return <section id="top" className="technical-grid border-b border-border pt-28 sm:pt-32 lg:pt-40">
    <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 lg:grid-cols-[1fr_.96fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-28">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--background)] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[.12em]"><span className="size-1.5 bg-[var(--accent)]" /> Hands-on learning for developers</div>
        <h1 className="max-w-3xl text-[clamp(3rem,11vw,4.7rem)] font-semibold uppercase leading-[.94] tracking-[-.055em] text-[var(--text-primary)]">Don&apos;t just memorize commands.<br /><span className="text-transparent [-webkit-text-stroke:1.5px_var(--ink)]">See what they do.</span></h1>
        <p className="mt-7 max-w-lg text-[17px] leading-[1.6] text-[var(--text-secondary)]">Ternixo turns Git, Docker, and Linux into hands-on labs. Run the command, see what changes, and build the muscle memory that tutorials skip.</p>
        <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
          <a href="#tools" className="inline-flex h-12 items-center justify-center gap-2 border border-[var(--ink)] bg-[var(--accent)] px-5 font-mono text-xs font-semibold uppercase tracking-[.08em] text-[var(--ink)] shadow-[4px_4px_0_var(--ink)] transition-all hover:-translate-y-0.5 active:translate-x-px active:translate-y-px active:shadow-none">Explore the tools <ArrowUpRight className="size-4" /></a>
          <a href="#how-it-works" className="inline-flex h-12 items-center justify-center gap-2 border border-[var(--ink)] bg-[var(--background)] px-5 font-mono text-xs font-medium uppercase tracking-[.08em] transition-colors hover:bg-[var(--surface)] active:scale-[.98]">$ see how it works <ArrowDown className="size-3.5" /></a>
        </div>
      </div>
      <div style={{ '--focus-accent': active.accent } as React.CSSProperties} className="w-full min-w-0">
        <div className="overflow-hidden border border-[var(--ink)] bg-[var(--terminal)] shadow-[3px_3px_0_var(--ink)] sm:shadow-[5px_5px_0_var(--ink)]">
          <div className="dark-panel">
          <div className="grid grid-cols-3 items-center border-b border-border px-4 py-3"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[#ef6a6a]" /><span className="size-2.5 rounded-full bg-[#d9a441]" /><span className="size-2.5 rounded-full bg-[#69a861]" /></div><span className="text-center font-mono text-[10px] text-[var(--text-muted)]">ternixo — zsh</span></div>
          <div className="min-h-[286px] px-4 py-6 font-mono text-[11px] leading-7 [--text-muted:#696a62] [--text-primary:#f1efe8] [--text-secondary:#96988f] sm:px-6 sm:text-[13px]" aria-live="polite">
            <TerminalLine command={parts[0]} accent={active.accent} cursor={!parts[1] && !done} />
            {(parts[1] || done) && <><p className="pl-5 text-[var(--text-secondary)]">{active.output[0]}</p><TerminalLine command={parts[1] || ''} accent={active.accent} cursor={!done} /></>}
            {done && <><p className="pl-5 text-[var(--text-secondary)]">{active.output[1]}</p><p style={{ color: active.accent }} className="mt-3">{active.complete}<span className="terminal-cursor" /></p></>}
          </div>
          </div>
          <div className="grid w-full grid-cols-3 border-t border-[var(--ink)] bg-[var(--surface)]" role="tablist" aria-label="Preview learning track">
            {(Object.keys(tracks) as Track[]).map((name) => <button key={name} type="button" role="tab" aria-selected={track === name} onClick={() => setTrack(name)} style={{ '--focus-accent': tracks[name].accent } as React.CSSProperties} className="min-h-12 border-0 border-r border-[var(--border-light)] bg-transparent px-3 font-mono text-xs font-bold text-[var(--muted-light)] transition-colors hover:bg-[var(--background)] hover:text-[var(--ink)] focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] aria-selected:bg-[var(--background)] aria-selected:text-[var(--ink)] aria-selected:shadow-[inset_0_-4px_0_var(--accent)] last:border-r-0 sm:min-h-[58px]">{name}</button>)}
          </div>
        </div>
      </div>
    </div>
   
  </section>
}

function TerminalLine({ command = '', accent, cursor }: { command?: string; accent: string; cursor: boolean }) {
  return <p className="min-h-7 break-all"><span style={{ color: accent }}>ternixo/{command.startsWith('git') ? 'git-lab' : command.startsWith('docker') ? 'docker-lab' : 'linux-lab'}</span><span className="text-[var(--text-muted)]"> $ </span><span className="text-[var(--text-primary)]">{command}</span>{cursor && <span style={{ color: accent }} className="terminal-cursor" />}</p>
}
