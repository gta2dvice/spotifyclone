import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayIcon } from './icons/PlayerIcons.jsx'

function Card({ playlist, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link to={`/playlist/${playlist.id}`} className="card">
        <div className="card-cover-wrap">
          <img src={playlist.cover_url} alt={playlist.name} className="card-cover" />
          <span className="card-play-btn" aria-hidden="true">
            <PlayIcon />
          </span>
        </div>
        <h3>{playlist.name}</h3>
        <p>{playlist.song_count} songs</p>
      </Link>
    </motion.div>
  )
}

export default Card
