'use client'

import { useEffect } from 'react'

export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey

      const key = event.key.toLowerCase()
      const combo = modifier ? `ctrl+${key}` : key

      if (shortcuts[combo]) {
        event.preventDefault()
        shortcuts[combo]()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}