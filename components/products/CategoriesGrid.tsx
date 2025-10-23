/**
 * Categories Grid Component
 * Grid layout displaying all product categories
 */

import type { Category } from '@/lib/types/products'
import { getCategoryUrl } from '@/lib/utils/url-helpers'
import { getCategoryImage } from '@/lib/utils/image-helpers'
import { CategoryCard } from './CategoryCard'

interface CategoriesGridProps {
  categories: Category[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  // Transform categories to include image URLs and slugs
  const categoriesWithImages = categories.map((category) => ({
    ...category,
    imageUrl: getCategoryImage(category.id),
    slug: getCategoryUrl(category.id, category.name || ''),
  }))

  // Sort by orderNo
  const sortedCategories = categoriesWithImages.sort(
    (a, b) => (a.orderNo || 0) - (b.orderNo || 0)
  )

  if (categories.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500">No categories available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Find everything you need
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
