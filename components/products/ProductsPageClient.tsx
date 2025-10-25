/**
 * Products Page Client Component
 * Handles modal state and virtual URL support
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { ProductWithImage } from "@/lib/types/products";
import { ProductsTable } from "./ProductsTable";
import { ProductsSearch } from "./ProductsSearch";
import { ProductsPagination } from "./ProductsPagination";
import { ProductsFiltersSidebar } from "./ProductsFiltersSidebar";
import { ProductModal } from "./ProductModal";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<ProductWithImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle virtual URL - check for ?product= param on mount
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      // Find product in current list
      const product = products.find((p) => p.oemSku === productParam);
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, products]);

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
      {/* Search */}
      <div className="mb-6">
        <ProductsSearch initialSearch={initialSearch} />
      </div>

      {/* Content Layout: Main + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1">
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

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
