import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Blog',
  description: 'Read the latest articles about railway industry trends, locomotive maintenance tips, and railway parts insights from UCRS experts.',
  keywords: ['railway blog', 'locomotive articles', 'railway industry news', 'train maintenance tips'],
  url: '/blog',
})

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Content will be implemented based on Figma design
      </p>
      {/* Add your Figma design implementation here */}
    </div>
  )
}
