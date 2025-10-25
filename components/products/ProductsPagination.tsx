/**
 * Products Pagination Component
 * Pagination controls with page numbers and navigation
 */

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  className?: string;
}

export function ProductsPagination({
  currentPage,
  totalPages,
  totalCount,
  className,
}: ProductsPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4", className)}>
      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span> ({totalCount} total products)
      </div>

      {/* Pagination Controls */}
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* First Page */}
        {currentPage > 1 && (
          <Link
            href={createPageUrl(1)}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="First page"
          >
            <ChevronsLeft className="w-5 h-5" />
          </Link>
        )}

        {/* Previous Page */}
        {currentPage > 1 && (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            ) : (
              <Link
                key={page}
                href={createPageUrl(page as number)}
                className={cn(
                  "min-w-[40px] px-3 py-2 text-center rounded-lg font-medium transition-colors",
                  currentPage === page
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Link>
            )
          )}
        </div>

        {/* Next Page */}
        {currentPage < totalPages && (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}

        {/* Last Page */}
        {currentPage < totalPages && (
          <Link
            href={createPageUrl(totalPages)}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Last page"
          >
            <ChevronsRight className="w-5 h-5" />
          </Link>
        )}
      </nav>
    </div>
  );
}
