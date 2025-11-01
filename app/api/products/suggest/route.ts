/**
 * Product Suggestions API Route
 * Proxies requests to the UCRS API to avoid CORS issues
 */

import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://ucrs-api-staging-cjeucnemgabbg6am.canadaeast-01.azurewebsites.net'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = searchParams.get('limit') || '10'

    if (!query || query.trim().length === 0) {
      return NextResponse.json([])
    }

    const url = `${API_BASE_URL}/api/Products/suggest?q=${encodeURIComponent(
      query
    )}&limit=${limit}`

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      return NextResponse.json([], { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching product suggestions:', error)
    return NextResponse.json([], { status: 500 })
  }
}
