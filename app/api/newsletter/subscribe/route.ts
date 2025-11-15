import { NextRequest, NextResponse } from 'next/server'
import { addNewsletterSubscriber, checkEmailExists } from '@/lib/googleSheets'

/**
 * Verify reCAPTCHA token
 */
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      throw new Error('Missing reCAPTCHA secret key')
    }

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    )

    const data = await response.json()

    // For reCAPTCHA v3, check score (0.0 - 1.0, higher is better)
    // Typical threshold is 0.5
    if (data.success && data.score >= 0.5) {
      return true
    }

    console.warn('reCAPTCHA verification failed:', {
      success: data.success,
      score: data.score,
      errors: data['error-codes'],
    })

    return false
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error)
    return false
  }
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Try various headers that might contain the real IP
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
 * POST /api/newsletter/subscribe
 * Subscribe to newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, recaptchaToken } = body

    // Validate input
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      )
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter.' },
        { status: 409 }
      )
    }

    // Get user agent and IP address
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ipAddress = getClientIP(request)
    const timestamp = new Date().toISOString()

    // Add subscriber to Google Sheets
    await addNewsletterSubscriber({
      email,
      timestamp,
      userAgent,
      ipAddress,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      {
        error: 'An error occurred while processing your subscription. Please try again later.',
      },
      { status: 500 }
    )
  }
}
