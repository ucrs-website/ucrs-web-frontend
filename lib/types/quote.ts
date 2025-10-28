/**
 * Quote Request Types
 * TypeScript types for the quote request system
 */

export interface QuoteFormData {
  // User information
  fullName: string;
  companyName?: string;
  email: string;
  country?: string;
  phone: string;
  phoneCountryCode: string;

  // Quote type
  quoteType: "products" | "services";

  // File upload
  attachments?: File[];
  attachmentUrls?: string[];

  // Products (if Buy Products selected)
  products?: QuoteProduct[];

  // Services (if Get Services selected)
  services?: QuoteService;
}

export interface QuoteProduct {
  oemSku: string;
  name: string;
  imageUrl: string;
  quantity: number;
  description?: string; // User-provided description
}

export interface QuoteService {
  serviceTypes: {
    repair: boolean;
    consulting: boolean;
    reverseEngineering: boolean;
    rebuild: boolean;
  };
  description: string; // "What you need?" textarea
}

export interface QuoteSubmissionResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Form validation errors
export interface QuoteFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  products?: string;
  services?: string;
  general?: string;
}
