import { useEffect, useMemo, useState } from 'react'
import SongList from '../components/SongList.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import { getSongs } from '../services/api.js'
import { DEMO_SONGS } from '../data/demoSongs.js'
import SearchIcon from '../assets/icons/search.svg'

function SearchPage() {
  const [songs, setSongs] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSongs()
      .then((data) => setSongs(data))
      .catch(() => {
        setSongs(DEMO_SONGS)
        setError('')
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredSongs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return songs
    }
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(normalizedQuery) ||
        song.artist.toLowerCase().includes(normalizedQuery),
    )
  }, [songs, query])

  return (
    <section className="page">
      <div className="search-box">
        <img src={SearchIcon} alt="" className="search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      {loading ? <LoadingSkeleton /> : <SongList songs={filteredSongs} />}
    </section>
  )
}

export default SearchPage
