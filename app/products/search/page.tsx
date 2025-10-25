/**
 * Search Results Page
 * Displays search results across all product categories
 */

import type { Metadata } from "next";
import { searchProducts, fetchCategories } from "@/lib/api/products";
import { getProductImage } from "@/lib/utils/image-helpers";
import { generateSEO } from "@/lib/seo";
import type { ProductWithImage } from "@/lib/types/products";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { SearchResultsClient } from "@/components/products/SearchResultsClient";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    category?: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q = "" } = await searchParams;

  if (!q) {
    return generateSEO({
      title: "Search Products | UCRS",
      description: "Search for locomotive components and railway parts across our entire catalog.",
      url: "/products/search",
    });
  }

  return generateSEO({
    title: `Search Results for "${q}" | UCRS Products`,
    description: `Search results for "${q}". Browse high-quality locomotive components and railway parts.`,
    url: `/products/search?q=${encodeURIComponent(q)}`,
    keywords: [q, "locomotive parts", "railway components", "search"],
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", page = "1", category } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const categoryId = category ? parseInt(category, 10) : undefined;

  // Fetch categories for filter
  let categories: Awaited<ReturnType<typeof fetchCategories>> = [];
  let productsData: Awaited<ReturnType<typeof searchProducts>>;
  let error: string | null = null;

  try {
    categories = await fetchCategories();

    if (q.trim()) {
      // Search products
      productsData = await searchProducts(q.trim(), {
        page: currentPage,
        categoryId,
      });
    } else {
      // No search query - return empty results
      productsData = { items: [], page: 1, pageSize: 50, total: 0, hasNext: false };
    }
  } catch (err) {
    console.error("Error searching products:", err);
    error =
      err instanceof Error
        ? err.message
        : "Failed to search products. Please try again later.";
    productsData = { items: [], page: 1, pageSize: 50, total: 0, hasNext: false };
    categories = [];
  }

  // Enrich products with images
  const productsWithImages: ProductWithImage[] = productsData.items.map((product) => ({
    ...product,
    imageUrl: getProductImage(product.oemSku),
  }));

  // Generate breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Products", url: "/products" },
    { name: "Search Results", url: "" },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content */}
      <section className="py-8 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          {error ? (
            // Error State
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-red-900 mb-4">
                  Error Searching Products
                </h2>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            <SearchResultsClient
              query={q}
              products={productsWithImages}
              categories={categories}
              currentPage={currentPage}
              totalPages={Math.ceil(productsData.total / productsData.pageSize)}
              totalCount={productsData.total}
              selectedCategoryId={categoryId}
            />
          )}
        </div>
      </section>
    </>
  );
}
