/**
 * Quote Cart Hook
 * Convenient hook for accessing quote cart state and actions
 */

'use client'

import { useQuoteCartStore } from '@/lib/store/quote-cart-store'
import type { Product } from '@/lib/types/products'

/**
 * Hook for accessing quote cart functionality
 * Provides convenient access to cart state and actions
 */
export function useQuoteCart() {
  const items = useQuoteCartStore((state) => state.items)
  const isExpanded = useQuoteCartStore((state) => state.isExpanded)
  const addToQuote = useQuoteCartStore((state) => state.addToQuote)
  const removeFromQuote = useQuoteCartStore((state) => state.removeFromQuote)
  const clearQuote = useQuoteCartStore((state) => state.clearQuote)
  const toggleExpanded = useQuoteCartStore((state) => state.toggleExpanded)
  const setExpanded = useQuoteCartStore((state) => state.setExpanded)
  const isInQuote = useQuoteCartStore((state) => state.isInQuote)
  const getItemCount = useQuoteCartStore((state) => state.getItemCount)

  return {
    // State
    items,
    isExpanded,
    itemCount: getItemCount(),

    // Actions
    addToQuote,
    removeFromQuote,
    clearQuote,
    toggleExpanded,
    setExpanded,
    isInQuote,

    // Helpers
    isEmpty: items.length === 0,
    hasItems: items.length > 0,
  }
}

/**
 * Hook for adding a product to quote with callback
 * Useful for product cards and modals
 */
export function useAddToQuote() {
  const addToQuote = useQuoteCartStore((state) => state.addToQuote)
  const isInQuote = useQuoteCartStore((state) => state.isInQuote)

  return {
    addToQuote,
    isInQuote,
  }
}
