import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())

  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const currentSong = currentIndex >= 0 ? queue[currentIndex] : null

  // Restore player state on startup
  useEffect(() => {
    const savedPlayer = localStorage.getItem('playerState')

    if (!savedPlayer) return

    try {
      const data = JSON.parse(savedPlayer)

      if (data.queue?.length) {
        setQueue(data.queue)
        setCurrentIndex(data.currentIndex ?? 0)
        setCurrentTime(data.currentTime ?? 0)
        setIsPlaying(data.isPlaying ?? false)
      }
    } catch (error) {
      console.error('Failed to restore player state:', error)
      localStorage.removeItem('playerState')
    }
  }, [])

  // Volume
  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  // Audio events
  useEffect(() => {
    const audio = audioRef.current

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const onMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const onEnded = () => {
      setCurrentTime(0)

      setCurrentIndex((index) => {
        if (index + 1 < queue.length) {
          return index + 1
        }

        setIsPlaying(false)
        return index
      })
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [queue.length])

  // Load song
  useEffect(() => {
    const audio = audioRef.current

    if (!currentSong) return

    audio.src = currentSong.file_url

    const restorePosition = () => {
      const savedPlayer = localStorage.getItem('playerState')

      if (savedPlayer) {
        try {
          const data = JSON.parse(savedPlayer)

          if (data.song?.id === currentSong.id) {
            audio.currentTime = data.currentTime || 0
            setCurrentTime(data.currentTime || 0)
          }
        } catch (error) {
          console.error(error)
        }
      }

      if (isPlaying) {
        audio.play().catch(() => {
          setIsPlaying(false)
        })
      }
    }

    audio.addEventListener('loadedmetadata', restorePosition)

    audio.load()

    return () => {
      audio.removeEventListener('loadedmetadata', restorePosition)
    }
  }, [currentSong])

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current

    if (!audio.src) return

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Save player state
  useEffect(() => {
    if (!currentSong) return

    localStorage.setItem(
      'playerState',
      JSON.stringify({
        queue,
        currentIndex,
        song: currentSong,
        currentTime,
        isPlaying,
      }),
    )
  }, [queue, currentIndex, currentSong, currentTime, isPlaying])

  const playSong = (song, songs = []) => {
    const normalizedSongs = songs.length ? songs : [song]

    setQueue(normalizedSongs)

    const selectedIndex = normalizedSongs.findIndex(
      (item) => item.id === song.id,
    )

    setCurrentIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    if (!currentSong) return
    setIsPlaying((prev) => !prev)
  }

  const nextSong = () => {
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((index) => index + 1)
      setIsPlaying(true)
    }
  }

  const previousSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1)
      setIsPlaying(true)
      return
    }

    audioRef.current.currentTime = 0
    setCurrentTime(0)
  }

  const seekTo = (seconds) => {
    audioRef.current.currentTime = seconds
    setCurrentTime(seconds)
  }

  const setVolume = (value) => {
    setVolumeState(value)
  }

  const openFullscreen = () => {
    if (currentSong) {
      setIsFullscreenOpen(true)
    }
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
  }

  const updateCurrentSongLyrics = (newLyrics) => {
    if (currentIndex >= 0) {
      setQueue((prevQueue) => {
        const nextQueue = [...prevQueue]

        nextQueue[currentIndex] = {
          ...nextQueue[currentIndex],
          lyrics: newLyrics,
        }

        return nextQueue
      })
    }
  }

  const value = useMemo(
    () => ({
      queue,
      currentSong,
      isPlaying,
      currentTime,
      duration,
      volume,
      playSong,
      togglePlayPause,
      nextSong,
      previousSong,
      seekTo,
      setVolume,
      isFullscreenOpen,
      openFullscreen,
      closeFullscreen,
      updateCurrentSongLyrics,
    }),
    [
      queue,
      currentSong,
      isPlaying,
      currentTime,
      duration,
      volume,
      isFullscreenOpen,
    ],
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider')
  }

  return context
}