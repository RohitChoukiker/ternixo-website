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
  name: 'Linux Commands',
  description: 'Learn Linux commands by running them in a real terminal and visualizing exactly what happens step by step.',
  icon: Terminal,
  status: 'live',
  href: 'https://linux-lab.ternixo.in',
  command: 'ls -la',
  accent: 'linux',
},
 {
  name: 'Docker',
  description: 'Learn Docker by running commands and visualizing containers, images, networks, and volumes step by step.',
  icon: Box,
  status: 'live',
  href: 'https://docker-lab.ternixo.in/',
  command: 'docker compose up',
  accent: 'docker',
},
{
  name: 'Git',
  description: 'Learn Git by running commands and visualizing branches, commits, merges, and real workflows step by step.',
  icon: GitBranch,
  status: 'soon',
  href: '#',
  command: 'git switch -c feature/your-idea',
  accent: 'git',
},
]
