import { MousePointer2, Play, Trophy } from 'lucide-react'

const steps = [
  { icon: MousePointer2, title: 'Pick a lab', text: 'Choose a focused challenge from the tool you want to understand.' },
  { icon: Play, title: 'Run the command', text: 'Use a real terminal and make the change yourself. No passive watching.' },
  { icon: Trophy, title: 'See the result', text: 'Get instant feedback, then keep the pattern for the next project.' },
]

export function HowItWorks() {
  return <section id="how-it-works" className="border-b border-border py-24 lg:py-32"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="mb-14 max-w-xl"><p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">02 / the loop</p><h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">The shortest path between<br /><span className="text-muted-foreground">confused and capable.</span></h2></div><div className="grid gap-10 md:grid-cols-3 md:gap-8">{steps.map((step, index) => { const Icon = step.icon; return <div key={step.title} className="relative"><div className="mb-5 flex items-center gap-4"><span className="font-mono text-xs text-primary">0{index + 1}</span><div className="flex size-10 items-center justify-center rounded-md border border-border bg-card text-primary"><Icon className="size-4" /></div></div><h3 className="text-lg font-medium text-foreground">{step.title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{step.text}</p>{index < steps.length - 1 && <div className="absolute left-10 top-5 hidden h-px w-[calc(100%-4rem)] translate-x-8 bg-border md:block" />}</div> })}</div></div></section>
}
