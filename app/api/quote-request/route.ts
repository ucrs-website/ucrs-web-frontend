/**
 * Quote Request API Route
 * Handles quote request submissions and sends emails via Gmail API
 */

import { NextRequest, NextResponse } from "next/server";
import type { QuoteFormData } from "@/lib/types/quote";

export async function POST(request: NextRequest) {
  try {
    const data: QuoteFormData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
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
    }

    // TODO: Implement Gmail API integration
    // For now, just log the data and return success
    console.log("Quote Request Received:", {
      name: data.fullName,
      email: data.email,
      company: data.companyName,
      quoteType: data.quoteType,
      productsCount: data.products?.length || 0,
      servicesSelected: data.services
        ? Object.entries(data.services.serviceTypes)
            .filter(([_, selected]) => selected)
            .map(([service]) => service)
        : [],
    });

    // TODO: Send email via Gmail API
    // const emailSent = await sendQuoteRequestEmail(data);
    // if (!emailSent) {
    //   throw new Error("Failed to send email");
    // }

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
    });
  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
