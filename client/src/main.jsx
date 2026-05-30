import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'
import { LikedProvider } from './context/LikedContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <LikedProvider>
          <App />
        </LikedProvider>
      </PlayerProvider>
    </BrowserRouter>
  </StrictMode>,
)
