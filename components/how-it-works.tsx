'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { CircleCheck, Play, Terminal } from 'lucide-react'

const steps = [
  { icon: Terminal, title: 'Pick a lab', text: 'Choose a focused challenge from the tool you want to understand.' },
  { icon: Play, title: 'Run the command', text: 'Use a real terminal and make the change yourself. No passive watching.' },
  { icon: CircleCheck, title: 'See the result', text: 'Get instant feedback, then keep the pattern for the next project.' },
]

export function HowItWorks() {
  const reduceMotion = useReducedMotion()
  return <motion.section initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: 0.08 }} id="how-it-works" className="border-b border-border py-24 lg:py-32"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="mb-14 max-w-xl"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">02 / the loop</p><h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">The shortest path between<br /><span className="text-muted-foreground">confused and capable.</span></h2></div><div className="grid gap-5 md:grid-cols-3">{steps.map((step, index) => { const Icon = step.icon; return <div key={step.title} className="group relative min-h-60 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"><span className="absolute right-4 top-2 text-7xl font-bold leading-none text-primary/[0.06]">0{index + 1}</span><div className="relative flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300"><Icon className="size-5" aria-hidden="true" /></div><p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">step 0{index + 1}</p><h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{step.text}</p></div> })}</div></div></motion.section>
}
