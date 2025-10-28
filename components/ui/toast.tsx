/**
 * Toast Notification Component
 * Simple toast notification that appears at the bottom center of the screen
 */

'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle2 } from 'lucide-react'

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, duration - 300) // Start exit animation 300ms before close

    const closeTimer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(closeTimer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300',
        isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0',
        type === 'success' && 'bg-green-50 border-green-200 text-green-900',
        type === 'error' && 'bg-red-50 border-red-200 text-red-900',
        type === 'info' && 'bg-blue-50 border-blue-200 text-blue-900'
      )}
    >
      {/* Icon */}
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
      {type === 'error' && (
        <svg
          className="w-5 h-5 text-red-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M15 9l-6 6M9 9l6 6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {/* Message */}
      <p className="text-sm font-medium">{message}</p>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="ml-2 p-1 hover:bg-black/5 rounded transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
