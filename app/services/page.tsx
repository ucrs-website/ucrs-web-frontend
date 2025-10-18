import { generateSEO } from '@/lib/seo'
import { ServicesHero } from '@/components/sections/ServicesHero'
import { ExpertServicesGrid } from '@/components/sections/ExpertServicesGrid'

export const metadata = generateSEO({
  title: 'Railway Maintenance & Repair Services',
  description:
    'Expert railway maintenance, repair, and rebuild services. From locomotive component repair to comprehensive rebuild programs with OEM-compliant testing and 12-month warranty.',
  url: '/services',
  keywords: [
    'railway maintenance services',
    'locomotive repair',
    'assembly rebuild',
    'obsolescence management',
    'railway component repair',
    'OEM compliant testing',
    'locomotive rebuild programs',
    'railway consulting services',
  ],
})

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ServicesHero />

      {/* Expert Services Grid */}
      <ExpertServicesGrid />

      {/* Additional sections will be added here */}
    </main>
  )
}