/**
 * Subcategories Page
 * Displays subcategories for a selected product category
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchCategories,
  fetchSubcategories,
  fetchCategoryById,
} from "@/lib/api/products";
import { slugify } from "@/lib/utils/url-helpers";
import { generateSEO } from "@/lib/seo";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { SubcategoriesSidebar } from "@/components/products/SubcategoriesSidebar";
import { CategoryContent } from "@/components/products/CategoryContent";

// ISR: Revalidate every hour
export const revalidate = 3600;

interface SubcategoriesPageProps {
  params: Promise<{
    categoryId: string;
    categorySlug: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();

    return categories.map((category) => ({
      categoryId: category.id.toString(),
      categorySlug: slugify(category.name || `category-${category.id}`),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: SubcategoriesPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  const id = parseInt(categoryId, 10);

  if (isNaN(id)) {
    return generateSEO({
      title: "Category Not Found",
      description: "The requested category could not be found.",
      url: "/products",
    });
  }

  try {
    const category = await fetchCategoryById(id);

    if (!category) {
      return generateSEO({
        title: "Category Not Found",
        description: "The requested category could not be found.",
        url: "/products",
      });
    }

    const categorySlug = slugify(category.name || `category-${category.id}`);

    return generateSEO({
      title: `${category.name} | UCRS Products`,
      description: `Explore ${category.name} subcategories and products. Browse high-quality locomotive components and railway parts manufactured to OEM standards.`,
      url: `/products/${category.id}/${categorySlug}`,
      keywords: [
        category.name || "",
        "locomotive parts",
        "railway components",
        "UCRS products",
        "OEM standards",
        "rolling stock",
      ],
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return generateSEO({
      title: "Category",
      description: "Browse product categories",
      url: "/products",
    });
  }
}

export default async function SubcategoriesPage({
  params,
}: SubcategoriesPageProps) {
  const { categoryId } = await params;
  const id = parseInt(categoryId, 10);

  // Validate category ID
  if (isNaN(id)) {
    notFound();
  }

  // Fetch category and subcategories
  let category: Awaited<ReturnType<typeof fetchCategoryById>> = null;
  let subcategories: Awaited<ReturnType<typeof fetchSubcategories>> = [];
  let error: string | null = null;

  try {
    category = await fetchCategoryById(id);

    if (!category) {
      notFound();
    }

    subcategories = await fetchSubcategories(id);
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    error =
      err instanceof Error
        ? err.message
        : "Failed to load subcategories. Please try again later.";
    subcategories = [];
  }

  // Generate breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Products", url: "/products" },
    { name: category?.name || "Category", url: "" },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 mt-24 lg:mt-28">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {error ? (
            // Error State
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-red-900 mb-4">
                  Error Loading Subcategories
                </h2>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            // Content Layout: Main + Sidebar
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Area */}
              <div className="flex-1">
                <CategoryContent
                  category={category}
                  subcategoriesCount={subcategories?.length || 0}
                />
              </div>

              {/* Sidebar */}
              <aside className="lg:w-80">
                <SubcategoriesSidebar
                  categoryId={id}
                  categoryName={category?.name || ""}
                  subcategories={subcategories || []}
                />
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
