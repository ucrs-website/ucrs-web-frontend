/**
 * Products Table Component
 * Displays products in a table layout (desktop) or card layout (mobile)
 */

"use client";

import type { ProductWithImage } from "@/lib/types/products";
import { ProductRow } from "./ProductRow";
import { cn } from "@/lib/utils";

interface ProductsTableProps {
  products: ProductWithImage[];
  isLoading?: boolean;
  onProductClick?: (product: ProductWithImage) => void;
  className?: string;
}

export function ProductsTable({
  products,
  isLoading = false,
  onProductClick,
  className,
}: ProductsTableProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Loading Skeleton */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-4 h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={cn("text-center py-16", className)}>
        <div className="bg-gray-50 rounded-lg p-12">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* Desktop Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg font-semibold text-sm text-gray-700">
        <div className="col-span-5">Product Name</div>
        <div className="col-span-2">Part Number</div>
        <div className="col-span-3">Description</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      {/* Products List */}
      <div className="space-y-2">
        {products.map((product) => (
          <ProductRow
            key={product.oemSku}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
}
