/**
 * Explore Products Hero Section
 * Hero section with heading, subheading, and search bar
 * Integrates with SearchModal (mobile) and inline dropdown (desktop)
 */

"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { SearchModal } from "@/components/SearchModal";
import { ProductRow } from "@/components/products/ProductRow";
import { suggestProducts, type ProductSuggestion } from "@/lib/api/products";
import type { ProductWithImage } from "@/lib/types/products";
import useDevice from "@/lib/hooks/useDevice";
import { X } from "lucide-react";

export function ExploreProductsHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { isMobile } = useDevice();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Handle click outside to close (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMobile]);

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
      catId: 0,
      groupId: 0,
    };
  };

  // Handle input click - open modal on mobile, do nothing on desktop
  const handleInputClick = () => {
    if (isMobile) {
      setSearchModalOpen(true);
    }
  };

  return (
    <>
      {/* Search Modal - Mobile Only */}
      {isMobile && (
        <SearchModal open={searchModalOpen} onOpenChange={setSearchModalOpen} />
      )}

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center pt-12 lg:pt-20">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Premium Locomotive Components
              <br />
              <span className="text-primary">Made to OEM Standards</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-[470px] mx-auto">
              Browse 5000+ Certified Parts for Locomotives, Freight Cars, and
              Coaches
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative" ref={dropdownRef}>
              <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none z-10">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={handleInputClick}
                  placeholder="Search in products"
                  className="w-full pl-12 pr-4 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  readOnly={isMobile}
                />
              </div>

              {/* Dropdown Results - Desktop Only */}
              {!isMobile && isOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  {/* Header */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                      Search Result
                    </h3>
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
                      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg mb-2">
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
          </div>
        </div>
      </section>
    </>
  );
}
