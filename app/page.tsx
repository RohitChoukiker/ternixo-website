import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Navbar } from '@/components/navbar'
import { ToolsGrid } from '@/components/tools-grid'

export default function Page() {
  return <><Navbar /><main><Hero /><ToolsGrid /><HowItWorks /></main><Footer /></>
}
