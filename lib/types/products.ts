/**
 * Product Types and Interfaces
 * Types for the Explore Products feature
 */

// ============================================================================
// Category Types
// ============================================================================

export interface Category {
  id: number
  name: string | null
  orderNo: number | null
  productCount: number
}

export interface CategoryWithImage extends Category {
  imageUrl: string
  slug: string
}

// ============================================================================
// Product Types
// ============================================================================

export interface Product {
  oemSku: string
  name: string
  description: string
  catId: number
  groupId: number
}

export interface ProductWithImage extends Product {
  imageUrl: string
}

// ============================================================================
// Product Group Types (for filtering)
// ============================================================================

export interface ProductGroup {
  id: number
  name: string
  categoryId: number
  productCount?: number
}

// ============================================================================
// Pagination Types
// ============================================================================

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  hasNext: boolean
}

export interface PaginatedResponse<T> {
  page: number
  pageSize: number
  total: number
  hasNext: boolean
  items: T[]
}

// API Response type for products
export type ProductsResponse = PaginatedResponse<Product>

// ============================================================================
// Quote Cart Types
// ============================================================================

export interface QuoteItem {
  oemSku: string
  name: string
  description: string
  imageUrl: string
  catId: number
  groupId: number
  quantity: number
  addedAt: string // ISO timestamp
}

export interface QuoteCartState {
  items: QuoteItem[]
  isExpanded: boolean
}

// ============================================================================
// API Request Types
// ============================================================================

export interface FetchProductsParams {
  page?: number
  pageSize?: number
  search?: string
  groupId?: number
}

// ============================================================================
// URL Params Types
// ============================================================================

export interface CategoryParams {
  categoryId: string
  categorySlug: string
}

export interface SubcategoryParams extends CategoryParams {
  subcategoryId: string
  subcategorySlug: string
}

export interface ProductModalParams {
  product?: string // OEM SKU
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface CategoryCardProps {
  category: CategoryWithImage
}

export interface ProductRowProps {
  product: Product
  onAddToQuote: (product: Product) => void
  onOpenModal: (product: Product) => void
}

export interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToQuote: (product: Product) => void
}

export interface QuoteCartItemProps {
  item: QuoteItem
  onRemove: (oemSku: string) => void
}

// ============================================================================
// SEO Types
// ============================================================================

export interface BreadcrumbItem {
  label: string
  url: string
}

export interface ProductPageSEO {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  breadcrumbs: BreadcrumbItem[]
}
