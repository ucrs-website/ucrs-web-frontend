/**
 * Products API Client
 * Functions for fetching data from the UCRS products API
 */

import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_HEADERS,
  API_TIMEOUT,
  DEFAULT_PAGE_SIZE,
} from '@/lib/config/api'
import type {
  Category,
  Product,
  ProductsResponse,
  ProductGroup,
  FetchProductsParams,
} from '@/lib/types/products'

/**
 * Custom fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = API_TIMEOUT
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...API_HEADERS,
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

/**
 * Handle API errors
 */
function handleApiError(error: unknown, context: string): never {
  console.error(`API Error (${context}):`, error)

  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout: ${context}`)
    }
    throw new Error(`API request failed: ${error.message}`)
  }

  throw new Error(`Unknown API error: ${context}`)
}

/**
 * Fetch all categories
 * GET /api/Categories
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.categories}`
    const response = await fetchWithTimeout(url, {
      next: { revalidate: 3600 }, // ISR: 1 hour
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: Category[] = await response.json()
    return data
  } catch (error) {
    return handleApiError(error, 'fetchCategories')
  }
}

/**
 * Fetch subcategories for a parent category
 * GET /api/Categories/{parentId}/children
 */
export async function fetchSubcategories(parentId: number): Promise<Category[]> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.subcategories(parentId)}`
    const response = await fetchWithTimeout(url, {
      next: { revalidate: 3600 }, // ISR: 1 hour
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: Category[] = await response.json()
    return data
  } catch (error) {
    return handleApiError(error, `fetchSubcategories(${parentId})`)
  }
}

/**
 * Fetch products for a subcategory with pagination and filters
 * GET /api/Categories/{subcategoryId}/products
 */
export async function fetchProducts(
  subcategoryId: number,
  params: FetchProductsParams = {}
): Promise<ProductsResponse> {
  try {
    const {
      page = 1,
      pageSize = DEFAULT_PAGE_SIZE,
      search = '',
      groupId,
    } = params

    const url = new URL(
      `${API_BASE_URL}${API_ENDPOINTS.products(subcategoryId)}`
    )

    // Add query parameters
    url.searchParams.set('page', page.toString())
    url.searchParams.set('pageSize', pageSize.toString())
    if (search) url.searchParams.set('search', search)
    if (groupId !== undefined) url.searchParams.set('groupId', groupId.toString())

    const response = await fetchWithTimeout(url.toString(), {
      next: { revalidate: 1800 }, // ISR: 30 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ProductsResponse = await response.json()
    return data
  } catch (error) {
    return handleApiError(error, `fetchProducts(${subcategoryId})`)
  }
}

/**
 * Fetch product groups for filtering
 * GET /api/Categories/{subcategoryId}/groups
 */
export async function fetchProductGroups(
  subcategoryId: number
): Promise<ProductGroup[]> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.groups(subcategoryId)}`
    const response = await fetchWithTimeout(url, {
      next: { revalidate: 3600 }, // ISR: 1 hour
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ProductGroup[] = await response.json()
    return data
  } catch (error) {
    return handleApiError(error, `fetchProductGroups(${subcategoryId})`)
  }
}

/**
 * Find a specific product by OEM SKU within a subcategory
 * This searches through products to find a specific one
 */
export async function findProductBySku(
  subcategoryId: number,
  oemSku: string
): Promise<Product | null> {
  try {
    // Fetch first page with a large page size to search
    const response = await fetchProducts(subcategoryId, {
      page: 1,
      pageSize: 100,
      search: oemSku,
    })

    // Find exact match
    const product = response.items.find(
      (p) => p.oemSku.toLowerCase() === oemSku.toLowerCase()
    )

    return product || null
  } catch (error) {
    console.error(`Error finding product ${oemSku}:`, error)
    return null
  }
}

/**
 * Fetch a single category by ID
 * Helper function to get category details
 */
export async function fetchCategoryById(
  categoryId: number
): Promise<Category | null> {
  try {
    const categories = await fetchCategories()
    return categories.find((cat) => cat.id === categoryId) || null
  } catch (error) {
    console.error(`Error fetching category ${categoryId}:`, error)
    return null
  }
}

/**
 * Fetch a single subcategory by ID
 * Helper function to get subcategory details
 */
export async function fetchSubcategoryById(
  parentId: number,
  subcategoryId: number
): Promise<Category | null> {
  try {
    const subcategories = await fetchSubcategories(parentId)
    return subcategories.find((sub) => sub.id === subcategoryId) || null
  } catch (error) {
    console.error(
      `Error fetching subcategory ${subcategoryId} under ${parentId}:`,
      error
    )
    return null
  }
}

/**
 * Search products across all categories
 * GET /api/Products/search
 */
export async function searchProducts(
  query: string,
  params: { page?: number; pageSize?: number; categoryId?: number } = {}
): Promise<ProductsResponse> {
  try {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE, categoryId } = params

    const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.search}`)

    // Add query parameters
    url.searchParams.set('q', query)
    url.searchParams.set('page', page.toString())
    url.searchParams.set('pageSize', pageSize.toString())
    if (categoryId !== undefined)
      url.searchParams.set('categoryId', categoryId.toString())

    const response = await fetchWithTimeout(url.toString(), {
      next: { revalidate: 1800 }, // ISR: 30 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ProductsResponse = await response.json()
    return data
  } catch (error) {
    return handleApiError(error, `searchProducts("${query}")`)
  }
}

/**
 * Product suggestion type (from suggest endpoint)
 */
export interface ProductSuggestion {
  oemSku: string | null
  name: string | null
  productId: string
}

/**
 * Get product suggestions for search autocomplete
 * Uses Next.js API route to avoid CORS issues
 */
export async function suggestProducts(
  query: string,
  limit: number = 10
): Promise<ProductSuggestion[]> {
  try {
    if (!query || query.trim().length === 0) {
      return []
    }

    // Use Next.js API route to proxy the request
    const url = new URL('/api/products/suggest', window.location.origin)
    url.searchParams.set('q', query.trim())
    url.searchParams.set('limit', limit.toString())

    const response = await fetch(url.toString(), {
      cache: 'no-store', // Don't cache search suggestions
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ProductSuggestion[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching product suggestions:', error)
    return [] // Return empty array on error for better UX
  }
}
