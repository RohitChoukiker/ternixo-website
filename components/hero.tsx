'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, GitCommitHorizontal } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border pt-32 lg:pt-40">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 pb-20 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-8 lg:pb-28">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 flex items-center gap-2 font-mono text-xs text-primary"><span className="size-1.5 animate-pulse rounded-full bg-primary" /> A command center for curious developers</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">Learn by doing.<br /><span className="text-primary">Ship with confidence.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="mt-7 max-w-lg text-pretty text-base leading-7 text-muted-foreground">Shelltap turns Git, Docker, and Linux into hands-on labs. Run the command, see what changes, and build the muscle memory that tutorials skip.</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }} className="mt-9 flex flex-wrap items-center gap-4"><a href="#tools" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-12px_var(--primary)]">Explore the tools <ArrowUpRight className="size-4" /></a><a href="#how-it-works" className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">See how it works <ArrowDown className="ml-1 inline size-3.5" /></a></motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.18 }} className="relative">
          <div className="terminal-window overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5"><div className="flex items-center justify-between border-b border-border px-4 py-3"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/35" /><span className="size-2 rounded-full bg-muted-foreground/35" /><span className="size-2 rounded-full bg-muted-foreground/35" /></div><span className="font-mono text-[10px] text-muted-foreground">shelltap / git-lab</span><span className="size-3" /></div><div className="space-y-4 px-5 py-6 font-mono text-xs leading-6 sm:px-7 sm:py-8"><div className="text-muted-foreground"><span className="text-primary">~/project</span> <span className="text-foreground">$ git status</span></div><div className="pl-4 text-muted-foreground">On branch <span className="text-primary">main</span><br />Your branch is up to date with <span className="text-foreground">origin/main</span>.</div><div className="flex items-center gap-2 text-muted-foreground"><span className="text-primary">~/project</span> <span className="text-foreground">$ git log --oneline -3</span></div><div className="space-y-1 pl-4"><div><span className="text-primary">a91f0e2</span> <span className="text-foreground">add responsive nav</span></div><div><span className="text-primary">c42ba71</span> <span className="text-foreground">fix: empty state copy</span></div><div><span className="text-primary">88d3e91</span> <span className="text-foreground">init shelltap labs</span></div></div><div className="flex items-center gap-2 text-muted-foreground"><span className="text-primary">~/project</span> <span className="text-foreground">$ <span className="animate-pulse">_</span></span></div></div></div>
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-md border border-border bg-background px-4 py-3 shadow-xl sm:flex"><div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary"><Check className="size-4" /></div><div><p className="font-mono text-[10px] text-muted-foreground">lab complete</p><p className="font-mono text-xs text-foreground">3 commands mastered</p></div></div>
        </motion.div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 pb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 lg:px-8"><GitCommitHorizontal className="size-3.5 text-primary" /> No videos. No busywork. Just the terminal.</div>
    </section>
  )
}
