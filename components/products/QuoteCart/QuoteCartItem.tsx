/**
 * Quote Cart Item Component
 * Individual product item in the quote cart dropdown
 */

'use client'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import type { QuoteItem } from '@/lib/types/products'
import { getProductImageFallback } from '@/lib/utils/image-helpers'
import { useState } from 'react'
import { useQuoteCart } from '@/lib/hooks/useQuoteCart'

interface QuoteCartItemProps {
  item: QuoteItem
  onRemove: (oemSku: string) => void
}

export function QuoteCartItem({ item, onRemove }: QuoteCartItemProps) {
  const [imageError, setImageError] = useState(false)
  const { incrementQuantity, decrementQuantity } = useQuoteCart()

  const handleIncrement = () => {
    incrementQuantity(item.oemSku)
  }

  const handleDecrement = () => {
    decrementQuantity(item.oemSku)
  }

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative">
        <Image
          src={imageError ? getProductImageFallback() : item.imageUrl}
          alt={item.name}
          fill
          className="object-contain p-1"
          sizes="64px"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {item.name}
        </h4>
        <p className="text-xs text-gray-600 mt-0.5">{item.oemSku}</p>
        {item.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg">
        <button
          onClick={handleDecrement}
          className="p-1 text-gray-600 hover:text-primary hover:bg-white rounded transition-colors"
          aria-label="Decrease quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-900 min-w-[2ch] text-center">
          {item.quantity}
        </span>
        <button
          onClick={handleIncrement}
          className="p-1 text-gray-600 hover:text-primary hover:bg-white rounded transition-colors"
          aria-label="Increase quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        </button>
      </div>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => onRemove(item.oemSku)}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
        aria-label={`Remove ${item.name} from quote`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
