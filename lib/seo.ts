import { Metadata } from 'next'

export const siteConfig = {
  name: 'UCRS',
  fullName: 'Upper Canada Railway Services',
  description: 'Leading provider of railway parts, locomotive maintenance, and railway services. Quality parts for all railway systems.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ucrs.com',
  ogImage: '/images/og-image.jpg',
  twitterImage: '/images/twitter-image.jpg',
  links: {
    facebook: 'https://facebook.com/ucrs',
    twitter: 'https://twitter.com/ucrs',
    linkedin: 'https://linkedin.com/company/ucrs',
    youtube: 'https://youtube.com/ucrs',
  },
  contact: {
    email: 'info@ucrs.com',
    phone: '+1-555-123-4567',
    address: {
      street: '123 Railway Street',
      city: 'Rail City',
      state: 'RC',
      zip: '12345',
      country: 'US',
    },
  },
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'service'
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  url,
  type = 'website',
  keywords = [],
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.fullName}`
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: author ? [{ name: author }] : [{ name: siteConfig.name }],
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type,
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.fullName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.fullName,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: '@ucrs',
      site: '@ucrs',
    },
    alternates: {
      canonical: pageUrl,
    },
  }

  // Add article-specific metadata
  if (type === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
    }
  }

  return metadata
}

// JSON-LD Schema generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: siteConfig.contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      availableLanguage: ['en'],
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.youtube,
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.fullName,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  image?: string
  sku?: string
  brand?: string
  price?: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? `${siteConfig.url}${product.image}` : undefined,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: siteConfig.fullName,
      },
    },
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  serviceType?: string
  areaServed?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      '@type': 'Organization',
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    areaServed: service.areaServed?.map((area) => ({
      '@type': 'Country',
      name: area,
    })),
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  image?: string
  publishedTime: string
  modifiedTime?: string
  author: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? `${siteConfig.url}${article.image}` : siteConfig.ogImage,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.fullName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${article.url}`,
    },
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
