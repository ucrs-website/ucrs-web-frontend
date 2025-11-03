import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
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

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
