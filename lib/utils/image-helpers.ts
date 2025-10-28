/**
 * Image Helper Utilities
 * Functions for handling product and category images with fallbacks
 */

import { getCategoryImage as getCategoryImageFromConfig } from "@/lib/config/category-images";

/**
 * Get product image path by OEM SKU
 * Images should be stored at: /public/images/products/{oemSku}.jpg
 * Returns fallback if specific image doesn't exist
 *
 * Convention:
 * - Primary: /images/products/{oemSku}.jpg
 * - Alternative: /images/products/{oemSku}.webp
 * - Fallback: /images/products/default-product.avif
 */
export function getProductImage(oemSku: string): string {
  // Clean the SKU for filename (remove special characters that might cause issues)
  const cleanSku = oemSku.replace(/[^\w\-]/g, "-").toLowerCase();

  // Return path to product image (will use fallback via Next.js Image onError)
  return `/images/products/${cleanSku}.jpg`;
}

/**
 * Get product image fallback path
 */
export function getProductImageFallback(): string {
  return "/images/products/default-product.avif";
}

/**
 * Get category image by category ID
 * Uses the category-images config mapping
 */
export function getCategoryImage(categoryId: number): string {
  return getCategoryImageFromConfig(categoryId);
}

/**
 * Get category image fallback path
 */
export function getCategoryImageFallback(): string {
  return "/images/categories/default-category.jpg";
}

/**
 * Get image alt text for product
 */
export function getProductImageAlt(
  productName: string,
  oemSku: string,
): string {
  return `${productName} - ${oemSku} | UCRS Locomotive Parts`;
}

/**
 * Get image alt text for category
 */
export function getCategoryImageAlt(categoryName: string): string {
  return `${categoryName} | Premium Locomotive Components | UCRS`;
}

/**
 * Prepare image for Next.js Image component with fallback
 */
export interface ImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
}

export function prepareProductImage(
  productName: string,
  oemSku: string,
): ImageProps {
  return {
    src: getProductImage(oemSku),
    alt: getProductImageAlt(productName, oemSku),
    fallbackSrc: getProductImageFallback(),
  };
}

export function prepareCategoryImage(
  categoryName: string,
  categoryId: number,
): ImageProps {
  return {
    src: getCategoryImage(categoryId),
    alt: getCategoryImageAlt(categoryName),
    fallbackSrc: getCategoryImageFallback(),
  };
}
