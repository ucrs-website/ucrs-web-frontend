/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ucrs.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/customer-portal/*'],
  // Add dynamic paths for products and services
  additionalPaths: async (config) => {
    const result = []

    // Example dynamic paths - replace with actual data fetching logic
    // For products
    const products = ['locomotive-parts', 'track-components', 'maintenance-tools'] // Replace with actual product slugs
    products.forEach(product => {
      result.push({
        loc: `/products/${product}`,
        changefreq: 'weekly',
        priority: 0.8,
      })
    })

    // For services
    const services = ['maintenance', 'repair', 'inspection'] // Replace with actual service slugs
    services.forEach(service => {
      result.push({
        loc: `/services/${service}`,
        changefreq: 'weekly',
        priority: 0.8,
      })
    })

    return result
  },
}