import { useMemo } from 'react'
import styles from './ProgressBar.module.css'

export function useProgress(currentTime = 0, duration = 0) {
  const progress = useMemo(() => {
    if (!duration || duration <= 0) return 0
    return Math.min(1, Math.max(0, currentTime / duration))
  }, [currentTime, duration])

  const seekFromRatio = (ratio, onSeek) => {
    if (!onSeek || !duration) return
    onSeek(ratio * duration)
  }

  return { progress, seekFromRatio }
}

export function ProgressTime({ currentTime, duration }) {
  const format = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <span className={styles.time}>
      {format(currentTime)}-{format(duration)}
    </span>
  )
}
