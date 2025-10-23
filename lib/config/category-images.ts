/**
 * Category Image Mapping
 * Maps category IDs to image filenames
 */

/**
 * Category ID to image filename mapping
 * Images are stored in /public/images/categories/
 */
export const categoryImageMap: Record<number, string> = {
  1100: '1100-engines.jpg',
  1200: '1200-traction-motors.jpg',
  1300: '1300-brake-system.jpg',
  1400: '1400-generators-alternators.jpg',
  1500: '1500-truck-assembly.jpg',
  1600: '1600-fans-blowers.jpg',
  1700: '1700-control-system.jpg',
  1800: '1800-compressed-air.jpg',
  1900: '1900-specialty-tools.jpg',
  2100: '2100-filters.jpg',
  2200: '2200-miscellaneous.jpg',
  2400: '2400-carbody-platform.jpg',
}

/**
 * Get category image path by category ID
 * Returns fallback image if category not found in map
 */
export function getCategoryImage(categoryId: number): string {
  const imageName = categoryImageMap[categoryId]

  if (imageName) {
    return `/images/categories/${imageName}`
  }

  // Fallback to default category image
  return '/images/categories/default-category.jpg'
}

/**
 * Get all category IDs that have images
 */
export function getCategoryIdsWithImages(): number[] {
  return Object.keys(categoryImageMap).map(Number)
}

/**
 * Check if a category has a custom image
 */
export function hasCategoryImage(categoryId: number): boolean {
  return categoryId in categoryImageMap
}
