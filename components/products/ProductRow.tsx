/**
 * Product Row Component
 * Individual product row in table (desktop) or card (mobile)
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductWithImage } from "@/lib/types/products";
import { useQuoteCart } from "@/lib/hooks/useQuoteCart";
import { cn } from "@/lib/utils";
import { Plus, Eye } from "lucide-react";

interface ProductRowProps {
  product: ProductWithImage;
  onProductClick?: (product: ProductWithImage) => void;
  className?: string;
}

export function ProductRow({ product, onProductClick, className }: ProductRowProps) {
  const [imageError, setImageError] = useState(false);
  const { addToQuote, isInQuote } = useQuoteCart();
  const inCart = isInQuote(product.oemSku);

  const handleAddToQuote = () => {
    addToQuote(product);
  };

  const handleViewDetails = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // Truncate description to max length
  const truncateDescription = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <>
      {/* Desktop Table Row */}
      <div
        className={cn(
          "hidden md:grid md:grid-cols-12 gap-4 px-4 py-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow",
          className
        )}
      >
        {/* Product Name with Image */}
        <div className="col-span-5 flex items-center gap-3">
          <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
            <Image
              src={imageError ? "/images/products/default-product.jpg" : product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="64px"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <button
              onClick={handleViewDetails}
              className="font-semibold text-gray-900 hover:text-primary truncate text-left transition-colors"
            >
              {product.name}
            </button>
          </div>
        </div>

        {/* Part Number */}
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-mono text-gray-700">{product.oemSku}</p>
        </div>

        {/* Description */}
        <div className="col-span-3 flex items-center">
          <p className="text-sm text-gray-600 line-clamp-2">
            {truncateDescription(product.description)}
          </p>
        </div>

        {/* Actions */}
        <div className="col-span-2 flex items-center justify-center gap-2">
          <button
            onClick={handleViewDetails}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="View details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={handleAddToQuote}
            disabled={inCart}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors",
              inCart
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            <Plus className="w-4 h-4" />
            {inCart ? "Added" : "Quote"}
          </button>
        </div>
      </div>

      {/* Mobile Card */}
      <div
        className={cn(
          "md:hidden bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow",
          className
        )}
      >
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
            <Image
              src={imageError ? "/images/products/default-product.jpg" : product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="80px"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <button
              onClick={handleViewDetails}
              className="font-semibold text-gray-900 hover:text-primary mb-1 text-left transition-colors"
            >
              {product.name}
            </button>
            <p className="text-sm font-mono text-gray-600 mb-2">
              {product.oemSku}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {truncateDescription(product.description, 60)}
            </p>

            {/* Mobile Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleViewDetails}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                onClick={handleAddToQuote}
                disabled={inCart}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors",
                  inCart
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
              >
                <Plus className="w-4 h-4" />
                {inCart ? "Added" : "Quote"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
