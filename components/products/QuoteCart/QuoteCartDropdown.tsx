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
  const { items, removeFromQuote, clearQuote } = useQuoteCart();
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

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <div className="container mx-auto px-4 py-4 border-[1px] shadow-sm border-gray-100 bg-white rounded-2xl max-w-[1170px] mt-2">
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
            <a
              href={quotePageUrl}
              className="inline-flex items-center px-6 py-2.5 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              Click to continue
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
