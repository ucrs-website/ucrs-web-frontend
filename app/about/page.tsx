import { generateSEO } from '@/lib/seo'
import { AboutHero } from '@/components/sections/AboutHero'

export const metadata = generateSEO({
  title: 'About Us',
  description:
    'Upper Canada Railway Services (UCRS) is an Ontario based corporation and is a first class quality manufacturer and supplier of a wide array of assembly components and spare parts for locomotives, freight cars and passenger coaches.',
  url: '/about',
  keywords: [
    'railway company',
    'locomotive parts manufacturer',
    'railway services',
    'AAR-M1003 certified',
    'rail industry',
    'OEM parts',
  ],
})

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
    </main>
  )
}
