'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-9xl font-extrabold text-destructive mb-4">500</h1>
            <h2 className="text-4xl font-bold mb-4">Critical Error</h2>
            <p className="text-lg text-muted-foreground mb-8">
              A critical error occurred. Please refresh the page to continue.
            </p>

            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
