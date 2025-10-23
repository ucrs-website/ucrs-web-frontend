/**
 * API Configuration
 * Centralized API configuration for the products API
 */

// API Base URL from environment variable
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://ucrs-api-staging-cjeucnemgabbg6am.canadaeast-01.azurewebsites.net'

// API Timeout (in milliseconds)
export const API_TIMEOUT = parseInt(
  process.env.NEXT_PUBLIC_API_TIMEOUT || '10000',
  10
)

// API Endpoints
export const API_ENDPOINTS = {
  categories: '/api/Categories',
  subcategories: (parentId: number) => `/api/Categories/${parentId}/children`,
  products: (subcategoryId: number) =>
    `/api/Categories/${subcategoryId}/products`,
  groups: (subcategoryId: number) => `/api/Categories/${subcategoryId}/groups`,
} as const

// Products per page default
export const DEFAULT_PAGE_SIZE = parseInt(
  process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE || '50',
  10
)

// Request headers
export const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// ISR Revalidation times (in seconds)
export const REVALIDATION = {
  categories: 3600, // 1 hour
  subcategories: 3600, // 1 hour
  products: 1800, // 30 minutes
} as const
