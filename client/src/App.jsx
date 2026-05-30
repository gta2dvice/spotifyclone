import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import Player from './components/Player.jsx'
import Loader from './components/Loader.jsx'
import FullScreenPlayer from './components/player/FullScreenPlayer.jsx'
import HomePage from './pages/HomePage.jsx'
import PlaylistPage from './pages/PlaylistPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import PremiumPage from './pages/PremiumPage.jsx'
import LikedSongsPage from './pages/LikedSongsPage.jsx'
import Toast from './components/Toast.jsx'
import { useAppLoader } from './hooks/useAppLoader.js'

function App() {
  const { visible, exiting, progress } = useAppLoader()

  return (
    <>
      <Loader visible={visible} exiting={exiting} progress={progress} />
      <div className={`app-root ${!visible ? 'app-root--ready' : ''}`}>
        <div className="app-shell">
          <Sidebar />
          <div className="content-shell">
            <Navbar />
            <main className="page-shell">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/liked" element={<LikedSongsPage />} />
                <Route path="/premium" element={<PremiumPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <Player />
          <FullScreenPlayer />
        </div>
      </div>
      <Toast />
    </>
  )
}

export default App
