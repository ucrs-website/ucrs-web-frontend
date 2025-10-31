/**
 * Category Image Mapping
 * Maps category IDs to image filenames
 */

/**
 * Category ID to image filename mapping
 * Images are stored in /public/images/categories/
 */
export const categoryImageMap: Record<number, string> = {
  1100: "locomotive-engines.avif",
  1200: "tracktion-motors.avif",
  1300: "brake-system.avif",
  1400: "generators-alternators.avif",
  1500: "truck-assembly.avif",
  1600: "fans-blowers.avif",
  1700: "control-system.avif",
  1800: "compressed-air.avif",
  1900: "specialty-tools.avif",
  2100: "filters.avif",
  2200: "miscellaneous.avif",
  2400: "carbody.avif",
  2500: "freight-cars.avif",
};

/**
 * Get category image path by category ID
 * Returns fallback image if category not found in map
 */
export function getCategoryImage(categoryId: number): string {
  const imageName = categoryImageMap[categoryId];

  if (imageName) {
    return `/images/categories/${imageName}`;
  }

  // Fallback to default category image
  return "/images/categories/default-category.jpg";
}

/**
 * Get all category IDs that have images
 */
export function getCategoryIdsWithImages(): number[] {
  return Object.keys(categoryImageMap).map(Number);
}

/**
 * Check if a category has a custom image
 */
export function hasCategoryImage(categoryId: number): boolean {
  return categoryId in categoryImageMap;
}
