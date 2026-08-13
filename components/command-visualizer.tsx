'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FormEvent, useEffect, useId, useRef, useState } from 'react'

type Kind = 'git' | 'docker' | 'linux'
type Preset = { command: string; kind: Kind; output: string; explanation: string }

const presets: Preset[] = [
  { command: 'git branch feature-x', kind: 'git', output: 'Created branch feature-x at 7a81d2c', explanation: 'Created the feature-x branch at the current commit.' },
  { command: 'git checkout -b feature-x', kind: 'git', output: "Switched to a new branch 'feature-x'", explanation: 'Created feature-x and switched HEAD to it.' },
  { command: 'git commit -m "add login"', kind: 'git', output: '[feature-x 42c8e1a] add login · 2 files changed', explanation: 'Added a new commit to feature-x.' },
  { command: 'git merge feature-x', kind: 'git', output: 'Fast-forward · 2 files changed, 18 insertions(+)', explanation: 'Merged feature-x into the current branch.' },
  { command: 'docker run -p 8080:80 nginx', kind: 'docker', output: 'nginx container started · 0.0.0.0:8080→80/tcp', explanation: 'Started an Nginx container and mapped host port 8080 to container port 80.' },
  { command: 'mkdir project && cd project', kind: 'linux', output: '/home/ternixo/project', explanation: 'Created the project directory and moved inside it.' },
]

const modeNames = { git: 'GIT GRAPH', docker: 'DOCKER FLOW', linux: 'FILESYSTEM' }
const demoCommands = presets.map(({ command }) => command)

export function CommandVisualizer() {
  const reduceMotion = useReducedMotion()
  const inputId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const waitResolverRef = useRef<((valid: boolean) => void) | null>(null)
  const runIdRef = useRef(0)
  const startedRef = useRef(false)
  const [input, setInput] = useState('')
  const [active, setActive] = useState<Preset | null>(null)
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
    if (!preset) { setHint(true); return false }
    setHint(false); setInput(''); setActive(preset); setHistory((current) => [...current.slice(-2), preset]); setRevision((value) => value + 1)
    return true
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
    runIdRef.current += 1
    const id = runIdRef.current
    clearTimer(); setHint(false); setAutoplay('playing'); setHistory([]); setActive(null); setRevision((value) => value + 1); setInput('')
    for (const command of demoCommands) {
      if (runIdRef.current !== id) return
      if (reduceMotion) setInput(command)
      else {
        setInput('')
        for (let character = 1; character <= command.length; character += 1) {
          if (runIdRef.current !== id) return
          setInput(command.slice(0, character))
          if (!await wait(32, id)) return
        }
      }
      if (!await wait(reduceMotion ? 80 : 180, id)) return
      execute(command)
      if (!await wait(reduceMotion ? 700 : 2200, id)) return
    }
    if (runIdRef.current === id) setAutoplay('ready')
  }

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) { startedRef.current = true; observer.disconnect(); void playDemo() }
    }, { threshold: .4 })
    observer.observe(node)
    return () => { observer.disconnect(); runIdRef.current += 1; clearTimer() }
    // Autoplay intentionally starts only from the first observer event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <section ref={sectionRef} aria-labelledby="visualizer-title" className="border-b border-border py-24 lg:py-28">
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <div className="mb-10 max-w-2xl"><p className="mb-3 font-mono text-[11px] uppercase tracking-[.14em] text-[var(--text-muted)]">type it / see it</p><h2 id="visualizer-title" className="text-3xl font-semibold leading-tight tracking-[-.035em] sm:text-4xl">Commands make things happen.</h2><p className="mt-4 text-[17px] leading-[1.6] text-[var(--text-secondary)]">Run one below and watch the system change.</p></div>
      <div className="grid overflow-hidden border border-[var(--border-dark)] bg-[var(--surface)] lg:grid-cols-[1.05fr_.95fr]">
        <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
          <TerminalHeader status={autoplay} />
          <div className="flex min-h-[370px] flex-col p-4 sm:p-6">
            <div aria-live="polite" className="max-h-44 space-y-3 overflow-y-auto font-mono text-[11px] leading-5 sm:text-xs">
              {history.length === 0 && <p className="text-[var(--text-secondary)]">Select a command to begin.</p>}
              {history.map((item, index) => <div key={`${item.command}-${index}`}><p><span className="font-semibold">ternixo/{item.kind}-lab</span><span className="text-[var(--text-secondary)]"> $ </span>{item.command}</p><p className="pl-4 text-[var(--text-secondary)]">{item.output}</p></div>)}
            </div>
            <form onSubmit={submit} className="mt-auto">
              <label htmlFor={inputId} className="sr-only">Type a supported command</label>
              <div className="flex items-center border border-[var(--border-dark)] bg-[var(--background)] px-3 focus-within:border-[var(--accent)]"><span className="font-mono text-sm font-semibold">$</span><input id={inputId} value={input} onChange={(event) => { if (autoplay === 'playing') cancelAutoplay(); setInput(event.target.value); setHint(false) }} onFocus={() => { if (autoplay === 'playing') cancelAutoplay() }} placeholder="type a command…" autoComplete="off" spellCheck={false} className="h-12 min-w-0 flex-1 bg-transparent px-2 font-mono text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]" /><button type="submit" className="border-l border-border px-3 py-1 font-mono text-[10px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-[.98]">run ↵</button></div>
              <p className={`mt-2 min-h-5 font-mono text-[10px] ${hint ? 'font-semibold text-[var(--error)]' : 'text-[var(--text-secondary)]'}`}>{hint ? 'Command not available — try one of these commands.' : 'Safe preview — only the suggested commands run.'}</p>
            </form>
          </div>
        </div>
        <div className="min-w-0 bg-[var(--surface)]">
          <LiveHeader kind={active?.kind} />
          <div className="relative flex min-h-[370px] items-center justify-center overflow-x-auto overflow-y-hidden p-4 sm:p-6">
            <AnimatePresence mode="wait" initial={false}>{active ? <LiveSystemView key={`${active.command}-${revision}`} preset={active} reduce={!!reduceMotion} /> : <EmptyState key="empty" />}</AnimatePresence>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-wrap">{presets.map((preset) => <button key={preset.command} type="button" onClick={() => runAsUser(preset.command)} aria-pressed={active?.command === preset.command} className="shrink-0 border border-[var(--border-dark)] bg-[var(--surface)] px-3 py-2 text-left font-mono text-[10px] text-[var(--text-secondary)] transition-all duration-200 hover:text-[var(--text-primary)] aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--accent)] aria-pressed:text-[var(--ink)] aria-pressed:shadow-[3px_3px_0_var(--ink)] active:scale-[.98]">{preset.command}</button>)}<button type="button" onClick={() => void playDemo()} disabled={autoplay === 'playing'} className="ml-auto shrink-0 px-2 py-2 font-mono text-[10px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:cursor-wait disabled:opacity-60">▶ {autoplay === 'playing' ? 'playing demo' : 'replay demo'}</button></div>
      <p className="mt-2 font-mono text-[11px] text-[var(--text-secondary)]">try it — type a command on the left</p>
    </div>
  </section>
}

function TerminalHeader({ status }: { status: 'ready' | 'playing' | 'paused' }) { return <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-border px-4 py-3"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-[var(--error)]" /><span className="size-2 rounded-full bg-[var(--warning)]" /><span className="size-2 rounded-full bg-[var(--success)]" /></div><span className="whitespace-nowrap text-center font-mono text-[9px] font-semibold text-[var(--text-secondary)]">TERNIXO — COMMAND LAB</span><span className="ml-auto flex items-center gap-1.5 whitespace-nowrap font-mono text-[8px] text-[var(--text-secondary)]"><span className={`size-1.5 rounded-full ${status === 'playing' ? 'animate-pulse bg-[var(--accent)]' : 'bg-[var(--text-secondary)]'}`} />{status === 'playing' ? 'AUTO-PLAYING' : status === 'paused' ? 'YOUR TURN' : 'DEMO READY'}</span></div> }
function LiveHeader({ kind }: { kind?: Kind }) { return <div className="flex min-h-10 items-center justify-between gap-4 border-b border-border px-4 py-3 font-mono text-[9px] font-semibold tracking-[.08em]"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[var(--accent)] ring-1 ring-[var(--ink)]" />LIVE SYSTEM VIEW</span><span className="text-[var(--text-secondary)]">{kind ? modeNames[kind] : 'WAITING FOR COMMAND'}</span></div> }

function EmptyState() { return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-sm text-center"><p className="font-display text-lg font-semibold">Choose a command to see what happens.</p><div className="mt-6 flex flex-wrap justify-center gap-2">{Object.values(modeNames).map((name) => <span key={name} className="border border-[var(--border-dark)] bg-[var(--background)] px-3 py-2 font-mono text-[9px] font-semibold">{name}</span>)}</div></motion.div> }
function LiveSystemView({ preset, reduce }: { preset: Preset; reduce: boolean }) { return <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduce ? 0 : .3 }} className="w-full min-w-[290px]">{preset.kind === 'git' ? <GitFlowVisualization command={preset.command} reduce={reduce} /> : preset.kind === 'docker' ? <DockerFlowVisualization reduce={reduce} /> : <FilesystemVisualization reduce={reduce} />}<p className="mx-auto mt-6 max-w-md border-l-4 border-[var(--accent)] bg-[var(--background)] px-4 py-3 font-mono text-[11px] font-semibold leading-5 text-[var(--ink)]">{preset.explanation}</p></motion.div> }

const draw = (reduce: boolean, delay = 0) => ({ duration: reduce ? 0 : .55, delay: reduce ? 0 : delay, ease: 'easeOut' as const })
function GitFlowVisualization({ command, reduce }: { command: string; reduce: boolean }) {
  const checkout = command.includes('checkout'); const commit = command.includes('commit'); const merge = command.includes('merge')
  return <div className="mx-auto w-full max-w-md font-mono"><svg viewBox="0 0 430 210" className="w-full" role="img" aria-label={`Git visualization for ${command}`}>
    <path d="M45 112 H155" fill="none" stroke="var(--ink)" strokeWidth="3" opacity=".9" />
    {merge && <motion.path d="M155 112 C210 112 205 55 265 55 C325 55 320 112 385 112" fill="none" stroke="var(--ink)" strokeWidth="3" opacity=".9" initial={reduce ? false : { pathLength: 0, stroke: 'var(--accent)' }} animate={{ pathLength: 1, stroke: 'var(--ink)' }} transition={draw(reduce)} />}
    {commit && <motion.path d="M155 112 C210 112 205 55 265 55 H385" fill="none" stroke="var(--ink)" strokeWidth="3" opacity=".9" initial={reduce ? false : { pathLength: 0, stroke: 'var(--accent)' }} animate={{ pathLength: 1, stroke: 'var(--ink)' }} transition={draw(reduce)} />}
    {[45,155].map((x) => <circle key={x} cx={x} cy="112" r="9" fill="var(--background)" stroke="var(--ink)" strokeWidth="4" opacity="1" />)}
    {(commit || merge) && <motion.circle cx={commit ? 385 : 265} cy="55" r="10" fill="var(--background)" stroke="var(--ink)" strokeWidth="4" opacity="1" initial={reduce ? false : { scale: 0, stroke: 'var(--accent)' }} animate={{ scale: 1, stroke: 'var(--ink)' }} transition={draw(reduce, .12)} />}
    {merge && <motion.circle cx="385" cy="112" r="10" fill="var(--background)" stroke="var(--ink)" strokeWidth="4" opacity="1" initial={reduce ? false : { scale: 0, stroke: 'var(--accent)' }} animate={{ scale: 1, stroke: 'var(--ink)' }} transition={draw(reduce, .25)} />}
    <text x="45" y="145" fill="var(--ink)" textAnchor="middle" fontSize="10">7a81d2c</text><text x="155" y="145" fill="var(--ink)" textAnchor="middle" fontSize="10">b60f214</text>
    {commit && <><text x="385" y="28" fill="var(--ink)" textAnchor="middle" fontSize="10">42c8e1a</text><text x="385" y="17" fill="var(--ink)" textAnchor="middle" fontSize="9">add login</text></>}
    <Label x={merge ? 385 : 155} y={merge ? 145 : 174} text="main" active={merge || !checkout} />
    <Label x={commit ? 385 : merge ? 265 : 155} y={82} text="feature-x" active={!merge} />
    <motion.g initial={reduce ? false : { y: checkout ? 94 : 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={draw(reduce, .2)}><text x={merge || commit ? 385 : 155} y={merge ? 176 : checkout || commit ? 105 : 199} fill="var(--ink)" textAnchor="middle" fontSize="10" fontWeight="700">HEAD ↑</text></motion.g>
  </svg></div>
}
function Label({ x, y, text, active }: { x: number; y: number; text: string; active: boolean }) { return <g><rect x={x - 34} y={y - 14} width="68" height="22" fill={active ? 'var(--accent)' : 'var(--background)'} stroke="var(--ink)" strokeWidth="2" /><text x={x} y={y + 1} fill="var(--ink)" textAnchor="middle" fontSize="10" fontWeight="700">{text}</text></g> }

function DockerFlowVisualization({ reduce }: { reduce: boolean }) { const nodes = ['NGINX IMAGE', 'CONTAINER · RUNNING', 'PORT 80', 'HOST PORT 8080']; return <div className="mx-auto flex max-w-xs flex-col items-center font-mono">{nodes.map((node, index) => <div key={node} className="contents"><motion.div initial={reduce ? false : { opacity: 0, scale: .85, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={draw(reduce, index * .12)} className={`w-full border-2 px-4 py-3 text-center text-[10px] font-semibold ${index === 1 ? 'border-[var(--accent)] bg-[var(--background)] shadow-[4px_4px_0_var(--ink)]' : 'border-[var(--muted-light)] bg-[var(--background)]'}`}>{node}{index === 1 && <span className="ml-2 inline-block size-2 rounded-full bg-[var(--success)]" aria-label="running" />}</motion.div>{index < nodes.length - 1 && <motion.div initial={reduce ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={draw(reduce, index * .12 + .08)} className="h-5 w-0.5 origin-top bg-[var(--ink)] after:block after:-translate-x-[3px] after:translate-y-3 after:border-x-4 after:border-t-[6px] after:border-x-transparent after:border-t-[var(--ink)]" />}</div>) }<motion.p initial={reduce ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={draw(reduce, .5)} className="mt-4 text-[10px] font-semibold">BROWSER REQUEST → localhost:8080</motion.p></div> }

function FilesystemVisualization({ reduce }: { reduce: boolean }) { return <div className="mx-auto max-w-sm font-mono text-xs"><div className="border-2 border-[var(--muted-light)] bg-[var(--background)] p-5"><p className="font-semibold">/home/ternixo</p><div className="ml-5 mt-4 border-l-2 border-[var(--ink)] pl-5"><motion.div initial={reduce ? false : { opacity: 0, scale: .8, x: -12 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={draw(reduce)} className="border-2 border-[var(--accent)] bg-[var(--background)] px-4 py-3 font-semibold shadow-[4px_4px_0_var(--ink)]">└── project <span className="ml-2 bg-[var(--accent)] px-2 py-1 text-[9px]">← CURRENT</span></motion.div></div></div><motion.p initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={draw(reduce, .25)} className="mt-5 border border-[var(--border-dark)] bg-[var(--background)] p-3 text-center font-semibold">/home/ternixo/project</motion.p></div> }
