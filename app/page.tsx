import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Navbar } from '@/components/navbar'
import { ToolsGrid } from '@/components/tools-grid'
import { siteConfig } from '@/lib/site-config'
import { tools } from '@/data/tools'

export default function Page() {
  const courseSchema = tools.map((tool) => ({
    '@context': 'https://schema.org', '@type': 'Course', name: `${tool.name} hands-on labs`,
    description: tool.description, provider: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
    url: tool.status === 'live' ? tool.href : `${siteConfig.url}/#tools`,
  }))
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema).replace(/</g, '\\u003c') }} /><Navbar /><main><Hero /><ToolsGrid /><HowItWorks /></main><Footer /></>
}
