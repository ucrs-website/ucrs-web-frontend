/**
 * Toast Container Component
 * Container for rendering all active toast notifications
 */

'use client'

import { useToastStore } from '@/lib/store/toast-store'
import { Toast } from './toast'

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  )
}
