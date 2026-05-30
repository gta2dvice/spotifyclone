import { Link, useLocation } from 'react-router-dom'
import { getGreeting } from '../utils/getGreeting.js'

const titles = {
  '/search': 'Search',
  '/liked': 'Liked Songs',
  '/premium': 'Premium',
}

function Navbar() {
  const location = useLocation()
  const isPremium = location.pathname === '/premium'
  const title = titles[location.pathname] || getGreeting()

  return (
    <header className="navbar">
      <div className="navbar-title-wrap">
        <h1>{title}</h1>
        {location.pathname === '/' && (
          <p className="navbar-subtitle">Pick a playlist and press play</p>
        )}
        {isPremium && (
          <p className="navbar-subtitle">Upgrade your listening experience</p>
        )}
      </div>
      {isPremium ? (
        <Link to="/" className="upgrade-btn upgrade-btn--outline">
          Back to Home
        </Link>
      ) : (
        <Link to="/premium" className="upgrade-btn">
          Explore Premium
        </Link>
      )}
    </header>
  )
}

export default Navbar
