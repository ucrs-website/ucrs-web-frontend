/**
 * Quote Products Table Component
 * Table displaying products with quantity controls and description inputs
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useQuoteCart } from "@/lib/hooks/useQuoteCart";
import type { QuoteItem } from "@/lib/types/products";

interface QuoteProductsTableProps {
  products: QuoteItem[];
}

export function QuoteProductsTable({ products }: QuoteProductsTableProps) {
  const { incrementQuantity, decrementQuantity } = useQuoteCart();
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});

  const handleDescriptionChange = (oemSku: string, value: string) => {
    setDescriptions((prev) => ({ ...prev, [oemSku]: value }));
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  Product Name
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.oemSku} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decrementQuantity(product.oemSku)}
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        <CircleMinus className="w-6 h-6" />
                      </button>
                      <span className="text-sm font-semibold text-gray-900 w-8 text-center">
                        {product.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementQuantity(product.oemSku)}
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        <CirclePlus className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="relative w-10 h-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-mono">
                        {product.oemSku}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <input
                    type="text"
                    placeholder="Short description if it's needed"
                    value={descriptions[product.oemSku] || ""}
                    onChange={(e) =>
                      handleDescriptionChange(product.oemSku, e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm text-gray-600 placeholder:text-gray-400 border-0 focus:outline-none bg-transparent"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {products.map((product) => (
          <div
            key={product.oemSku}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Product Image */}
            <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {product.name}
              </h4>
              <p className="text-xs text-gray-500 font-mono">
                {product.oemSku}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => decrementQuantity(product.oemSku)}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <CircleMinus className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold text-gray-900 w-6 text-center">
                {product.quantity}
              </span>
              <button
                type="button"
                onClick={() => incrementQuantity(product.oemSku)}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <CirclePlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
