/**
 * Products Page - Categories List
 * Main landing page for browsing product categories
 */

import type { Metadata } from 'next'
import { fetchCategories } from '@/lib/api/products'
import { ExploreProductsHero } from '@/components/products/ExploreProductsHero'
import { CategoriesGrid } from '@/components/products/CategoriesGrid'
import { generateSEO } from '@/lib/seo'

// ISR: Revalidate every hour
export const revalidate = 3600

// SEO Metadata
export const metadata: Metadata = generateSEO({
  title: 'Explore Products | Premium Locomotive Components | UCRS',
  description:
    'Browse 5000+ certified parts for locomotives, freight cars, and coaches. Premium locomotive components made to OEM standards. Engines, traction motors, brake systems, and more.',
  url: '/products',
  keywords: [
    'locomotive parts',
    'railway components',
    'train parts',
    'locomotive engines',
    'traction motors',
    'brake systems',
    'railway equipment',
    'locomotive maintenance',
    'OEM parts',
    'certified parts',
    'freight car parts',
    'coach parts',
  ],
})

// Structured Data - Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UCRS',
  url: 'https://ucrs.com',
  logo: 'https://ucrs.com/logo.png',
  description: 'Leading provider of premium locomotive components and railway parts',
}

// Structured Data - ItemList (Categories)
const generateItemListSchema = (categoriesCount: number) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: categoriesCount,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Locomotive Components',
      description: 'Premium locomotive parts and components',
    },
  ],
})

export default async function ProductsPage() {
  // Fetch categories from API
  let categories: Awaited<ReturnType<typeof fetchCategories>> = []
  let error: string | null = null

  try {
    categories = await fetchCategories()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load categories'
    console.error('Error fetching categories:', err)
  }

  const itemListSchema = generateItemListSchema(categories.length)

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      {/* Hero Section */}
      <ExploreProductsHero />

      {/* Categories Grid */}
      {error ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load categories</p>
              <p className="text-gray-500">{error}</p>
            </div>
          </div>
        </section>
      ) : (
        <CategoriesGrid categories={categories} />
      )}
    </>
  )
}
