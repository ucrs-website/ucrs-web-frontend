/**
 * Subcategories Sidebar Component
 * Displays list of subcategories with product counts and links
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types/products";
import { getSubcategoryUrl } from "@/lib/utils/url-helpers";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SubcategoriesSidebarProps {
  categoryId: number;
  categoryName: string;
  subcategories: Category[];
  className?: string;
}

export function SubcategoriesSidebar({
  categoryId,
  categoryName,
  subcategories,
  className,
}: SubcategoriesSidebarProps) {
  const pathname = usePathname();

  if (!subcategories || subcategories.length === 0) {
    return (
      <div
        className={cn(
          "bg-gray-50 rounded-lg p-6 lg:sticky lg:top-24",
          className
        )}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Subcategories</h2>
        <p className="text-gray-500 text-sm">
          No subcategories available for this category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-gray-50 rounded-lg p-6 lg:sticky lg:top-24",
        className
      )}
    >
      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Subcategories</h2>

      {/* Subcategories List */}
      <nav aria-label="Subcategories navigation">
        <ul className="space-y-1">
          {subcategories.map((subcategory) => {
            const subcategoryUrl = getSubcategoryUrl(
              categoryId,
              categoryName,
              subcategory.id,
              subcategory.name || ""
            );
            const isActive = pathname.includes(
              `${categoryId}/${subcategory.id}`
            );

            return (
              <li key={subcategory.id}>
                <Link
                  href={subcategoryUrl}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "hover:bg-white hover:shadow-sm text-gray-700"
                  )}
                >
                  {/* Subcategory Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={cn(
                        "font-semibold text-sm mb-1 truncate",
                        isActive ? "text-white" : "text-gray-900"
                      )}
                    >
                      {subcategory.name}
                    </h3>
                    <p
                      className={cn(
                        "text-xs",
                        isActive
                          ? "text-white/80"
                          : "text-primary font-medium"
                      )}
                    >
                      {subcategory.productCount || 0} products
                    </p>
                  </div>

                  {/* Chevron Icon */}
                  <ChevronRight
                    className={cn(
                      "w-5 h-5 flex-shrink-0 ml-2 transition-transform",
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-primary group-hover:translate-x-1"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Total Count */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {subcategories.length}
          </span>{" "}
          {subcategories.length === 1 ? "subcategory" : "subcategories"} total
        </p>
      </div>
    </div>
  );
}
