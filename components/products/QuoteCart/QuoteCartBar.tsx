/**
 * Quote Cart Bar Component
 * Fixed notification bar under header showing quote count and expand/collapse toggle
 */

"use client";

import { useQuoteCart } from "@/lib/hooks/useQuoteCart";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuoteCartDropdown } from "./QuoteCartDropdown";
import { useEffect, useState } from "react";

export function QuoteCartBar() {
  const { totalQuantity, isExpanded, toggleExpanded, hasItems } = useQuoteCart();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide at top (0px) or when scrolling up
      if (currentScrollY === 0 || currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      // Show when scrolling down past 120px
      else if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Don't render if cart is empty
  if (!hasItems) {
    return null;
  }

  const quotePageUrl = process.env.NEXT_PUBLIC_QUOTE_PAGE_URL || "/quote";

  return (
    <>
      {/* Backdrop Overlay */}
      {isExpanded && isVisible && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={toggleExpanded}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed top-[93px] left-0 right-0 z-40 transition-transform duration-300",
          isVisible ? "translate-y-0" : "-translate-y-[calc(100%+93px)]",
        )}
      >
        {/* Container matching header width */}
        <div className="mx-auto w-full max-w-[var(--container-max-width,1200px)] px-2 md:px-4">
          {/* Notification Bar */}
          <div
            className="bg-white py-3 px-4 md:px-6 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm rounded-2xl border-gray-100 border-[1px]"
            onClick={toggleExpanded}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm md:text-base font-medium text-gray-900">
                <span className="font-bold text-primary">{totalQuantity}</span>{" "}
                {totalQuantity === 1 ? "Product" : "Products"} added to your quote
                list
              </span>
            </div>

            <div className="flex-1 flex items-center justify-end md:justify-between gap-3">
              <a
                href={quotePageUrl}
                className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Click to continue
              </a>

              <button
                type="button"
                className="p-2 hover:bg-gray-100 transition-colors rounded-md border-gray-200 border-[1px]"
                aria-label={
                  isExpanded ? "Collapse quote list" : "Expand quote list"
                }
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <QuoteCartDropdown isOpen={isExpanded} />
      </div>
    </>
  );
}
