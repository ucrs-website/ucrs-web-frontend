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
import { Plus, ChevronRight } from "lucide-react";

interface ProductRowProps {
  product: ProductWithImage;
  onProductClick?: (product: ProductWithImage) => void;
  className?: string;
}

export function ProductRow({
  product,
  onProductClick,
  className,
}: ProductRowProps) {
  const [imageError, setImageError] = useState(false);
  const { addToQuote, isInQuote, getQuantity, incrementQuantity, decrementQuantity } = useQuoteCart();
  const inCart = isInQuote(product.oemSku);
  const quantity = getQuantity(product.oemSku);

  const handleAddToQuote = () => {
    addToQuote(product);
  };

  const handleIncrement = () => {
    incrementQuantity(product.oemSku);
  };

  const handleDecrement = () => {
    decrementQuantity(product.oemSku);
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
          "hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow",
          className,
        )}
      >
        {/* Add to Quote Button or Quantity Controls */}
        <div className="col-span-3 flex items-center justify-start">
          {inCart ? (
            // Quantity Controls
            <div className="flex items-center gap-2 px-2 py-1.5 bg-white border border-gray-300 rounded-lg">
              <button
                onClick={handleDecrement}
                className="p-1 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-1 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
          ) : (
            // Add to Quote Button
            <button
              onClick={handleAddToQuote}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border bg-white text-primary border-primary hover:bg-primary/5"
              aria-label="Add to quote"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Add to quote</span>
            </button>
          )}
        </div>

        {/* Product Name with Image and Part Number */}
        <div className="col-span-7 flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-gray-300 border-[1px]">
            <Image
              src={
                imageError
                  ? "/images/products/default-product.avif"
                  : product.imageUrl
              }
              alt={product.name}
              fill
              sizes="40px"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="flex-1 min-w-0 justify-center">
            <h3
              className="text-sm font-semibold text-gray-900 mb-1 cursor-pointer"
              onClick={handleViewDetails}
            >
              {product.name}
            </h3>
            <div className="text-xs text-gray-600">
              Part Number: <span className="font-mono">{product.oemSku}</span>
            </div>
          </div>
        </div>

        {/* Arrow Button */}
        <div className="col-span-2 flex items-center justify-end">
          <button
            onClick={handleViewDetails}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="View product details"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Card */}
      <div
        className={cn(
          "md:hidden bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow grid grid-cols-3 gap-3 items-center overflow-hidden",
          className,
        )}
      >
        <div className="flex-col gap-3 bg-gray-50 col-span-2">
          <div className="flex items-center gap-2 p-2">
            {/* Product Image */}
            <div className="relative w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full border-gray-200 border-[1px] overflow-hidden">
              <Image
                src={
                  imageError
                    ? "/images/products/default-product.avif"
                    : product.imageUrl
                }
                alt={product.name}
                fill
                className="object-contain"
                sizes="40px"
                onError={() => setImageError(true)}
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h3
                className="text-base font-semibold text-gray-900 mb-1 line-clamp-1 cursor-pointer"
                onClick={handleViewDetails}
              >
                {product.name}
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Part Number: <span className="font-mono">{product.oemSku}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-col justify-center items-center px-1">
          {inCart ? (
            // Quantity Controls
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-gray-300 rounded-lg">
              <button
                onClick={handleDecrement}
                className="p-1 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                aria-label="Decrease quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-1 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
          ) : (
            // Add to Quote Button
            <button
              onClick={handleAddToQuote}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border bg-white text-primary border-primary hover:bg-primary/5"
            >
              <Plus className="w-4 h-4" />
              Add to quote
            </button>
          )}
        </div>
      </div>
    </>
  );
}
