import { useEffect, useMemo, useState } from 'react'

export type AutoCloseConfig = {
  isOpen: boolean
  autoCloseDuration?: boolean
  duration?: number
  onClose: () => void
}

export function useAutoClose({
  isOpen,
  autoCloseDuration = false,
  duration = 5000,
  onClose,
}: AutoCloseConfig) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    let timer: NodeJS.Timeout | any = null
    let interval: NodeJS.Timeout | any = null

    if (isOpen && autoCloseDuration) {
      const start = Date.now()
      timer = setTimeout(() => {
        onClose()
      }, duration)

      interval = setInterval(() => {
        const elapsed = Date.now() - start
        setProgress(100 - (elapsed / duration) * 100)
        if (elapsed >= duration) {
          clearInterval(interval)
        }
      }, 100)
    }

    return () => {
      if (timer) clearTimeout(timer)
      if (interval) clearInterval(interval)
      setProgress(100)
    }
  }, [isOpen, autoCloseDuration, duration, onClose])

  return progress
}
