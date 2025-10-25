/**
 * Products Filters Sidebar Component
 * Displays subcategories navigation and product groups filter
 */

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Category, ProductGroup } from "@/lib/types/products";
import { getSubcategoryUrl } from "@/lib/utils/url-helpers";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";

interface ProductsFiltersSidebarProps {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  subcategoryId: number;
  subcategoryName: string;
  productGroups: ProductGroup[];
  activeGroupId?: number;
  className?: string;
}

export function ProductsFiltersSidebar({
  categoryId,
  categoryName,
  categorySlug,
  subcategoryId,
  subcategoryName,
  productGroups,
  activeGroupId,
  className,
}: ProductsFiltersSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleGroupFilter = (groupId: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeGroupId === groupId) {
      // Remove filter if clicking the same group
      params.delete("groupId");
    } else {
      params.set("groupId", groupId.toString());
    }

    // Reset to page 1 when filtering
    params.delete("page");

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    window.location.href = url;
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("groupId");
    params.delete("search");
    params.delete("page");

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    window.location.href = url;
  };

  const hasActiveFilters = activeGroupId !== undefined || searchParams.get("search");

  return (
    <div className={cn("space-y-6", className)}>
      {/* Back to Category Link */}
      <div className="bg-gray-50 rounded-lg p-4">
        <Link
          href={`/products/${categoryId}/${categorySlug}`}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to {categoryName}
        </Link>
      </div>

      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-blue-900 text-sm">
              Active Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          </div>
          {activeGroupId && (
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <span>Group:</span>
              <span className="font-medium">
                {productGroups.find((g) => g.id === activeGroupId)?.name || "Unknown"}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Product Groups Filter */}
      {productGroups && productGroups.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4">Filter by Group</h3>
          <div className="space-y-2">
            {productGroups.map((group) => {
              const isActive = activeGroupId === group.id;

              return (
                <button
                  key={group.id}
                  onClick={() => handleGroupFilter(group.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "hover:bg-white hover:shadow-sm text-gray-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "font-medium text-sm",
                      isActive ? "text-white" : "text-gray-900"
                    )}>
                      {group.name}
                    </span>
                    {group.productCount !== undefined && (
                      <span className={cn(
                        "text-xs",
                        isActive ? "text-white/80" : "text-gray-500"
                      )}>
                        {group.productCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Subcategory Info */}
      <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg p-6 border border-primary/10">
        <h3 className="font-bold text-gray-900 mb-2">
          {subcategoryName}
        </h3>
        <p className="text-sm text-gray-600">
          Browse all products in this subcategory
        </p>
      </div>
    </div>
  );
}
