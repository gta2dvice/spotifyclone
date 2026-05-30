import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './Waveform.module.css'

const BAR_COUNT = 96

function seededHeights(seed) {
  const heights = []
  let value = seed
  for (let i = 0; i < BAR_COUNT; i += 1) {
    value = (value * 9301 + 49297) % 233280
    const normalized = value / 233280
    heights.push(0.22 + normalized * 0.78)
  }
  return heights
}

function Waveform({ progress = 0, isPlaying = false, onSeek, songId = 0 }) {
  const heights = useMemo(() => seededHeights(songId || 1), [songId])
  const playedBars = Math.floor(progress * BAR_COUNT)

  console.log('Waveform debug - songId:', songId, 'heights:', heights, 'progress:', progress)

  const handleClick = (event) => {
    if (!onSeek) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    onSeek(ratio)
  }

  return (
    <div
      className={styles.waveform}
      onClick={handleClick}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      tabIndex={0}
    >
      {heights.map((height, index) => {
        const played = index < playedBars
        return (
          <motion.span
            key={index}
            className={`${styles.bar} ${played ? styles.played : styles.unplayed}`}
            style={{ height: `${height * 38}px` }}
            animate={
              isPlaying && played
                ? {
                    scaleY: [1, 1.08 + height * 0.12, 1],
                    opacity: [0.92, 1, 0.92],
                  }
                : { scaleY: 1, opacity: played ? 1 : 0.42 }
            }
            transition={{
              duration: 0.55 + (index % 5) * 0.06,
              repeat: isPlaying && played ? Infinity : 0,
              ease: 'easeInOut',
              delay: (index % 7) * 0.03,
            }}
          />
        )
      })}
    </div>
  )
}

export default Waveform
