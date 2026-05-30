import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getLikedSongs, likeSong as apiLike, unlikeSong as apiUnlike } from '../services/api.js'

const LikedContext = createContext(null)

export function LikedProvider({ children }) {
  const [likedIds, setLikedIds] = useState(() => new Set())
  const [likedSongs, setLikedSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2800)
  }, [])

  const refreshLiked = useCallback(async () => {
    try {
      const songs = await getLikedSongs()
      setLikedSongs(songs)
      setLikedIds(new Set(songs.map((s) => s.id)))
    } catch {
      setLikedSongs([])
      setLikedIds(new Set())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshLiked()
  }, [refreshLiked])

  const isLiked = useCallback(
    (songId) => likedIds.has(Number(songId)),
    [likedIds],
  )

  const toggleLike = useCallback(
    async (song, event) => {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }

      const songId = Number(song.id)
      const wasLiked = likedIds.has(songId)

      if (wasLiked) {
        setLikedIds((prev) => {
          const next = new Set(prev)
          next.delete(songId)
          return next
        })
        setLikedSongs((prev) => prev.filter((s) => s.id !== songId))
        showToast('Removed from Liked Songs')

        try {
          await apiUnlike(songId)
        } catch {
          setLikedIds((prev) => new Set(prev).add(songId))
          setLikedSongs((prev) => [song, ...prev])
          showToast('Could not remove song. Try again.')
        }
      } else {
        setLikedIds((prev) => new Set(prev).add(songId))
        setLikedSongs((prev) => [song, ...prev])
        showToast('Added to Liked Songs')

        try {
          await apiLike(songId)
        } catch {
          setLikedIds((prev) => {
            const next = new Set(prev)
            next.delete(songId)
            return next
          })
          setLikedSongs((prev) => prev.filter((s) => s.id !== songId))
          showToast('Could not save song. Try again.')
        }
      }
    },
    [likedIds, showToast],
  )

  const value = useMemo(
    () => ({
      likedIds,
      likedSongs,
      loading,
      isLiked,
      toggleLike,
      refreshLiked,
      toast,
    }),
    [likedIds, likedSongs, loading, isLiked, toggleLike, refreshLiked, toast],
  )

  return <LikedContext.Provider value={value}>{children}</LikedContext.Provider>
}

export function useLiked() {
  const context = useContext(LikedContext)
  if (!context) {
    throw new Error('useLiked must be used within LikedProvider')
  }
  return context
}
