/**
 * Quote Request API Route
 * Handles quote request submissions and sends emails via Gmail API
 */

import { NextRequest, NextResponse } from "next/server";
import type { QuoteFormData } from "@/lib/types/quote";
import { sendQuoteRequestEmail } from "@/lib/services/gmail-service";
import { addQuoteRequest } from "@/lib/googleSheets";

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')
  const cfConnecting = request.headers.get('cf-connecting-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (real) {
    return real
  }
  if (cfConnecting) {
    return cfConnecting
  }

  return 'Unknown'
}

/**
 * Format quote details for Google Sheets
 */
function formatQuoteDetails(data: QuoteFormData): string {
  if (data.quoteType === "products" && data.products) {
    const productsText = data.products.map((p, i) =>
      `${i + 1}. ${p.name} (SKU: ${p.oemSku}) - Qty: ${p.quantity}${p.description ? ` - ${p.description}` : ''}`
    ).join('\n')
    return `PRODUCTS:\n${productsText}`
  } else if (data.quoteType === "services" && data.services) {
    const selectedServices = Object.entries(data.services.serviceTypes)
      .filter(([_, selected]) => selected)
      .map(([service]) => service.charAt(0).toUpperCase() + service.slice(1))
      .join(', ')
    return `SERVICES: ${selectedServices}\n\nDESCRIPTION:\n${data.services.description}`
  }
  return ''
}

export async function POST(request: NextRequest) {
  try {
    const data: QuoteFormData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: Full Name, Email, and Phone are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Validate quote type requirements
    if (data.quoteType === "products" && (!data.products || data.products.length === 0)) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one product is required for product quotes",
        },
        { status: 400 }
      );
    }

    if (data.quoteType === "services") {
      const hasSelectedService = data.services
        ? Object.values(data.services.serviceTypes).some((selected) => selected)
        : false;

      if (!hasSelectedService) {
        return NextResponse.json(
          {
            success: false,
            error: "At least one service type is required for service quotes",
          },
          { status: 400 }
        );
      }

      if (!data.services?.description || data.services.description.trim() === "") {
        return NextResponse.json(
          {
            success: false,
            error: "Please describe the services you need",
          },
          { status: 400 }
        );
      }
    }

    // Log quote request details
    console.log("📧 Processing Quote Request:", {
      name: data.fullName,
      email: data.email,
      company: data.companyName || "N/A",
      quoteType: data.quoteType,
      productsCount: data.products?.length || 0,
      servicesSelected: data.services
        ? Object.entries(data.services.serviceTypes)
            .filter(([_, selected]) => selected)
            .map(([service]) => service)
        : [],
    });

    // Get client info
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ipAddress = getClientIP(request)
    const timestamp = new Date().toISOString()

    // Format quote details for Google Sheets
    const quoteDetails = formatQuoteDetails(data)
    const fullPhone = `${data.phoneCountryCode} ${data.phone}`
    const attachmentUrls = data.attachmentUrls?.join(', ') || ''

    // Step 1: Save to Google Sheets FIRST
    try {
      await addQuoteRequest({
        timestamp,
        fullName: data.fullName,
        companyName: data.companyName || '',
        email: data.email,
        phone: fullPhone,
        country: data.country || '',
        quoteType: data.quoteType.toUpperCase(),
        details: quoteDetails,
        attachmentUrls,
        ipAddress,
        userAgent,
      })
      console.log("✅ Quote request saved to Google Sheets")
    } catch (sheetError) {
      console.error("❌ Failed to save to Google Sheets:", sheetError)
      // Continue with email even if Sheets fails
      console.warn("⚠️ Continuing with email despite Sheets error")
    }

    // Step 2: Prepare email data
    const emailData = {
      userInfo: {
        fullName: data.fullName,
        companyName: data.companyName,
        email: data.email,
        country: data.country,
        phone: data.phone,
      },
      quoteType: data.quoteType,
      products: data.products?.map(product => ({
        name: product.name,
        oemSku: product.oemSku,
        quantity: product.quantity,
        description: product.description,
        imageUrl: product.imageUrl,
      })),
      services: data.services ? {
        serviceTypes: data.services.serviceTypes,
        description: data.services.description,
      } : undefined,
      attachments: data.attachmentUrls,
    };

    // Step 3: Send email via Gmail API
    const emailResult = await sendQuoteRequestEmail(emailData);

    if (!emailResult.success) {
      throw new Error("Failed to send quote request email");
    }

    console.log(`✅ Quote request email sent successfully (Message ID: ${emailResult.messageId})`);

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully. Our team will contact you shortly.",
      messageId: emailResult.messageId,
    });

  } catch (error) {
    console.error("❌ Quote request error:", error);

    // Check if it's a validation error
    if (error instanceof Error && error.message.includes("Missing Gmail")) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error
          ? error.message
          : "An error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
