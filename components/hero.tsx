'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, GitCommitHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'

const commands = ['git status', 'git log --oneline -3']

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [typed, setTyped] = useState(['', ''])
  const [active, setActive] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('ternixo-terminal-played') === 'true'
    if (reduceMotion || seen) { setTyped(commands); setActive(2); setComplete(true); return }
    let command = 0; let character = 0; let timer: ReturnType<typeof setTimeout>
    const typeNext = () => {
      if (character < commands[command].length) {
        character += 1
        setTyped((current) => current.map((value, index) => index === command ? commands[command].slice(0, character) : value))
        timer = setTimeout(typeNext, 42 + Math.random() * 42); return
      }
      if (command < commands.length - 1) {
        command += 1; character = 0
        timer = setTimeout(() => { setActive(command); typeNext() }, 650); return
      }
      timer = setTimeout(() => { setActive(2); setComplete(true); sessionStorage.setItem('ternixo-terminal-played', 'true') }, 700)
    }
    timer = setTimeout(typeNext, 650)
    return () => clearTimeout(timer)
  }, [reduceMotion])

  const entrance = reduceMotion ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }
  return (
    <section id="top" className="relative overflow-hidden border-b border-border pt-28 sm:pt-32 lg:pt-40">
      <div className="hero-glow pointer-events-none absolute left-[10%] top-28 h-72 w-72 rounded-full" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-28">
        <div>
          <motion.div {...entrance} transition={{ duration: 0.5 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300"><span className="size-1.5 animate-pulse rounded-full bg-[#10b981]" /> Hands-on learning for developers</motion.div>
          <motion.h1 {...entrance} transition={{ duration: 0.55, delay: 0.08 }} className="max-w-3xl text-[clamp(2.75rem,11vw,4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground lg:text-[4.75rem]">Learn by doing.<br /><span className="text-primary">Ship with confidence.</span></motion.h1>
          <motion.p {...entrance} transition={{ duration: 0.55, delay: 0.16 }} className="mt-7 max-w-lg text-pretty text-base leading-7 text-muted-foreground">Ternixo turns Git, Docker, and Linux into hands-on labs. Run the command, see what changes, and build the muscle memory that tutorials skip.</motion.p>
          <motion.div {...entrance} transition={{ duration: 0.55, delay: 0.24 }} className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center"><a href="#tools" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">Explore the tools <ArrowUpRight className="size-4" /></a><a href="#how-it-works" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:text-foreground hover:shadow-md">See how it works <ArrowDown className="size-3.5" /></a></motion.div>
        </div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.18 }} className="relative">
          <div className="terminal-window overflow-hidden rounded-2xl border border-slate-700/70">
            <div className="flex items-center justify-between border-b border-slate-700/70 bg-slate-900/80 px-4 py-3"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[#fb7185]" /><span className="size-2.5 rounded-full bg-[#fbbf24]" /><span className="size-2.5 rounded-full bg-[#34d399]" /></div><span className="font-mono text-[10px] text-slate-400">ternixo / git-lab</span><span className="size-8" /></div>
            <div className="min-h-[292px] space-y-4 px-5 py-6 font-mono text-[11px] leading-6 sm:px-7 sm:py-8 sm:text-xs">
              <Command text={typed[0]} cursor={active === 0} />
              {active > 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4 text-slate-400">On branch <span className="text-indigo-300">main</span><br />Your branch is up to date with <span className="text-slate-200">origin/main</span>.</motion.div>}
              {active > 0 && <Command text={typed[1]} cursor={active === 1} />}
              {active > 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 pl-4"><div><span className="text-indigo-300">a91f0e2</span> <span className="text-slate-200">add responsive nav</span></div><div><span className="text-indigo-300">c42ba71</span> <span className="text-slate-200">fix: empty state copy</span></div><div><span className="text-indigo-300">88d3e91</span> <span className="text-slate-200">init ternixo labs</span></div></motion.div>}
              {active > 1 && <Command text="" cursor />}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={complete ? { opacity: 1, y: 0 } : {}} className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-xl dark:border-emerald-400/20 dark:bg-slate-900 sm:absolute sm:-bottom-5 sm:-left-5 sm:mt-0"><div className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"><Check className="size-4" /></div><div><p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">lab complete</p><p className="text-xs font-medium text-slate-700 dark:text-slate-200">3 commands mastered</p></div></motion.div>
        </motion.div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 pb-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:px-8"><GitCommitHorizontal className="size-3.5 text-primary" /> No videos. No busywork. Just the terminal.</div>
    </section>
  )
}

function Command({ text, cursor = false }: { text: string; cursor?: boolean }) {
  return <div className="flex items-center text-slate-400"><span className="mr-2 shrink-0 text-emerald-300">~/project</span><span className="text-slate-200">$ {text}{cursor && <span className="terminal-caret ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-indigo-300" />}</span></div>
}
