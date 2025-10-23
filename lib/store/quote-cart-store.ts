/**
 * Quote Cart Store (Zustand)
 * Global state management for the quote cart with localStorage persistence
 */

'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product, QuoteItem } from '@/lib/types/products'
import { getProductImage } from '@/lib/utils/image-helpers'

interface QuoteCartState {
  // State
  items: QuoteItem[]
  isExpanded: boolean

  // Actions
  addToQuote: (product: Product) => void
  removeFromQuote: (oemSku: string) => void
  clearQuote: () => void
  toggleExpanded: () => void
  setExpanded: (expanded: boolean) => void
  isInQuote: (oemSku: string) => boolean
  getItemCount: () => number
}

export const useQuoteCartStore = create<QuoteCartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isExpanded: false,

      // Add product to quote
      addToQuote: (product: Product) => {
        const currentItems = get().items

        // Check if product already exists
        const exists = currentItems.some(
          (item) => item.oemSku === product.oemSku
        )

        if (exists) {
          // Product already in quote, do nothing or show notification
          console.log('Product already in quote:', product.oemSku)
          return
        }

        // Create quote item
        const quoteItem: QuoteItem = {
          oemSku: product.oemSku,
          name: product.name,
          description: product.description,
          imageUrl: getProductImage(product.oemSku),
          catId: product.catId,
          groupId: product.groupId,
          addedAt: new Date().toISOString(),
        }

        // Add to cart
        set({
          items: [...currentItems, quoteItem],
          isExpanded: true, // Auto-expand when adding
        })
      },

      // Remove product from quote
      removeFromQuote: (oemSku: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.oemSku !== oemSku),
        }))
      },

      // Clear entire quote
      clearQuote: () => {
        set({
          items: [],
          isExpanded: false,
        })
      },

      // Toggle expanded state
      toggleExpanded: () => {
        set((state) => ({
          isExpanded: !state.isExpanded,
        }))
      },

      // Set expanded state
      setExpanded: (expanded: boolean) => {
        set({ isExpanded: expanded })
      },

      // Check if product is in quote
      isInQuote: (oemSku: string) => {
        return get().items.some((item) => item.oemSku === oemSku)
      },

      // Get total item count
      getItemCount: () => {
        return get().items.length
      },
    }),
    {
      name: 'ucrs-quote-cart', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist items, not isExpanded
        items: state.items,
      }),
    }
  )
)
