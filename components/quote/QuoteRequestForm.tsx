/**
 * Quote Request Form Component
 * Main form container with all sections and submission logic
 */

"use client";

import { useState } from "react";
import { UserInfoFields } from "./UserInfoFields";
import { FileUploadField } from "./FileUploadField";
import { QuoteTypeTabs } from "./QuoteTypeTabs";
import { ProductsQuoteView } from "./ProductsQuoteView";
import { ServicesQuoteView } from "./ServicesQuoteView";
import { useQuoteCart } from "@/lib/hooks/useQuoteCart";
import { COUNTRY_CODES } from "@/lib/data/country-codes";
import type { QuoteFormData, QuoteFormErrors, QuoteService } from "@/lib/types/quote";

interface QuoteRequestFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function QuoteRequestForm({ onSuccess, onError }: QuoteRequestFormProps) {
  const { items } = useQuoteCart();

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    companyName: "",
    email: "",
    country: "",
    phone: "",
    phoneCountryCode: "+1",
    quoteType: "products",
    attachments: [],
    services: {
      serviceTypes: {
        repair: false,
        consulting: false,
        reverseEngineering: false,
        rebuild: false,
      },
      description: "",
    },
  });

  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field as keyof QuoteFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFilesChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, attachments: files }));
  };

  const handleServiceTypeChange = (
    service: keyof QuoteService["serviceTypes"],
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services!,
        serviceTypes: {
          ...prev.services!.serviceTypes,
          [service]: checked,
        },
      },
    }));
    // Clear services error
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const handleDescriptionChange = (description: string) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services!,
        description,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: QuoteFormErrors = {};

    // Validate required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Validate quote type specific requirements
    if (formData.quoteType === "products") {
      if (items.length === 0) {
        newErrors.products = "Please add at least one product to your quote";
      }
    } else if (formData.quoteType === "services") {
      const hasSelectedService = Object.values(
        formData.services!.serviceTypes
      ).some((selected) => selected);
      if (!hasSelectedService) {
        newErrors.services = "Please select at least one service type";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submitData = {
        ...formData,
        products: formData.quoteType === "products" ? items : undefined,
      };

      // Submit to API
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess?.();
      } else {
        throw new Error(result.error || "Failed to submit quote request");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      onError?.(errorMessage);
      setErrors((prev) => ({ ...prev, general: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Information Fields (Name, Company, Email, Country) */}
      <UserInfoFields
        formData={{
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          country: formData.country,
          phone: formData.phone,
          phoneCountryCode: formData.phoneCountryCode,
        }}
        onChange={handleFieldChange}
        errors={errors}
      />

      {/* Third row: Phone + File Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone Number with Country Code */}
        <div className="relative">
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <div className="flex gap-2">
            {/* Country Code Dropdown */}
            <select
              value={formData.phoneCountryCode}
              onChange={(e) => handleFieldChange("phoneCountryCode", e.target.value)}
              className="w-28 pl-3 pr-8 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1rem",
              }}
            >
              {COUNTRY_CODES.map((country) => (
                <option key={`${country.code}-${country.dialCode}`} value={country.dialCode}>
                  {country.dialCode}
                </option>
              ))}
            </select>

            {/* Phone Input */}
            <div className="relative flex-1">
              <input
                type="tel"
                id="phone"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors?.phone && "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                }`}
                required
              />
            </div>
          </div>
          {errors?.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* File Upload */}
        <div className="relative">
          <FileUploadField
            files={formData.attachments || []}
            onFilesChange={handleFilesChange}
          />
        </div>
      </div>

      {/* Quote Type Tabs */}
      <QuoteTypeTabs
        activeTab={formData.quoteType}
        onTabChange={(tab) =>
          setFormData((prev) => ({ ...prev, quoteType: tab }))
        }
      />

      {/* Quote Type Content */}
      {formData.quoteType === "products" ? (
        <ProductsQuoteView error={errors.products} />
      ) : (
        <ServicesQuoteView
          serviceTypes={formData.services!.serviceTypes}
          description={formData.services!.description}
          onServiceTypeChange={handleServiceTypeChange}
          onDescriptionChange={handleDescriptionChange}
          error={errors.services}
        />
      )}

      {/* General Error */}
      {errors.general && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-start">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Confirm"}
        </button>
      </div>
    </form>
  );
}
