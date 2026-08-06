'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { label: 'Tools', href: '#tools' },
  { label: 'How it works', href: '#how-it-works' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 12))

  return (
    <motion.header
      animate={{ backgroundColor: scrolled ? 'rgba(7, 10, 9, 0.86)' : 'rgba(7, 10, 9, 0)' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-xl"
      transition={{ duration: 0.2 }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:rotate-6">&gt;_</span>
          <span>shelltap<span className="text-primary">.</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href} className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>)}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href="#footer" className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">Sign in</a>
          <a href="#tools" className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 font-mono text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Start learning <ArrowUpRight className="size-3.5" /></a>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="rounded-md p-2 text-muted-foreground md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && <nav className="border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 font-mono text-sm text-muted-foreground">{link.label}</a>)}<a href="#tools" onClick={() => setOpen(false)} className="mt-2 block rounded-md bg-primary px-4 py-3 text-center font-mono text-sm font-semibold text-primary-foreground">Start learning</a></nav>}
    </motion.header>
  )
}
