/**
 * Quote Cart Dropdown Component
 * Expandable dropdown showing list of products in quote cart
 */

"use client";

import { useQuoteCart } from "@/lib/hooks/useQuoteCart";
import { QuoteCartItem } from "./QuoteCartItem";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuoteCartDropdownProps {
  isOpen: boolean;
}

export function QuoteCartDropdown({ isOpen }: QuoteCartDropdownProps) {
  const { items, removeFromQuote, clearQuote, setExpanded } = useQuoteCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const quotePageUrl = process.env.NEXT_PUBLIC_QUOTE_PAGE_URL || "/quote";

  const handleClearQuote = () => {
    if (showClearConfirm) {
      clearQuote();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };

  const handleContinue = () => {
    // Check if we're already on the quote page
    const isOnQuotePage = window.location.pathname === quotePageUrl || window.location.pathname.startsWith(quotePageUrl);

    if (isOnQuotePage) {
      // Close the dropdown
      setExpanded(false);

      // Scroll to quote-form
      const quoteFormElement = document.getElementById('quote-form');
      if (quoteFormElement) {
        quoteFormElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to quote page with hash
      window.location.href = `${quotePageUrl}#quote-form`;
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
      )}
    >
      {/* Container matching QuoteCartBar width */}
      <div className="mx-auto w-full max-w-[var(--container-max-width,1200px)] px-2 md:px-4">
        <div
          className="px-4 md:px-6 py-4 border-[1px] shadow-sm border-gray-100 bg-white rounded-2xl mt-2"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Your Selected Products
          </h3>

          <button
            type="button"
            onClick={handleClearQuote}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              showClearConfirm
                ? "bg-red-600 text-white hover:bg-red-700"
                : "text-gray-600 hover:text-red-600 hover:bg-red-50",
            )}
            aria-label="Clear all products from quote"
          >
            <Trash2 className="w-4 h-4" />
            <span>{showClearConfirm ? "Confirm Clear All?" : "Clear All"}</span>
          </button>
        </div>

        {/* Products List */}
        <div className="max-h-[320px] overflow-y-auto space-y-2 mb-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Your quote list is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <QuoteCartItem
                key={item.oemSku}
                item={item}
                onRemove={removeFromQuote}
              />
            ))
          )}
        </div>

        {/* Continue Button */}
        {items.length > 0 && (
          <div className="flex justify-end pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex items-center px-6 py-2.5 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              Click to continue
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
