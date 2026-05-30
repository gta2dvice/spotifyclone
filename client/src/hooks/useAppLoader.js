import { useEffect, useState } from 'react'

const EXIT_MS = 700

/**
 * Manages fullscreen loader visibility until the app is ready.
 * Waits for window load, optional API warmup, and a minimum display time.
 */
export function useAppLoader({ minDuration = 2200 } = {}) {
  const [phase, setPhase] = useState('loading') // loading | exiting | done
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false
    let progressTimer

    const bumpProgress = () => {
      setProgress((prev) => {
        if (prev >= 92) return prev
        const step = 4 + Math.random() * 10
        return Math.min(92, prev + step)
      })
    }

    progressTimer = window.setInterval(bumpProgress, 180)

    const windowReady = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve()
        return
      }
      window.addEventListener('load', resolve, { once: true })
    })

    const minTime = new Promise((resolve) => {
      window.setTimeout(resolve, minDuration)
    })

    const warmupData = Promise.all([
      fetch('/api/playlists').then((res) => (res.ok ? res.json() : null)).catch(() => null),
      fetch('/api/liked').then((res) => (res.ok ? res.json() : null)).catch(() => null),
    ])

    Promise.all([windowReady, minTime, warmupData]).then(() => {
      if (cancelled) return
      window.clearInterval(progressTimer)
      setProgress(100)

      window.setTimeout(() => {
        if (!cancelled) setPhase('exiting')
      }, 350)

      window.setTimeout(() => {
        if (!cancelled) setPhase('done')
      }, 350 + EXIT_MS)
    })

    return () => {
      cancelled = true
      window.clearInterval(progressTimer)
    }
  }, [minDuration])

  return {
    visible: phase !== 'done',
    exiting: phase === 'exiting',
    progress,
  }
}
