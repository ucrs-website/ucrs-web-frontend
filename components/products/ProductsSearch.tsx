/**
 * Products Search Component
 * Search input with debounced URL updates
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsSearchProps {
  initialSearch?: string;
  className?: string;
}

export function ProductsSearch({
  initialSearch = "",
  className,
}: ProductsSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      } else {
        params.delete("search");
      }

      // Reset to page 1 when searching
      params.delete("page");

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(url, { scroll: false });
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchValue, pathname, searchParams, router]);

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products by name or part number..."
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Hint */}
      {searchValue && (
        <p className="mt-2 text-sm text-gray-600">
          Searching for "{searchValue}"...
        </p>
      )}
    </div>
  );
}
