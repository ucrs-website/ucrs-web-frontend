/**
 * Search Modal Component
 * Full-screen search modal with product suggestions
 * Integrates with ProductRow for cart functionality
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductRow } from "@/components/products/ProductRow";
import { suggestProducts, type ProductSuggestion } from "@/lib/api/products";
import type { ProductWithImage } from "@/lib/types/products";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce timer ref
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions with debounce
  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const results = await suggestProducts(query, 20);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300); // 300ms debounce
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  // Close modal
  const handleClose = () => {
    handleClear();
    onOpenChange(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      handleClear();
    }
  }, [open]);

  // Convert ProductSuggestion to ProductWithImage for ProductRow
  const convertToProductWithImage = (
    suggestion: ProductSuggestion,
  ): ProductWithImage => {
    return {
      id: 0, // Not used for display
      name: suggestion.name || "Unknown Product",
      oemSku: suggestion.oemSku || "",
      imageUrl: "/images/products/default-product.avif",
      description: "",
      categoryId: 0,
      subcategoryId: 0,
      groupId: null,
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-full h-full p-0 gap-0 bg-white flex flex-col"
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
      >
        {/* Accessible Dialog Title (Hidden) */}
        <VisuallyHidden>
          <DialogTitle>Product Search</DialogTitle>
        </VisuallyHidden>

        {/* Search Header */}
        <div className="sticky top-0 bg-white px-4 py-4 flex flex-col gap-3">
          <div className="lg:hidden text-sm text-gray-400 flex-shrink-0">
            Search Results:
          </div>
          <Input
            type="text"
            placeholder="Product Name or Part Number/OEM ..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full h-12 pr-10 text-base border-2 border-primary rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto px-4 py-2 lg:px-6 lg:py-4 bg-gray-50">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12 text-gray-500">Searching...</div>
          )}

          {/* Empty State */}
          {!isLoading && searchQuery && suggestions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found for "{searchQuery}"
            </div>
          )}

          {/* Results List */}
          {!isLoading && suggestions.length > 0 && (
            <div className="space-y-2">
              {/* Desktop: Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 text-sm font-semibold text-gray-600 bg-white rounded-lg border border-gray-200 mb-2">
                <div className="col-span-3"></div>
                <div className="col-span-7 flex items-center gap-1">
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
                <div className="col-span-2"></div>
              </div>

              {/* Product Rows */}
              {suggestions.map((suggestion, index) => (
                <ProductRow
                  key={`${suggestion.oemSku}-${index}`}
                  product={convertToProductWithImage(suggestion)}
                />
              ))}
            </div>
          )}

          {/* Initial State (no search query) */}
          {!searchQuery && !isLoading && (
            <div className="text-center py-16 text-gray-400">
              Start typing to search for products
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
