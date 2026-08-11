'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FormEvent, useEffect, useId, useRef, useState } from 'react'

type Kind = 'git' | 'docker' | 'linux'
type Preset = { command: string; kind: Kind; output: string }

const presets: Preset[] = [
  { command: 'git branch feature-x', kind: 'git', output: 'Created branch feature-x at 7a81d2c' },
  { command: 'git checkout -b feature-x', kind: 'git', output: "Switched to a new branch 'feature-x'" },
  { command: 'git commit -m "add login"', kind: 'git', output: '[feature-x 42c8e1a] add login · 2 files changed' },
  { command: 'git merge feature-x', kind: 'git', output: 'Fast-forward · 2 files changed, 18 insertions(+)' },
  { command: 'docker run -p 8080:80 nginx', kind: 'docker', output: 'nginx container started · 0.0.0.0:8080→80/tcp' },
  { command: 'mkdir project && cd project', kind: 'linux', output: '~/project' },
]

const accents = { git: 'var(--accent-git)', docker: 'var(--accent-docker)', linux: 'var(--accent-linux)' }
const demoCommands = ['git branch feature-x', 'git checkout -b feature-x', 'git commit -m "add login"', 'git merge feature-x']

export function CommandVisualizer() {
  const reduceMotion = useReducedMotion()
  const inputId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const waitResolverRef = useRef<((valid: boolean) => void) | null>(null)
  const runIdRef = useRef(0)
  const startedRef = useRef(false)
  const [input, setInput] = useState('')
  const [active, setActive] = useState<Preset>(presets[0])
  const [history, setHistory] = useState<Preset[]>([])
  const [hint, setHint] = useState(false)
  const [revision, setRevision] = useState(0)
  const [autoplay, setAutoplay] = useState<'ready' | 'playing' | 'paused'>('ready')

  function clearTimer() {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    waitResolverRef.current?.(false)
    waitResolverRef.current = null
  }
  function cancelAutoplay() { runIdRef.current += 1; clearTimer(); setAutoplay('paused') }
  function execute(command: string) {
    const preset = presets.find((item) => item.command === command.trim())
    if (!preset) { setHint(true); return }
    setHint(false); setInput(''); setActive(preset); setHistory((current) => [...current.slice(-2), preset]); setRevision((value) => value + 1)
  }
  function runAsUser(command: string) { cancelAutoplay(); execute(command) }
  function submit(event: FormEvent) { event.preventDefault(); runAsUser(input) }

  function wait(ms: number, id: number) {
    return new Promise<boolean>((resolve) => {
      waitResolverRef.current = resolve
      timerRef.current = setTimeout(() => { timerRef.current = null; waitResolverRef.current = null; resolve(runIdRef.current === id) }, ms)
    })
  }
  async function playDemo() {
    runIdRef.current += 1; const id = runIdRef.current; clearTimer(); setHint(false); setAutoplay('playing'); setHistory([]); setInput('')
    while (runIdRef.current === id) {
      setHistory([])
      for (const command of demoCommands) {
        if (runIdRef.current !== id) return
        if (reduceMotion) setInput(command)
        else {
          setInput('')
          for (let character = 1; character <= command.length; character += 1) {
            if (runIdRef.current !== id) return
            setInput(command.slice(0, character))
            if (!await wait(52, id)) return
          }
        }
        if (!await wait(reduceMotion ? 120 : 240, id)) return
        execute(command)
        if (!await wait(3500, id)) return
      }
      if (!await wait(250, id)) return
    }
  }

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) { startedRef.current = true; observer.disconnect(); void playDemo() }
    }, { threshold: .4 })
    observer.observe(node)
    return () => { observer.disconnect(); runIdRef.current += 1; clearTimer() }
    // playDemo intentionally starts only from the first observer event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const accent = accents[active.kind]

  return <section ref={sectionRef} aria-labelledby="visualizer-title" className="border-b border-border py-24 lg:py-28">
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <div className="mb-10 max-w-2xl"><p className="mb-3 font-mono text-[11px] uppercase tracking-[.14em] text-[var(--text-muted)]">type it / see it</p><h2 id="visualizer-title" className="text-3xl font-semibold leading-tight tracking-[-.035em] sm:text-4xl">Commands make things happen.</h2><p className="mt-4 text-[17px] leading-[1.6] text-[var(--text-secondary)]">Run one below and watch the system change.</p></div>
      <div style={{ '--focus-accent': accent } as React.CSSProperties} className="grid overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-elevated)] lg:grid-cols-[1.05fr_.95fr]">
        <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
          <Chrome title="ternixo — command lab" status={autoplay} />
          <div className="flex min-h-[330px] flex-col p-4 sm:p-6">
            <div aria-live="polite" className="max-h-36 space-y-3 overflow-y-auto font-mono text-[11px] leading-5 sm:text-xs">
              {history.length === 0 && <p className="text-[var(--text-muted)]">Select a command to begin.</p>}
              {history.map((item, index) => <div key={`${item.command}-${index}`}><p><span style={{ color: accents[item.kind] }}>ternixo/lab</span><span className="text-[var(--text-muted)]"> $ </span>{item.command}</p><p className="pl-4 text-[var(--text-secondary)]">{item.output}</p></div>)}
            </div>
            <form onSubmit={submit} className="mt-auto">
              <label htmlFor={inputId} className="sr-only">Type a supported command</label>
              <div className="flex items-center border border-[var(--border-strong)] bg-[var(--bg)] px-3 focus-within:border-[var(--active-accent)]" style={{ '--active-accent': accent } as React.CSSProperties}><span style={{ color: accent }} className="font-mono text-sm">$</span><input id={inputId} value={input} onChange={(event) => { if (autoplay === 'playing') cancelAutoplay(); setInput(event.target.value); setHint(false) }} onFocus={() => { if (autoplay === 'playing') cancelAutoplay() }} placeholder="type a command…" autoComplete="off" spellCheck={false} className="h-12 min-w-0 flex-1 bg-transparent px-2 font-mono text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]" /><button type="submit" className="border-l border-border px-3 py-1 font-mono text-[10px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-[.98]">run ↵</button></div>
              <p className={`mt-2 min-h-5 font-mono text-[10px] ${hint ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}`}>{hint ? 'Command not available — try one of these commands.' : 'Only the suggested commands run in this demo.'}</p>
            </form>
          </div>
        </div>
        <div className="min-w-0">
          <Chrome title="live system view" />
          <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden p-6">
            <AnimatePresence mode="popLayout" initial={false}>{active.kind === 'git' ? <GitVisual key={`git-${revision}`} command={active.command} reduce={!!reduceMotion} /> : active.kind === 'docker' ? <DockerVisual key={`docker-${revision}`} reduce={!!reduceMotion} /> : <FileVisual key={`linux-${revision}`} reduce={!!reduceMotion} />}</AnimatePresence>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">{presets.map((preset) => <button key={preset.command} type="button" onClick={() => runAsUser(preset.command)} style={{ '--focus-accent': accents[preset.kind] } as React.CSSProperties} className="border border-border bg-[var(--bg-elevated)] px-3 py-2 text-left font-mono text-[10px] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] active:scale-[.98]">{preset.command}</button>)}<button type="button" onClick={() => void playDemo()} className="ml-auto px-2 py-2 font-mono text-[10px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] active:scale-[.98]">▶ replay demo</button></div>
      <p className="mt-4 font-mono text-[11px] text-[var(--text-muted)]">try it — type a command on the left</p>
    </div>
  </section>
}

function Chrome({ title, status }: { title: string; status?: 'ready' | 'playing' | 'paused' }) { return <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-border px-4 py-3"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-[#ef6a6a]" /><span className="size-2 rounded-full bg-[#d9a441]" /><span className="size-2 rounded-full bg-[#69a861]" /></div><span className="whitespace-nowrap text-center font-mono text-[9px] text-[var(--text-muted)]">{title}</span>{status && <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap font-mono text-[8px] text-[var(--text-muted)]"><span className={`size-1.5 rounded-full ${status === 'playing' ? 'animate-pulse bg-[var(--accent-git)]' : 'bg-[var(--text-muted)]'}`} />{status === 'playing' ? 'auto-playing' : status === 'paused' ? 'your turn' : 'demo ready'}</span>}</div> }
const transition = { duration: 2, ease: 'easeOut' as const }
function GitVisual({ command, reduce }: { command: string; reduce: boolean }) {
  const branch = command.includes('branch') || command.includes('checkout') || command.includes('commit'); const merged = command.includes('merge')
  return <motion.div initial={reduce ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -18 }} transition={transition} className="w-full max-w-sm font-mono"><svg viewBox="0 0 360 190" className="w-full" role="img" aria-label="Git commit graph"><motion.path d="M45 95 H135" stroke="var(--border-strong)" strokeWidth="3" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={transition} /><motion.path d={merged ? 'M135 95 C180 95 180 48 225 48 C270 48 270 95 315 95' : 'M135 95 C180 95 180 48 225 48 H315'} fill="none" stroke="var(--accent-git)" strokeWidth="3" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={transition} />{[45,135].map(x => <circle key={x} cx={x} cy="95" r="8" fill="var(--bg-elevated)" stroke="var(--text-muted)" strokeWidth="3" />)}{branch && <><motion.circle cx="225" cy="48" r="8" fill="var(--bg-elevated)" stroke="var(--accent-git)" strokeWidth="3" initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={transition} /><motion.circle cx="315" cy={merged ? 95 : 48} r="8" fill="var(--bg-elevated)" stroke="var(--accent-git)" strokeWidth="3" initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ ...transition, delay: reduce ? 0 : .14 }} /></>}<motion.g initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={transition}><path d={merged ? 'M315 70 l-6 -10 h12z' : 'M315 23 l-6 -10 h12z'} fill="var(--accent-git)" /><text x="315" y={merged ? 55 : 10} fill="var(--accent-git)" textAnchor="middle" fontSize="11">HEAD</text></motion.g></svg><p className="text-center text-[11px] text-[var(--text-secondary)]">{merged ? 'feature-x merged into main' : 'feature-x now points to the latest commit'}</p></motion.div>
}
function DockerVisual({ reduce }: { reduce: boolean }) { return <motion.div initial={reduce ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: .96 }} transition={transition} className="w-full max-w-xs font-mono"><motion.div initial={reduce ? false : { borderStyle: 'dashed' }} animate={{ borderStyle: 'solid' }} transition={transition} className="border-2 border-[var(--accent-docker)] p-5"><div className="flex items-center justify-between border-b border-border pb-4"><span className="text-xs text-[var(--accent-docker)]">nginx</span><motion.span initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...transition, delay: reduce ? 0 : .25 }} className="text-[10px] text-[var(--text-secondary)]">running</motion.span></div><div className="mt-5 grid grid-cols-3 gap-2">{[1,2,3].map(n => <motion.span key={n} initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ ...transition, delay: reduce ? 0 : n * .08 }} className="h-1 bg-[var(--border-strong)]" />)}</div></motion.div><motion.p initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduce ? 0 : .3 }} className="mt-4 text-center text-[11px] text-[var(--accent-docker)]">localhost:8080 → container:80</motion.p></motion.div> }
function FileVisual({ reduce }: { reduce: boolean }) { return <motion.div initial={reduce ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -18 }} transition={transition} className="w-full max-w-xs font-mono text-xs"><p className="text-[var(--text-secondary)]">~/</p><motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={transition} className="ml-4 mt-4 overflow-hidden border-l border-[var(--accent-linux)] pl-4"><p className="text-[var(--accent-linux)]">project/</p><motion.div initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: reduce ? 0 : .2 }} className="ml-4 mt-3 border-l border-border pl-4 text-[var(--text-muted)]">current directory</motion.div></motion.div></motion.div> }
