'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-extrabold text-destructive mb-4">500</h1>
        <h2 className="text-4xl font-bold mb-4">Something Went Wrong</h2>
        <p className="text-lg text-muted-foreground mb-8">
          We encountered an unexpected error. This has been logged and we'll look into it.
          Please try refreshing the page or return to the homepage.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-muted rounded-lg text-left">
            <p className="font-mono text-sm text-destructive break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={reset} size="lg" className="flex items-center gap-2">
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p className="text-muted-foreground mb-4">
            If this problem persists, please contact our support team.
          </p>
          <Button asChild variant="ghost">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
