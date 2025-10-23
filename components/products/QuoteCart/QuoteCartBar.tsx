/**
 * Quote Cart Bar Component
 * Fixed notification bar under header showing quote count and expand/collapse toggle
 */

'use client'

import { useQuoteCart } from '@/lib/hooks/useQuoteCart'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QuoteCartDropdown } from './QuoteCartDropdown'

export function QuoteCartBar() {
  const { itemCount, isExpanded, toggleExpanded, hasItems } = useQuoteCart()

  // Don't render if cart is empty
  if (!hasItems) {
    return null
  }

  const quotePageUrl = process.env.NEXT_PUBLIC_QUOTE_PAGE_URL || '/quote'

  return (
    <div className="fixed top-[73px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Notification Bar */}
      <div
        className="container mx-auto px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm md:text-base font-medium text-gray-900">
            <span className="font-bold text-primary">{itemCount}</span>{' '}
            {itemCount === 1 ? 'Product' : 'Products'} added to your quote list
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={quotePageUrl}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Click to continue
          </a>

          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label={isExpanded ? 'Collapse quote list' : 'Expand quote list'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown */}
      <QuoteCartDropdown isOpen={isExpanded} />
    </div>
  )
}
