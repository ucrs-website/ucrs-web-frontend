import { notFound } from 'next/navigation'
import { generateSEO, generateProductSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { Product } from '@/lib/types/seo'

// This would come from your database/CMS
async function getProduct(slug: string): Promise<Product | null> {
  // TODO: Replace with actual data fetching
  // Example:
  // const product = await db.product.findUnique({ where: { slug } })
  // return product

  // Mock data for demonstration
  const products: Record<string, Product> = {
    'locomotive-parts': {
      id: '1',
      name: 'Locomotive Parts',
      slug: 'locomotive-parts',
      description: 'High-quality locomotive parts for all railway systems. Premium components designed for durability and performance.',
      image: '/images/products/locomotive-parts.jpg',
      sku: 'LP-001',
      brand: 'UCRS',
      price: 999.99,
      currency: 'USD',
      availability: 'InStock',
      category: 'Parts',
    },
  }

  return products[slug] || null
}

// Generate static params for all products (for static generation)
export async function generateStaticParams() {
  // TODO: Fetch all product slugs from your database
  // const products = await db.product.findMany({ select: { slug: true } })
  // return products.map((product) => ({ slug: product.slug }))

  return [
    { slug: 'locomotive-parts' },
    { slug: 'track-components' },
    { slug: 'maintenance-tools' },
  ]
}

// Generate metadata for each product page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    return generateSEO({
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
      noIndex: true,
    })
  }

  return generateSEO({
    title: product.name,
    description: product.description,
    keywords: [
      product.name.toLowerCase(),
      'railway parts',
      'locomotive components',
      product.category?.toLowerCase() || '',
      ...(product.tags || []),
    ],
    image: product.image,
    url: `/products/${product.slug}`,
    type: 'product',
  })
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: product.brand,
    price: product.price,
    currency: product.currency,
    availability: product.availability,
  })

  const breadcrumbItems = [
    { name: 'Products', url: '/products' },
    { name: product.name, url: `/products/${product.slug}` },
  ]

  return (
    <>
      <StructuredData data={productSchema} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
            {/* Add your Figma design implementation here */}
          </div>

          <div>
            {/* Product image and details will go here based on Figma design */}
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
              <p className="text-muted-foreground">Product Image Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
