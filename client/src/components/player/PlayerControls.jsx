import { motion } from 'framer-motion'
import Waveform from './Waveform.jsx'
import { useProgress, ProgressTime } from './ProgressBar.jsx'
import styles from './PlayerControls.module.css'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1.5" />
      <rect x="14" y="5" width="4" height="14" rx="1.5" />
    </svg>
  )
}

function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  songId,
  onTogglePlay,
  onSeek,
}) {
  const { progress, seekFromRatio } = useProgress(currentTime, duration)

  return (
    <div className={styles.controls}>
      <motion.button
        type="button"
        className={styles.playButton}
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </motion.button>

      <div className={styles.waveformWrap}>
        <ProgressTime currentTime={currentTime} duration={duration} />
        <Waveform
          progress={progress}
          isPlaying={isPlaying}
          songId={songId}
          onSeek={(ratio) => seekFromRatio(ratio, onSeek)}
        />
      </div>
    </div>
  )
}

export default PlayerControls
