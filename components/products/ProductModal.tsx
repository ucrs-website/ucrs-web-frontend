/**
 * Product Modal Component
 * Modal dialog for displaying product details with virtual URL support
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import type { ProductWithImage } from "@/lib/types/products";
import { useQuoteCart } from "@/lib/hooks/useQuoteCart";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ProductModalProps {
  product: ProductWithImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToQuote, isInQuote } = useQuoteCart();
  const [imageError, setImageError] = useState(false);
  const inCart = product ? isInQuote(product.oemSku) : false;

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [isOpen]);

  const handleAddToQuote = () => {
    if (product) {
      addToQuote(product);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={
                  imageError
                    ? "/images/products/default-product.avif"
                    : product.imageUrl
                }
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={() => setImageError(true)}
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Product Name */}
              <h2
                id="modal-title"
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {product.name}
              </h2>

              {/* SKU */}
              <p className="text-sm font-mono text-gray-600 mb-6">
                Part Number:{" "}
                <span className="font-semibold">{product.oemSku}</span>
              </p>

              {/* Description */}
              <div className="flex-1 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Product Information
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Brand:</dt>
                    <dd className="font-medium text-gray-900">UCRS</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Category:</dt>
                    <dd className="font-medium text-gray-900">
                      Locomotive Components
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Availability:</dt>
                    <dd className="font-medium text-green-600">In Stock</dd>
                  </div>
                </dl>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleAddToQuote}
                  disabled={inCart}
                  className={cn(
                    "flex-1 px-6 py-3 font-semibold rounded-lg transition-colors",
                    inCart
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90",
                  )}
                >
                  {inCart ? "Added to Quote" : "Request a Quote"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
