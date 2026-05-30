import { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import { getPlaylists } from '../services/api.js'

function HomePage() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPlaylists()
      .then((data) => setPlaylists(data))
      .catch(() => setError('Failed to load playlists. Please start the backend server.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page">
      <div className="hero-banner">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-tag">Featured</span>
          <h2>Trending playlists</h2>
          <p>Discover your next favorite track with handcrafted collections.</p>
        </div>
      </div>

      <div className="section-head">
        <h2 className="section-title">Made for you</h2>
        <span className="section-count">
          {loading ? '…' : `${playlists.length} playlists`}
        </span>
      </div>

      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <LoadingSkeleton cards />
      ) : (
        <div className="card-grid">
          {playlists.map((playlist, index) => (
            <Card key={playlist.id} playlist={playlist} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}

export default HomePage
