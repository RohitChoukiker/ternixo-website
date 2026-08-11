import type { LucideIcon } from 'lucide-react'
import { Box, GitBranch, Terminal } from 'lucide-react'
export type Tool = {
  name: string
  description: string
  icon: LucideIcon
  status: 'live' | 'soon'
  href: string
  command: string
  accent: string
}

export const tools: Tool[] = [
  {
  name: 'Git',
  description: 'Build confidence with branches, commits, merges, and the workflows teams use every day.',
  icon: GitBranch,
  status: 'live',
  href: 'https://linux-lab.ternixo.in',
  command: 'git checkout -b feature/lab-3',
  accent: 'git',
},
  {
    name: 'Docker',
    description: 'Build a container intuition from images to networks without the guesswork.',
    icon: Box,
    status: 'soon',
    href: '#tools',
    command: 'docker compose up --watch',
    accent: 'docker',
  },
  {
    name: 'Linux / Bash',
    description: 'Get fluent at the command line with guided tasks that feel like real work.',
    icon: Terminal,
    status: 'soon',
    href: '#tools',
    command: 'find . -type f | xargs grep -n "TODO"',
    accent: 'linux',
  },
]
