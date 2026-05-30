import { NavLink } from 'react-router-dom'
import HomeIcon from '../assets/icons/home.svg'
import SearchIcon from '../assets/icons/search.svg'
import MusicIcon from '../assets/icons/music.svg'

const links = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/search', label: 'Search', icon: SearchIcon },
  { to: '/liked', label: 'Liked Songs', icon: null, isLiked: true },
  { to: '/playlist/1', label: 'Your Library', icon: MusicIcon },
  { to: '/premium', label: 'Premium', icon: null, isPremium: true },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/Spotify_icon.svg" alt="Spotify Logo" className="brand-logo" />
        <div>
          <p className="brand-title">Spotify Clone</p>
          <p className="brand-subtitle">Premium vibe</p>
        </div>
      </div>
      <nav className="side-nav" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}
          >
            {link.isLiked ? (
              <span className="nav-icon nav-icon--liked" aria-hidden="true">
                ♥
              </span>
            ) : link.isPremium ? (
              <span className="nav-icon nav-icon--premium" aria-hidden="true">
                ★
              </span>
            ) : (
              <img src={link.icon} alt="" className="nav-icon" />
            )}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
