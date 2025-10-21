import { MetadataRoute } from 'next'

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

  // TODO: Add dynamic routes when you have data
  // Example for products:
  // const products = await getProducts()
  // const productRoutes = products.map((product) => ({
  //   url: `${baseUrl}/products/${product.slug}`,
  //   lastModified: product.updatedAt || currentDate,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))

  // Example for services:
  // const services = await getServices()
  // const serviceRoutes = services.map((service) => ({
  //   url: `${baseUrl}/services/${service.slug}`,
  //   lastModified: service.updatedAt || currentDate,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))

  // Example for blog posts:
  // const posts = await getBlogPosts()
  // const blogRoutes = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.publishedAt || currentDate,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticRoutes,
    // ...productRoutes,
    // ...serviceRoutes,
    // ...blogRoutes,
  ]
}
