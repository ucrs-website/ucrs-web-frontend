/**
 * Products Quote View Component
 * Product search, table with QuoteCart integration, and pagination
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuoteCart } from "@/lib/hooks/useQuoteCart";
import { QuoteProductsTable } from "./QuoteProductsTable";
import { useRouter } from "next/navigation";
import { suggestProducts, type ProductSuggestion } from "@/lib/api/products";
import type { Product } from "@/lib/types/products";

interface ProductsQuoteViewProps {
  error?: string;
}

const ITEMS_PER_PAGE = 10;

export function ProductsQuoteView({ error }: ProductsQuoteViewProps) {
  const router = useRouter();
  const { items, addToQuote } = useQuoteCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce timer ref
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate pagination
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  // Handle search input change with 1-second debounce (minimum 3 chars)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If less than 3 characters, don't search
    if (value.trim().length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Set new timer with 1-second delay
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await suggestProducts(value, 20);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 1000); // 1 second debounce
  };

  // Handle adding product to quote cart
  const handleAddProduct = (suggestion: ProductSuggestion) => {
    if (!suggestion.oemSku || !suggestion.name) return;

    // Convert suggestion to Product type for quote cart
    const product: Product = {
      name: suggestion.name,
      oemSku: suggestion.oemSku,
      description: "",
      productId:suggestion.productId,
      catId: 0,
      groupId: 0,
    };

    addToQuote(product);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
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

  const handleExploreProducts = () => {
    router.push("/products");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Search and Explore Products */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1" ref={dropdownRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Product Name, OEM, SKU (min 3 chars)"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />

          {/* Search Results Dropdown */}
          {(isSearching || searchResults.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {isSearching ? (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((product, index) => (
                  <button
                    key={`${product.oemSku}-${index}`}
                    type="button"
                    onClick={() => handleAddProduct(product)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.oemSku}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleExploreProducts}
          className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Explore Products
        </button>
      </div>

      {/* Products Count */}
      {items.length > 0 && (
        <p className="text-white text-sm">
          {items.length} Added Product{items.length !== 1 ? "s" : ""}:
        </p>
      )}

      {/* Products Table */}
      {items.length > 0 ? (
        <>
          <QuoteProductsTable products={currentItems} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {renderPaginationButtons().map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={index}
                    className="px-2 text-white text-sm select-none"
                  >
                    {page}
                  </span>
                ),
              )}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No products added yet.</p>
          <p className="text-sm mt-2">
            Search for products above or click "Explore Products" to browse our
            catalog.
          </p>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
