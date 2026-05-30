import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SongList from '../components/SongList.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import { getPlaylistById } from '../services/api.js'
import { usePlayer } from '../context/PlayerContext.jsx'
import { PlayIcon } from '../components/icons/PlayerIcons.jsx'

function PlaylistPage() {
  const { id } = useParams()
  const { playSong, currentSong, isPlaying, togglePlayPause } = usePlayer()
  const [playlist, setPlaylist] = useState(null)
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getPlaylistById(id)
      .then((data) => {
        setPlaylist(data.playlist)
        setSongs(data.songs || [])
      })
      .catch(() => setError('Unable to fetch playlist songs right now.'))
      .finally(() => setLoading(false))
  }, [id])

  const isThisPlaylistPlaying =
    songs.length > 0 && currentSong && songs.some((s) => s.id === currentSong.id) && isPlaying

  const handlePlayAll = () => {
    if (!songs.length) return
    if (isThisPlaylistPlaying) {
      togglePlayPause()
      return
    }
    playSong(songs[0], songs)
  }

  return (
    <section className="page">
      {playlist && (
        <div className="playlist-header">
          <img src={playlist.cover_url} alt={playlist.name} className="playlist-cover" />
          <div className="playlist-meta">
            <p className="eyebrow">Playlist</p>
            <h2>{playlist.name}</h2>
            <p className="playlist-count">{songs.length} tracks</p>
            <button
              type="button"
              className="play-all-btn"
              onClick={handlePlayAll}
              disabled={!songs.length}
            >
              <PlayIcon />
              {isThisPlaylistPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
      {loading ? <LoadingSkeleton /> : <SongList songs={songs} />}
    </section>
  )
}

export default PlaylistPage
