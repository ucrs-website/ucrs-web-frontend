/**
 * Category Card Component
 * Individual category card with image, name, and product count
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { CategoryWithImage } from '@/lib/types/products'
import { getCategoryImageFallback } from '@/lib/utils/image-helpers'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  category: CategoryWithImage
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={category.slug}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={imageError ? getCategoryImageFallback() : category.imageUrl}
          alt={category.name || 'Category'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm font-medium text-primary">
          +{category.productCount} products
        </p>
      </div>
    </Link>
  )
}
