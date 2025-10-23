/**
 * URL Helper Utilities
 * Functions for generating SEO-friendly URLs
 */

import type { Category, Product } from '@/lib/types/products'

/**
 * Convert text to URL-safe slug
 * Examples:
 *   "Traction Motors" => "traction-motors"
 *   "Generators & Alternators" => "generators-alternators"
 *   "D77B/D78B" => "d77b-d78b"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars except -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

/**
 * Generate category URL
 * Pattern: /products/{categoryId}/{categorySlug}
 * Example: /products/1200/traction-motors
 */
export function getCategoryUrl(categoryId: number, categoryName: string): string {
  const slug = slugify(categoryName)
  return `/products/${categoryId}/${slug}`
}

/**
 * Generate subcategory/products URL
 * Pattern: /products/{categoryId}/{categorySlug}/{subcategoryId}/{subcategorySlug}
 * Example: /products/1200/traction-motors/10200/d77b-d78b
 */
export function getSubcategoryUrl(
  categoryId: number,
  categoryName: string,
  subcategoryId: number,
  subcategoryName: string
): string {
  const categorySlug = slugify(categoryName)
  const subcategorySlug = slugify(subcategoryName)
  return `/products/${categoryId}/${categorySlug}/${subcategoryId}/${subcategorySlug}`
}

/**
 * Generate product modal URL (adds product query param)
 * Pattern: {baseUrl}?product={oemSku}
 * Example: /products/1200/traction-motors/10200/d77b-d78b?product=8142636
 */
export function getProductModalUrl(baseUrl: string, oemSku: string): string {
  const url = new URL(baseUrl, 'https://ucrs.com') // Use base for URL parsing
  url.searchParams.set('product', oemSku)
  return url.pathname + url.search
}

/**
 * Extract category ID from params
 * Returns null if invalid
 */
export function extractCategoryId(params: { categoryId?: string }): number | null {
  if (!params.categoryId) return null
  const id = parseInt(params.categoryId, 10)
  return isNaN(id) ? null : id
}

/**
 * Extract subcategory ID from params
 * Returns null if invalid
 */
export function extractSubcategoryId(params: {
  subcategoryId?: string
}): number | null {
  if (!params.subcategoryId) return null
  const id = parseInt(params.subcategoryId, 10)
  return isNaN(id) ? null : id
}

/**
 * Build pagination URL with query params
 * Preserves existing query params and updates/adds new ones
 */
export function buildPaginationUrl(
  baseUrl: string,
  params: {
    page?: number
    search?: string
    groupId?: number
    product?: string
  }
): string {
  const url = new URL(baseUrl, 'https://ucrs.com')

  // Remove undefined/null values
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value.toString())
    } else {
      url.searchParams.delete(key)
    }
  })

  return url.pathname + url.search
}

/**
 * Parse query params from search string
 */
export function parseProductsQueryParams(searchParams: URLSearchParams): {
  page: number
  search: string
  groupId: number | undefined
  product: string | undefined
} {
  return {
    page: parseInt(searchParams.get('page') || '1', 10),
    search: searchParams.get('search') || '',
    groupId: searchParams.get('groupId')
      ? parseInt(searchParams.get('groupId')!, 10)
      : undefined,
    product: searchParams.get('product') || undefined,
  }
}

/**
 * Generate breadcrumb trail for category
 */
export function getCategoryBreadcrumbs(category: Category) {
  return [
    { label: 'Products', url: '/products' },
    { label: category.name || 'Category', url: getCategoryUrl(category.id, category.name || '') },
  ]
}

/**
 * Generate breadcrumb trail for subcategory
 */
export function getSubcategoryBreadcrumbs(
  category: Category,
  subcategory: Category
) {
  return [
    { label: 'Products', url: '/products' },
    { label: category.name || 'Category', url: getCategoryUrl(category.id, category.name || '') },
    {
      label: subcategory.name || 'Subcategory',
      url: getSubcategoryUrl(
        category.id,
        category.name || '',
        subcategory.id,
        subcategory.name || ''
      ),
    },
  ]
}
