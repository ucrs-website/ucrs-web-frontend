import { generateSEO } from '@/lib/seo'
import { FactoryTourHero } from '@/components/sections/FactoryTourHero'
import { FactoryTourFeatures } from '@/components/sections/FactoryTourFeatures'
import { PrecisionGallery } from '@/components/sections/PrecisionGallery'
import { CuttingEdgeTools } from '@/components/sections/CuttingEdgeTools'
import { BuildingFuture } from '@/components/sections/BuildingFuture'
import { FactoryTourTabs } from '@/components/sections/FactoryTourTabs'
import { SocialProofSection } from '@/components/sections/SocialProofSection'

export const metadata = generateSEO({
  title: 'Factory Tour',
  description:
    'Explore our state-of-the-art railway manufacturing facility. Discover how we build reliability with precision and expertise at every step.',
  url: '/factory-tour',
  keywords: [
    'railway factory',
    'manufacturing facility',
    'locomotive parts production',
    'railway equipment manufacturing',
    'factory tour',
    'precision engineering',
  ],
})

export default function FactoryTourPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <FactoryTourHero />

      {/* Features Section */}
      <FactoryTourFeatures />

      {/* Precision at Every Step Gallery */}
      <PrecisionGallery />

      {/* Cutting Edge Tools Section */}
      <CuttingEdgeTools />

      {/* Building a Greener Future Section */}
      <BuildingFuture />

      {/* Factory Tour Tabs */}
      <FactoryTourTabs />

      {/* Social Proof */}
      <SocialProofSection heading="+60 years combined experience in the field with +200 Customers" />
    </main>
  )
}
