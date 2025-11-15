/**
 * Products Page Client Component
 * Handles product display with filters and pagination
 */

"use client";

import type { ProductWithImage } from "@/lib/types/products";
import { ProductsTable } from "./ProductsTable";
import { ProductsSearch } from "./ProductsSearch";
import { ProductsPagination } from "./ProductsPagination";
import { ProductsFiltersSidebar } from "./ProductsFiltersSidebar";

interface ProductsPageClientProps {
  products: ProductWithImage[];
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  subcategoryId: number;
  subcategoryName: string;
  productGroups: any[];
  activeGroupId?: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  initialSearch: string;
}

export function ProductsPageClient({
  products,
  categoryId,
  categoryName,
  categorySlug,
  subcategoryId,
  subcategoryName,
  productGroups,
  activeGroupId,
  currentPage,
  totalPages,
  totalCount,
  initialSearch,
}: ProductsPageClientProps) {

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <ProductsSearch initialSearch={initialSearch} />
      </div>

      {/* Content Layout: Main + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1">
          <ProductsTable products={products} isLoading={false} />

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
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80">
          <ProductsFiltersSidebar
            categoryId={categoryId}
            categoryName={categoryName}
            categorySlug={categorySlug}
            subcategoryId={subcategoryId}
            subcategoryName={subcategoryName}
            productGroups={productGroups}
            activeGroupId={activeGroupId}
          />
        </aside>
      </div>
    </>
  );
}
