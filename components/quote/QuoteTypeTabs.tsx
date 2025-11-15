/**
 * Quote Type Tabs Component
 * Tabs for switching between Buy Products and Get Services
 */

"use client";

import { cn } from "@/lib/utils";

interface QuoteTypeTabsProps {
  activeTab: "products" | "services";
  onTabChange: (tab: "products" | "services") => void;
}

export function QuoteTypeTabs({ activeTab, onTabChange }: QuoteTypeTabsProps) {
  return (
    <div className="w-full bg-white rounded-lg p-1 flex gap-1">
      <button
        type="button"
        onClick={() => onTabChange("products")}
        className={cn(
          "flex-1 py-3 px-6 text-sm font-medium rounded-md transition-all",
          activeTab === "products"
            ? "bg-white text-gray-900 shadow-sm"
            : "bg-transparent text-gray-600 hover:text-gray-900"
        )}
      >
        Order Products
      </button>
      <button
        type="button"
        onClick={() => onTabChange("services")}
        className={cn(
          "flex-1 py-3 px-6 text-sm font-medium rounded-md transition-all",
          activeTab === "services"
            ? "bg-white text-gray-900 shadow-sm"
            : "bg-transparent text-gray-600 hover:text-gray-900"
        )}
      >
        Order Services
      </button>
    </div>
  );
}
