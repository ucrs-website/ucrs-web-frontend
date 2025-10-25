/**
 * Products Page
 * Displays products for a selected subcategory with filters and pagination
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  fetchCategories,
  fetchSubcategories,
  fetchCategoryById,
  fetchSubcategoryById,
  fetchProducts,
  fetchProductGroups,
} from "@/lib/api/products";
import { slugify } from "@/lib/utils/url-helpers";
import { getProductImage } from "@/lib/utils/image-helpers";
import { generateSEO, generateBreadcrumbSchema, generateProductSchema } from "@/lib/seo";
import type { ProductWithImage } from "@/lib/types/products";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { ProductsPageClient } from "@/components/products/ProductsPageClient";

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;

interface ProductsPageProps {
  params: Promise<{
    categoryId: string;
    categorySlug: string;
    subcategoryId: string;
    subcategorySlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    groupId?: string;
  }>;
}

// Generate static params for all subcategories
export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();
    const params = [];

    for (const category of categories) {
      try {
        const subcategories = await fetchSubcategories(category.id);
        const categorySlug = slugify(category.name || `category-${category.id}`);

        for (const subcategory of subcategories) {
          const subcategorySlug = slugify(
            subcategory.name || `subcategory-${subcategory.id}`
          );

          params.push({
            categoryId: category.id.toString(),
            categorySlug,
            subcategoryId: subcategory.id.toString(),
            subcategorySlug,
          });
        }
      } catch (err) {
        console.error(`Error fetching subcategories for category ${category.id}:`, err);
      }
    }

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { categoryId, subcategoryId } = await params;
  const catId = parseInt(categoryId, 10);
  const subId = parseInt(subcategoryId, 10);

  if (isNaN(catId) || isNaN(subId)) {
    return generateSEO({
      title: "Products Not Found",
      description: "The requested products could not be found.",
      url: "/products",
    });
  }

  try {
    const category = await fetchCategoryById(catId);
    const subcategory = await fetchSubcategoryById(catId, subId);

    if (!category || !subcategory) {
      return generateSEO({
        title: "Products Not Found",
        description: "The requested products could not be found.",
        url: "/products",
      });
    }

    const categorySlug = slugify(category.name || `category-${catId}`);
    const subcategorySlug = slugify(subcategory.name || `subcategory-${subId}`);

    return generateSEO({
      title: `${subcategory.name} | ${category.name} | UCRS Products`,
      description: `Browse ${subcategory.name} products in ${category.name}. High-quality locomotive components manufactured to OEM standards with fast delivery.`,
      url: `/products/${catId}/${categorySlug}/${subId}/${subcategorySlug}`,
      keywords: [
        subcategory.name || "",
        category.name || "",
        "locomotive parts",
        "railway components",
        "UCRS products",
        "OEM standards",
      ],
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return generateSEO({
      title: "Products",
      description: "Browse products",
      url: "/products",
    });
  }
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { categoryId, subcategoryId } = await params;
  const { page = "1", search = "", groupId } = await searchParams;

  const catId = parseInt(categoryId, 10);
  const subId = parseInt(subcategoryId, 10);
  const currentPage = parseInt(page, 10);

  // Validate IDs
  if (isNaN(catId) || isNaN(subId) || isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  // Fetch data
  let category: Awaited<ReturnType<typeof fetchCategoryById>> = null;
  let subcategory: Awaited<ReturnType<typeof fetchSubcategoryById>> = null;
  let productsData: Awaited<ReturnType<typeof fetchProducts>>;
  let productGroups: Awaited<ReturnType<typeof fetchProductGroups>> = [];
  let error: string | null = null;

  try {
    category = await fetchCategoryById(catId);
    subcategory = await fetchSubcategoryById(catId, subId);

    if (!category || !subcategory) {
      notFound();
    }

    // Fetch products with filters
    productsData = await fetchProducts(subId, {
      page: currentPage,
      search: search || undefined,
      groupId: groupId ? parseInt(groupId, 10) : undefined,
    });

    // Fetch product groups for filtering
    productGroups = await fetchProductGroups(subId);
  } catch (err) {
    console.error("Error fetching products:", err);
    error =
      err instanceof Error
        ? err.message
        : "Failed to load products. Please try again later.";
    productsData = { items: [], page: 1, pageSize: 20, total: 0, hasNext: false };
    productGroups = [];
  }

  // Generate breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Products", url: "/products" },
    {
      name: category?.name || "Category",
      url: `/products/${catId}/${slugify(category?.name || "")}`,
    },
    { name: subcategory?.name || "Subcategory", url: "" },
  ];

  const categorySlug = slugify(category?.name || "");

  // Enrich products with images
  const productsWithImages: ProductWithImage[] = productsData.items.map((product) => ({
    ...product,
    imageUrl: getProductImage(product.oemSku),
  }));

  // Generate structured data schemas
  const breadcrumbSchemaData = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    {
      name: category?.name || "Category",
      url: `/products/${catId}/${categorySlug}`,
    },
    {
      name: subcategory?.name || "Subcategory",
      url: `/products/${catId}/${categorySlug}/${subId}/${slugify(subcategory?.name || "")}`,
    },
  ]);

  // ItemList schema for products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: productsWithImages.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        sku: product.oemSku,
        description: product.description,
        image: product.imageUrl,
        brand: {
          "@type": "Brand",
          name: "UCRS",
        },
        category: subcategory?.name || "",
      },
    })),
  };

  // Individual Product schemas
  const productSchemas = productsWithImages.map((product) =>
    generateProductSchema({
      name: product.name,
      description: product.description,
      image: product.imageUrl,
      sku: product.oemSku,
      brand: "UCRS",
    })
  );

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={breadcrumbSchemaData} />
      <StructuredData data={itemListSchema} />
      {productSchemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          {error ? (
            // Error State
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-red-900 mb-4">
                  Error Loading Products
                </h2>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {subcategory?.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {productsData.total} products in {category?.name}
                </p>
              </div>

              {/* Client-side interactive content */}
              <ProductsPageClient
                products={productsWithImages}
                categoryId={catId}
                categoryName={category?.name || ""}
                categorySlug={categorySlug}
                subcategoryId={subId}
                subcategoryName={subcategory?.name || ""}
                productGroups={productGroups}
                activeGroupId={groupId ? parseInt(groupId, 10) : undefined}
                currentPage={productsData.page}
                totalPages={Math.ceil(productsData.total / productsData.pageSize)}
                totalCount={productsData.total}
                initialSearch={search}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
