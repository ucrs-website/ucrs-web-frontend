/**
 * Quote Cart Store (Zustand)
 * Global state management for the quote cart with localStorage persistence
 */

'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product, QuoteItem } from '@/lib/types/products'
import { getProductImage } from '@/lib/utils/image-helpers'
import { useToastStore } from './toast-store'

interface QuoteCartState {
  // State
  items: QuoteItem[]
  isExpanded: boolean

  // Actions
  addToQuote: (product: Product) => void
  removeFromQuote: (oemSku: string) => void
  incrementQuantity: (oemSku: string) => void
  decrementQuantity: (oemSku: string) => void
  updateQuantity: (oemSku: string, quantity: number) => void
  getQuantity: (oemSku: string) => number
  clearQuote: () => void
  toggleExpanded: () => void
  setExpanded: (expanded: boolean) => void
  isInQuote: (oemSku: string) => boolean
  getItemCount: () => number
  getTotalQuantity: () => number
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
        const existingItem = currentItems.find(
          (item) => item.oemSku === product.oemSku
        )

        if (existingItem) {
          // Product already in quote, increment quantity
          get().incrementQuantity(product.oemSku)
          // Show toast notification
          useToastStore.getState().addToast(`${product.name} quantity increased`, 'success', 3000)
          return
        }

        // Create quote item with initial quantity of 1
        // Spread all Product fields and add QuoteItem-specific fields
        const quoteItem: QuoteItem = {
          ...product, // Spread all Product fields
          imageUrl: product.imageId
            ? `https://v1.ucrs.com/Image/Serve/${product.imageId}`
            : getProductImage(product.oemSku),
          quantity: 1,
          addedAt: new Date().toISOString(),
        }

        // Add to cart
        set({
          items: [...currentItems, quoteItem],
          isExpanded: true, // Auto-expand when adding
        })

        // Show toast notification
        useToastStore.getState().addToast(`${product.name} added to quote`, 'success', 3000)
      },

      // Remove product from quote
      removeFromQuote: (oemSku: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.oemSku !== oemSku),
        }))
      },

      // Increment quantity
      incrementQuantity: (oemSku: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.oemSku === oemSku
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }))
      },

      // Decrement quantity (remove if quantity becomes 0)
      decrementQuantity: (oemSku: string) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.oemSku === oemSku
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }))
      },

      // Update quantity directly
      updateQuantity: (oemSku: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromQuote(oemSku)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.oemSku === oemSku ? { ...item, quantity } : item
          ),
        }))
      },

      // Get quantity for a specific product
      getQuantity: (oemSku: string) => {
        const item = get().items.find((item) => item.oemSku === oemSku)
        return item?.quantity || 0
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

      // Get total item count (number of unique products)
      getItemCount: () => {
        return get().items.length
      },

      // Get total quantity (sum of all quantities)
      getTotalQuantity: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'ucrs-quote-cart', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist items, not isExpanded
        items: state.items,
      }),
      // Migration to handle legacy items without quantity field
      migrate: (persistedState: any, version: number) => {
        if (persistedState && persistedState.items) {
          persistedState.items = persistedState.items.map((item: any) => ({
            ...item,
            quantity: item.quantity || 1, // Add quantity if missing
          }))
        }
        return persistedState as QuoteCartState
      },
      version: 1,
    }
  )
)
