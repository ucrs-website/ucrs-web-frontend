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
import type { QuoteFormData, QuoteFormErrors } from "@/lib/types/quote";

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
    service: keyof QuoteFormData["services"]["serviceTypes"],
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* User Information Fields */}
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

      {/* File Upload */}
      <div className="md:col-span-1">
        <FileUploadField
          files={formData.attachments || []}
          onFilesChange={handleFilesChange}
        />
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
