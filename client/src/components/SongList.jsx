import { usePlayer } from '../context/PlayerContext.jsx'
import { PlayIcon } from './icons/PlayerIcons.jsx'
import HeartButton from './HeartButton.jsx'

function Equalizer() {
  return (
    <span className="equalizer" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function SongList({ songs }) {
  const { currentSong, isPlaying, playSong } = usePlayer()

  if (!songs.length) {
    return <p className="empty-state">No songs found. Try a different search.</p>
  }

  return (
    <section className="song-list">
      <div className="song-list-header" aria-hidden="true">
        <span>#</span>
        <span>Title</span>
        <span className="song-list-like-col" />
        <span>Duration</span>
      </div>
      {songs.map((song, index) => {
        const active = currentSong?.id === song.id
        const playing = active && isPlaying

        return (
          <div
            key={song.id}
            role="button"
            tabIndex={0}
            className={`song-row ${active ? 'active' : ''} ${playing ? 'playing' : ''}`}
            onClick={() => playSong(song, songs)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                playSong(song, songs)
              }
            }}
          >
            <span className="song-index">
              {playing ? (
                <Equalizer />
              ) : (
                <>
                  <span className="song-index-num">{index + 1}</span>
                  <span className="song-index-play">
                    <PlayIcon />
                  </span>
                </>
              )}
            </span>
            <img src={song.cover_url} alt={song.title} className="song-cover" />
            <span className="song-meta">
              <strong>{song.title}</strong>
              <small>{song.artist}</small>
            </span>
            <span className="song-like-cell">
              <HeartButton song={song} size="sm" />
            </span>
            <span className="song-duration">{song.duration || '3:12'}</span>
          </div>
        )
      })}
    </section>
  )
}

export default SongList
