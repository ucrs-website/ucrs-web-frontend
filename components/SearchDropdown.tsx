/**
 * Search Dropdown Component
 * Dropdown search results for desktop view
 * Shows below the search input as a floating card
 */

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductRow } from "@/components/products/ProductRow";
import { suggestProducts, type ProductSuggestion } from "@/lib/api/products";
import type { ProductWithImage } from "@/lib/types/products";

export function SearchDropdown() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce timer ref
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions with debounce
  const fetchSuggestions = useCallback(async (query: string) => {
    // Minimum 3 characters required
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      const results = await suggestProducts(query, 20);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle search input change with 1-second debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If less than 3 characters, don't search
    if (value.trim().length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    // Set new timer with 1-second delay
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 1000); // 1 second debounce
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setIsOpen(false);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Convert ProductSuggestion to ProductWithImage for ProductRow
  const convertToProductWithImage = (
    suggestion: ProductSuggestion,
  ): ProductWithImage => {
    return {
      name: suggestion.name || "Unknown Product",
      oemSku: suggestion.oemSku || "",
      imageUrl: "/images/products/default-product.avif",
      description: "",
      productId:suggestion.productId,
      catId: 0,
      groupId: 0,
    };
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search in products"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          className="w-[200px] pl-9 h-9 text-sm"
          aria-label="Search products"
        />
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[690px] max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Search Result</h3>
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close results"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="px-4 py-8 text-center text-gray-500">
              Searching...
            </div>
          )}

          {/* Empty State */}
          {!isLoading &&
            suggestions.length === 0 &&
            searchQuery.length >= 3 && (
              <div className="px-4 py-8 text-center text-gray-500">
                No products found for "{searchQuery}"
              </div>
            )}

          {/* Results List */}
          {!isLoading && suggestions.length > 0 && (
            <div className="p-4 space-y-2">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg mb-2">
                <div className="col-span-3"></div>
                <div className="col-span-7 flex items-center gap-1">
                  Product Name
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
        </div>
      )}
    </div>
  );
}
