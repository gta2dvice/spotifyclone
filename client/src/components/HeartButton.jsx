import { motion } from 'framer-motion'
import { useLiked } from '../context/LikedContext.jsx'
import './HeartButton.css'

function HeartIcon({ filled }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function HeartButton({ song, size = 'md', className = '' }) {
  const { isLiked, toggleLike } = useLiked()
  const liked = isLiked(song.id)

  return (
    <motion.button
      type="button"
      className={`heart-btn heart-btn--${size} ${liked ? 'heart-btn--liked' : ''} ${className}`}
      onClick={(e) => toggleLike(song, e)}
      aria-label={liked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
      whileTap={{ scale: 0.85 }}
      animate={liked ? { scale: [1, 1.25, 1] } : { scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <HeartIcon filled={liked} />
    </motion.button>
  )
}

export default HeartButton
