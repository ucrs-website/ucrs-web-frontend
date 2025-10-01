import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'About Us',
  description: 'Learn about UCRS (Upper Canada Railway Services), our history, mission, and commitment to providing quality railway parts and locomotive services.',
  keywords: ['about ucrs', 'railway company', 'locomotive services company', 'railway parts provider'],
  url: '/about',
})

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About UCRS</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Content will be implemented based on Figma design
      </p>
      {/* Add your Figma design implementation here */}
    </div>
  )
}
