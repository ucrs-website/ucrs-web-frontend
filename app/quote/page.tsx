import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Request a Quote',
  description: 'Request a quote for railway parts or locomotive services from UCRS. Get competitive pricing and expert consultation.',
  keywords: ['request quote', 'railway quote', 'locomotive pricing', 'railway parts quote'],
  url: '/quote',
})

export default function QuotePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Request a Quote</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Content will be implemented based on Figma design
      </p>
      {/* Add your Figma design implementation here */}
    </div>
  )
}
