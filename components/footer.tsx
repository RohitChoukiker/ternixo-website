import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer id="footer" className="bg-[var(--terminal)] py-12 text-[#f1efe8] [--text-muted:#96988f] [--text-primary:#f1efe8] [--text-secondary:#b8bab0] [--border:#46483f]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <a href="#top" className="flex flex-col leading-none" aria-label="Ternixo home">
            <span className="font-display text-xl font-semibold tracking-[-.03em]">TERNIXO.</span>
            <span className="mt-1 text-[9px] font-medium tracking-wide text-[var(--text-muted)]">by <span className="text-[var(--text-primary)]">Seq</span><span className="text-[#facc15]">Orbit</span></span>
          </a>
          <div className="flex items-center gap-5">
            <a href="mailto:connect@seqorbit.com" className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">Say hello to Ternixo <ArrowUpRight className="size-3.5" /></a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[.14em] text-[var(--text-muted)] sm:flex-row">
          <span>Learn the tools. Keep the flow.</span>
          <span>© 2026 Ternixo.</span>
        </div>
      </div>
    </footer>
  )
}
