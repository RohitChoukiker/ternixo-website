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
  return <section id="top" className="border-b border-border pt-28 sm:pt-32 lg:pt-40">
    <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 lg:grid-cols-[1fr_.96fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-28">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)]"><span className="size-1.5 bg-[var(--accent-linux)]" /> Hands-on learning for developers</div>
        <h1 className="max-w-3xl text-[clamp(3rem,11vw,3.5rem)] font-semibold leading-[1.05] tracking-[-.045em] text-[var(--text-primary)]">Learn by doing.<br /><span className="text-[var(--text-secondary)]">Ship with confidence.</span></h1>
        <p className="mt-7 max-w-lg text-[17px] leading-[1.6] text-[var(--text-secondary)]">Ternixo turns Git, Docker, and Linux into hands-on labs. Run the command, see what changes, and build the muscle memory that tutorials skip.</p>
        <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
          <a href="#tools" className="inline-flex h-12 items-center justify-center gap-2 border border-[var(--text-primary)] bg-[var(--text-primary)] px-5 text-sm font-medium text-[var(--bg)] transition-colors hover:bg-transparent hover:text-[var(--text-primary)] active:scale-[.98]">Explore the tools <ArrowUpRight className="size-4" /></a>
          <a href="#how-it-works" className="inline-flex h-12 items-center justify-center gap-2 border border-[var(--border-strong)] px-5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] active:scale-[.98]">See how it works <ArrowDown className="size-3.5" /></a>
        </div>
      </div>
      <div style={{ '--focus-accent': active.accent } as React.CSSProperties}>
        <div className="overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
          <div className="grid grid-cols-3 items-center border-b border-border px-4 py-3"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[#ef6a6a]" /><span className="size-2.5 rounded-full bg-[#d9a441]" /><span className="size-2.5 rounded-full bg-[#69a861]" /></div><span className="text-center font-mono text-[10px] text-[var(--text-muted)]">ternixo — zsh</span></div>
          <div className="min-h-[286px] px-4 py-6 font-mono text-[11px] leading-7 sm:px-6 sm:text-[13px]" aria-live="polite">
            <TerminalLine command={parts[0]} accent={active.accent} cursor={!parts[1] && !done} />
            {(parts[1] || done) && <><p className="pl-5 text-[var(--text-secondary)]">{active.output[0]}</p><TerminalLine command={parts[1] || ''} accent={active.accent} cursor={!done} /></>}
            {done && <><p className="pl-5 text-[var(--text-secondary)]">{active.output[1]}</p><p style={{ color: active.accent }} className="mt-3">{active.complete}<span className="terminal-cursor" /></p></>}
          </div>
        </div>
        <div className="mt-3 flex border border-border bg-[var(--bg-elevated)] p-1" role="tablist" aria-label="Preview learning track">
          {(Object.keys(tracks) as Track[]).map((name) => <button key={name} type="button" role="tab" aria-selected={track === name} onClick={() => setTrack(name)} style={track === name ? { color: tracks[name].accent, borderColor: tracks[name].accent, '--focus-accent': tracks[name].accent } as React.CSSProperties : { '--focus-accent': tracks[name].accent } as React.CSSProperties} className="flex-1 border-b-2 border-transparent px-3 py-2 font-mono text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] active:scale-[.98]">{name}</button>)}
        </div>
      </div>
    </div>
    <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 pb-6 font-mono text-[11px] uppercase tracking-[.12em] text-[var(--text-muted)] lg:px-8"><GitCommitHorizontal className="size-3.5" /> No videos. No busywork. Just the terminal.</div>
  </section>
}

function TerminalLine({ command = '', accent, cursor }: { command?: string; accent: string; cursor: boolean }) {
  return <p className="min-h-7 break-all"><span style={{ color: accent }}>ternixo/{command.startsWith('git') ? 'git-lab' : command.startsWith('docker') ? 'docker-lab' : 'linux-lab'}</span><span className="text-[var(--text-muted)]"> $ </span><span className="text-[var(--text-primary)]">{command}</span>{cursor && <span style={{ color: accent }} className="terminal-cursor" />}</p>
}
