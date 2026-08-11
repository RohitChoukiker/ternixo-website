'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'

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
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-colors ${scrolled ? 'border-b border-border bg-background/90 shadow-sm' : 'border-b border-transparent bg-background/60'}`}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
          <Image src="/logo-256.png" alt="Ternixo logo" width={32} height={32} priority className="size-8 rounded-lg shadow-sm transition-transform group-hover:rotate-3" />
          <span>ternixo<span className="text-primary">.</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{link.label}</a>)}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />
        
          <a href="#tools" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">Start learning <ArrowUpRight className="size-3.5" /></a>
        </div>
        <div className="flex items-center gap-2 md:hidden"><ThemeToggle /><button type="button" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-muted-foreground" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button></div>
      </div>
      {open && <nav className="border-t border-border bg-background px-5 py-4 shadow-lg md:hidden" aria-label="Mobile navigation">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-muted-foreground">{link.label}</a>)}<a href="#tools" onClick={() => setOpen(false)} className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">Start learning</a></nav>}
    </motion.header>
  )
}
