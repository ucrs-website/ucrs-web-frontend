import { MetadataRoute } from 'next'
import { fetchCategories, fetchSubcategories, fetchProducts } from '@/lib/api/products'
import { getCategoryUrl, getSubcategoryUrl, slugify } from '@/lib/utils/url-helpers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ucrs.com'
  const currentDate = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/export`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic product routes
  let productRoutes: MetadataRoute.Sitemap = []

  try {
    // Fetch all categories
    const categories = await fetchCategories()

    // Generate category routes
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}${getCategoryUrl(category.id, category.name || `category-${category.id}`)}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

    // Generate subcategory and product routes
    const subcategoryAndProductRoutes = await Promise.all(
      categories.map(async (category) => {
        try {
          // Fetch subcategories for this category
          const subcategories = await fetchSubcategories(category.id)

          // Generate subcategory routes
          const subcategoryRoutes: MetadataRoute.Sitemap = subcategories.map((subcategory) => ({
            url: `${baseUrl}${getSubcategoryUrl(
              category.id,
              category.name || `category-${category.id}`,
              subcategory.id,
              subcategory.name || `subcategory-${subcategory.id}`
            )}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          }))

          return subcategoryRoutes
        } catch (error) {
          console.error(`Error fetching subcategories for category ${category.id}:`, error)
          return []
        }
      })
    )

    productRoutes = [
      ...categoryRoutes,
      ...subcategoryAndProductRoutes.flat(),
    ]
  } catch (error) {
    console.error('Error generating product routes for sitemap:', error)
  }

  return [
    ...staticRoutes,
    ...productRoutes,
  ]
}
