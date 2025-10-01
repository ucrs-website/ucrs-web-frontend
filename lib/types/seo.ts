export interface PageSEO {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'service'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noIndex?: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  images?: string[]
  sku?: string
  brand?: string
  price?: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  category?: string
  tags?: string[]
  features?: string[]
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  serviceType?: string
  areaServed?: string[]
  category?: string
  tags?: string[]
  features?: string[]
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  image?: string
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    image?: string
    bio?: string
  }
  category?: string
  tags?: string[]
  readingTime?: number
}

export interface FAQ {
  question: string
  answer: string
  category?: string
}
