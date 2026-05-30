import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePlayer } from '../../context/PlayerContext.jsx'
import { extractColorsFromImage, DEFAULT_COLORS } from '../../utils/extractColors.js'
import PlayerControls from './PlayerControls.jsx'
import styles from './FullScreenPlayer.module.css'

function FullScreenPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isFullscreenOpen,
    closeFullscreen,
    togglePlayPause,
    seekTo,
    updateCurrentSongLyrics,
  } = usePlayer()

  const [colors, setColors] = useState(DEFAULT_COLORS)
  const [dragY, setDragY] = useState(0)
  const [showLyrics, setShowLyrics] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [lyricsText, setLyricsText] = useState('')

  useEffect(() => {
    if (currentSong) {
      setLyricsText(currentSong.lyrics || '')
    }
    setShowLyrics(false)
    setIsEditing(false)
  }, [currentSong?.id])

  const handleSaveLyrics = async () => {
    if (!currentSong) return
    try {
      const response = await fetch(`/api/songs/${currentSong.id}/lyrics`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lyrics: lyricsText }),
      })
      const data = await response.json()
      if (data.success) {
        updateCurrentSongLyrics(lyricsText)
        setIsEditing(false)
      } else {
        alert('Failed to save lyrics')
      }
    } catch (error) {
      console.error('Error saving lyrics:', error)
      alert('Error connecting to server to save lyrics')
    }
  }

  useEffect(() => {
    if (!currentSong?.cover_url) {
      setColors(DEFAULT_COLORS)
      return
    }
    let cancelled = false
    extractColorsFromImage(currentSong.cover_url).then((result) => {
      if (!cancelled) setColors(result)
    })
    return () => {
      cancelled = true
    }
  }, [currentSong?.cover_url])

  useEffect(() => {
    if (!isFullscreenOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeFullscreen()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isFullscreenOpen, closeFullscreen])

  const handleDragEnd = useCallback(
    (_, info) => {
      if (info.offset.y > 120 || info.velocity.y > 600) {
        closeFullscreen()
      }
      setDragY(0)
    },
    [closeFullscreen],
  )

  const songSeed =
    typeof currentSong?.id === 'number'
      ? currentSong.id
      : String(currentSong?.id || '')
          .split('')
          .reduce((acc, char) => acc + char.charCodeAt(0), 0)

  return (
    <AnimatePresence>
      {isFullscreenOpen && currentSong && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={styles.backdrop}
            style={{
              '--color-primary': colors.primary,
              '--color-secondary': colors.secondary,
              '--color-accent': colors.accent,
            }}
          >
            <img
              className={styles.backdropImage}
              src={currentSong.cover_url}
              alt=""
              aria-hidden="true"
            />
            <div className={styles.backdropGradient} />
            <div className={styles.backdropGlow} />
          </div>

          <motion.div
            className={styles.sheet}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.12}
            onDrag={(_, info) => setDragY(Math.max(0, info.offset.y))}
            onDragEnd={handleDragEnd}
            style={{ y: dragY }}
            initial={{ y: '8%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '12%', opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeFullscreen}
              aria-label="Close fullscreen player"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className={styles.dragHint} aria-hidden="true" />

            <div className={styles.content}>
              <motion.div
                className={styles.artWrap}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  className={styles.albumArt}
                  src={currentSong.cover_url}
                  alt={`${currentSong.title} cover`}
                />
              </motion.div>

              <motion.div
                className={styles.songInfo}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.4 }}
              >
                <h1 className={styles.title}>
                  {currentSong.artist} - {currentSong.title}
                </h1>
              </motion.div>
            </div>

            <PlayerControls
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              songId={songSeed}
              onTogglePlay={togglePlayPause}
              onSeek={seekTo}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FullScreenPlayer
