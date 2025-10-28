/**
 * Product Search API Route
 * Searches for products by query string
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        products: [],
      });
    }

    // TODO: Implement actual product search against database
    // For now, return empty results
    // const products = await searchProducts(query);

    return NextResponse.json({
      products: [],
      message: "Product search not yet implemented. Please use the Explore Products button to browse the catalog.",
    });
  } catch (error) {
    console.error("Product search error:", error);
    return NextResponse.json(
      {
        products: [],
        error: "An error occurred while searching products",
      },
      { status: 500 }
    );
  }
}
