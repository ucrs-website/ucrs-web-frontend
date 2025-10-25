/**
 * Search Results Client Component
 * Client-side component for search results page with filters and modal
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { ProductWithImage, Category } from "@/lib/types/products";
import { ProductsTable } from "./ProductsTable";
import { ProductsPagination } from "./ProductsPagination";
import { ProductModal } from "./ProductModal";
import { Search, X, Filter } from "lucide-react";

interface SearchResultsClientProps {
  query: string;
  products: ProductWithImage[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  selectedCategoryId?: number;
}

export function SearchResultsClient({
  query,
  products,
  categories,
  currentPage,
  totalPages,
  totalCount,
  selectedCategoryId,
}: SearchResultsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update search query when prop changes
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Handle virtual URL - check for ?product= param on mount
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      const product = products.find((p) => p.oemSku === productParam);
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set("q", searchQuery.trim());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleClearSearch = () => {
    router.push("/products");
  };

  const handleCategoryFilter = (categoryId: number | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === undefined) {
      params.delete("category");
    } else {
      params.set("category", categoryId.toString());
    }

    // Reset to page 1 when filtering
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  const openModal = (product: ProductWithImage) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    // Update URL with product param (shallow routing)
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", product.oemSku);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);

    // Remove product param from URL (shallow routing)
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <>
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Search Products
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mb-6">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or part number..."
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {/* Search Info and Filters */}
        {query && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            {/* Results Info */}
            <div className="flex items-center gap-4">
              <p className="text-gray-700">
                {totalCount > 0 ? (
                  <>
                    <span className="font-semibold">{totalCount}</span> results for{" "}
                    <span className="font-semibold">"{query}"</span>
                  </>
                ) : (
                  <>No results found for <span className="font-semibold">"{query}"</span></>
                )}
              </p>
              <button
                onClick={handleClearSearch}
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedCategoryId || ""}
                  onChange={(e) =>
                    handleCategoryFilter(
                      e.target.value ? parseInt(e.target.value, 10) : undefined
                    )
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.productCount})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {!query ? (
        // No search query state
        <div className="text-center py-20">
          <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Searching
            </h3>
            <p className="text-gray-600">
              Enter a search term to find products across all categories
            </p>
          </div>
        </div>
      ) : (
        <>
          <ProductsTable
            products={products}
            isLoading={false}
            onProductClick={openModal}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <ProductsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
              />
            </div>
          )}
        </>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
