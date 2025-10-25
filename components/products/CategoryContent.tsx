/**
 * Category Content Component
 * Displays category information, description, and overview
 */

import Image from "next/image";
import type { Category } from "@/lib/types/products";
import { getCategoryImage } from "@/lib/utils/image-helpers";
import { cn } from "@/lib/utils";

interface CategoryContentProps {
  category: Category | null | undefined;
  subcategoriesCount: number;
  className?: string;
}

export function CategoryContent({
  category,
  subcategoriesCount,
  className,
}: CategoryContentProps) {
  if (!category) {
    return (
      <div className={cn("text-center py-12", className)}>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Category Not Found
        </h1>
        <p className="text-gray-600">
          The requested category could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Category Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-lg text-gray-600">
          Explore {subcategoriesCount} subcategories with{" "}
          {category.productCount || 0} premium locomotive components
        </p>
      </div>

      {/* Category Image */}
      {category && (
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-white">
          <Image
            src={getCategoryImage(category.id)}
            alt={category.name || "Category"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 60vw"
            priority
          />
        </div>
      )}

      {/* Category Description */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About {category.name}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At UCRS, we manufacture and supply high-quality {category.name?.toLowerCase()}
          for locomotives, freight cars, and coaches. All components are engineered
          to meet or exceed OEM standards, ensuring reliability and longevity in
          demanding railway operations.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Browse our extensive selection of {category.productCount || 0} products
          across {subcategoriesCount} specialized subcategories. Each component
          is backed by our commitment to quality, precision manufacturing, and
          comprehensive technical support.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 pt-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">OEM Standards</h3>
          <p className="text-sm text-gray-600">
            All components manufactured to meet or exceed original equipment manufacturer specifications
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Quick Turnaround</h3>
          <p className="text-sm text-gray-600">
            Fast production and delivery to minimize downtime and keep your operations running
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Technical Support</h3>
          <p className="text-sm text-gray-600">
            Expert assistance from our engineering team for product selection and installation
          </p>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-lg p-8 mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Need Custom Solutions?
        </h3>
        <p className="text-gray-700 mb-4">
          Our engineering team can develop custom components tailored to your
          specific requirements. Contact us to discuss your project.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Contact Engineering Team
        </a>
      </div>
    </div>
  );
}
