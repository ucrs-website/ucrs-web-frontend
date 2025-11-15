import { notFound } from 'next/navigation'
import { generateSEO, generateServiceSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { Service } from '@/lib/types/seo'

// This would come from your database/CMS
async function getService(slug: string): Promise<Service | null> {
  // TODO: Replace with actual data fetching
  // Example:
  // const service = await db.service.findUnique({ where: { slug } })
  // return service

  // Mock data for demonstration
  const services: Record<string, Service> = {
    'maintenance': {
      id: '1',
      name: 'Locomotive Maintenance',
      slug: 'maintenance',
      description: 'Professional locomotive maintenance services to keep your railway systems running smoothly and efficiently.',
      image: '/images/services/maintenance.jpg',
      serviceType: 'Maintenance',
      areaServed: ['United States', 'Canada', 'Mexico'],
      category: 'Services',
    },
  }

  return services[slug] || null
}

// Generate static params for all services (for static generation)
export async function generateStaticParams() {
  // TODO: Fetch all service slugs from your database
  // const services = await db.service.findMany({ select: { slug: true } })
  // return services.map((service) => ({ slug: service.slug }))

  return [
    { slug: 'maintenance' },
    { slug: 'repair' },
    { slug: 'inspection' },
  ]
}

// Generate metadata for each service page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return generateSEO({
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
      noIndex: true,
    })
  }

  return generateSEO({
    title: service.name,
    description: service.description,
    keywords: [
      service.name.toLowerCase(),
      'railway services',
      'locomotive services',
      service.category?.toLowerCase() || '',
      ...(service.tags || []),
    ],
    image: service.image,
    url: `/services/${service.slug}`,
    type: 'service',
  })
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    areaServed: service.areaServed,
  })

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: service.name, url: `/services/${service.slug}` },
  ]

  return (
    <>
      <StructuredData data={serviceSchema} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
          <p className="text-lg text-muted-foreground mb-8">{service.description}</p>

          {/* Add your Figma design implementation here */}
          <div className="bg-muted rounded-lg p-8 mb-8">
            <p className="text-muted-foreground">Service content based on Figma design</p>
          </div>
        </div>
      </div>
    </>
  )
}
