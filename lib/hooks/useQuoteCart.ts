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
  const incrementQuantity = useQuoteCartStore((state) => state.incrementQuantity)
  const decrementQuantity = useQuoteCartStore((state) => state.decrementQuantity)
  const updateQuantity = useQuoteCartStore((state) => state.updateQuantity)
  const getQuantity = useQuoteCartStore((state) => state.getQuantity)
  const clearQuote = useQuoteCartStore((state) => state.clearQuote)
  const toggleExpanded = useQuoteCartStore((state) => state.toggleExpanded)
  const setExpanded = useQuoteCartStore((state) => state.setExpanded)
  const isInQuote = useQuoteCartStore((state) => state.isInQuote)

  // Use selectors directly for reactive values
  const itemCount = useQuoteCartStore((state) => state.items.length)
  const totalQuantity = useQuoteCartStore((state) =>
    state.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  )

  return {
    // State
    items,
    isExpanded,
    itemCount,
    totalQuantity,

    // Actions
    addToQuote,
    removeFromQuote,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
    getQuantity,
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
