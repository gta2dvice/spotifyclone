import { usePlayer } from '../context/PlayerContext.jsx'
import { useLiked } from '../context/LikedContext.jsx'
import SongList from '../components/SongList.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import { PlayIcon } from '../components/icons/PlayerIcons.jsx'

function LikedHeartArt() {
  return (
    <div className="liked-cover-art" aria-hidden="true">
      <svg viewBox="0 0 80 80" fill="currentColor">
        <path d="M40 68l-3.2-2.9C18 48.8 8 40.4 8 28.3 8 18.6 15.8 11 25.5 11c6.2 0 12.1 2.9 16 7.5C45.4 13.9 51.3 11 57.5 11 67.2 11 75 18.6 75 28.3c0 12.1-10 20.5-28.8 36.8L40 68z" />
      </svg>
    </div>
  )
}

function LikedEmptyState() {
  return (
    <div className="liked-empty">
      <div className="liked-empty-heart" aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M60 102l-5.4-4.9C27 72.1 12 59.5 12 42.5 12 28.9 22.9 18 36.5 18c10.4 0 20.4 4.8 27 12.5C70.1 22.8 80.1 18 90.5 18 104.1 18 115 28.9 115 42.5c0 17-15 29.6-42.6 54.6L60 102z" />
        </svg>
      </div>
      <p>Songs you like will appear here.</p>
      <span className="liked-empty-hint">Click the heart on any track to save it.</span>
    </div>
  )
}

function LikedSongsPage() {
  const { likedSongs, loading } = useLiked()
  const { playSong, currentSong, isPlaying, togglePlayPause } = usePlayer()

  const isLikedPlaylistPlaying =
    likedSongs.length > 0 &&
    currentSong &&
    likedSongs.some((s) => s.id === currentSong.id) &&
    isPlaying

  const handlePlayAll = () => {
    if (!likedSongs.length) return
    if (isLikedPlaylistPlaying) {
      togglePlayPause()
      return
    }
    playSong(likedSongs[0], likedSongs)
  }

  const songLabel =
    likedSongs.length === 1 ? '1 song' : `${likedSongs.length} songs`

  return (
    <section className="page liked-page">
      <div className="liked-hero">
        <div className="liked-hero-bg" aria-hidden="true" />
        <div className="liked-hero-content">
          <LikedHeartArt />
          <div className="liked-hero-meta">
            <p className="eyebrow">Playlist</p>
            <h1>Liked Songs</h1>
            <p className="liked-hero-count">{loading ? '…' : songLabel}</p>
            {!loading && likedSongs.length > 0 && (
              <button
                type="button"
                className="play-all-btn"
                onClick={handlePlayAll}
              >
                <PlayIcon />
                {isLikedPlaylistPlaying ? 'Pause' : 'Play'}
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : likedSongs.length === 0 ? (
        <LikedEmptyState />
      ) : (
        <SongList songs={likedSongs} />
      )}
    </section>
  )
}

export default LikedSongsPage
