'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [{ label: 'Tools', href: '#tools' }, { label: 'How it works', href: '#how-it-works' }]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || open ? 'border-border bg-[color-mix(in_srgb,var(--background)_96%,transparent)]' : 'border-border bg-[color-mix(in_srgb,var(--background)_90%,transparent)]'} backdrop-blur-md`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex h-full flex-col items-start justify-center border-r border-border pr-6 leading-none">
          <span className="font-display text-base font-semibold tracking-[-.03em]">TERNIXO.</span>
          <span className="mt-1 font-mono text-[8px] font-medium tracking-wide text-[var(--text-muted)]">by <span className="text-[var(--ink)]">Seq</span><span className="text-[var(--warning)]">Orbit</span></span>
        </a>
        <nav className="hidden h-full items-center md:flex" aria-label="Main navigation">
          {links.map(link => <a key={link.href} href={link.href} className="flex h-full items-center border-r border-border px-6 font-mono text-[10px] font-medium uppercase tracking-[.14em] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)] first:border-l">{link.label}</a>)}
        </nav>
        <a href="#tools" className="hidden items-center gap-2 border border-[var(--ink)] bg-[var(--accent)] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[.1em] text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] active:translate-x-px active:translate-y-px active:shadow-none md:inline-flex">Start learning <ArrowUpRight className="size-3.5" /></a>
        <button type="button" onClick={() => setOpen(!open)} className="p-2 text-[var(--text-secondary)] md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open && <nav className="border-t border-border bg-[var(--background)] px-5 py-4 md:hidden" aria-label="Mobile navigation">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-mono text-xs uppercase tracking-[.12em] text-[var(--text-secondary)]">{link.label}</a>)}<a href="#tools" onClick={() => setOpen(false)} className="mt-4 block border border-[var(--ink)] bg-[var(--accent)] px-4 py-3 text-center font-mono text-xs font-semibold uppercase text-[var(--ink)]">Start learning</a></nav>}
    </header>
  )
}
