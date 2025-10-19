import { generateSEO } from '@/lib/seo'
import { ServicesHero } from '@/components/sections/ServicesHero'
import { ExpertServicesGrid } from '@/components/sections/ExpertServicesGrid'
import { ComprehensiveRepairs } from '@/components/sections/ComprehensiveRepairs'
import { BreathingNewLife } from '@/components/sections/BreathingNewLife'
import { RequestQuoteForm } from '@/components/sections/RequestQuoteForm'

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

      {/* Comprehensive Repairs Section */}
      <ComprehensiveRepairs />

      {/* Breathing New Life Section */}
      <BreathingNewLife />

      {/* Request Quote Form Section */}
      <RequestQuoteForm />
    </main>
  )
}