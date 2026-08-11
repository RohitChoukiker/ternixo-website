'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])

  function toggleTheme() {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('ternixo-theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return <button type="button" onClick={toggleTheme} className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:text-foreground hover:shadow-md" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}</button>
}
