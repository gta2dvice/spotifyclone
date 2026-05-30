import { usePlayer } from '../context/PlayerContext.jsx'
import { formatTime } from '../utils/formatTime.js'
import VolumeIcon from '../assets/icons/volume.svg'
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from './icons/PlayerIcons.jsx'
import HeartButton from './HeartButton.jsx'

function Player() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    openFullscreen,
    isFullscreenOpen,
  } = usePlayer()

  if (isFullscreenOpen) {
    return null
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <footer className={`player ${isPlaying ? 'player--playing' : ''}`}>
      <div className="player-song">
        {currentSong ? (
          <>
            <button
              type="button"
              className="player-art-btn"
              onClick={openFullscreen}
              aria-label="Open fullscreen player"
            >
              <img src={currentSong.cover_url} alt={currentSong.title} />
            </button>
            <div className="player-track-meta">
              <strong>{currentSong.title}</strong>
              <small>{currentSong.artist}</small>
            </div>
            <HeartButton song={currentSong} size="lg" />
          </>
        ) : (
          <p className="player-empty">Select a song to start listening</p>
        )}
      </div>

      <div className="player-controls">
        <div className="controls-row">
          <button
            type="button"
            className="control-btn"
            onClick={previousSong}
            aria-label="Previous song"
          >
            <SkipBackIcon />
          </button>
          <button
            type="button"
            className="control-btn play-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            disabled={!currentSong}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className="control-btn"
            onClick={nextSong}
            aria-label="Next song"
          >
            <SkipForwardIcon />
          </button>
        </div>
        <div className="seek-row">
          <small>{formatTime(currentTime)}</small>
          <div className="range-wrap">
            <div className="range-fill" style={{ width: `${progress}%` }} />
            <input
              type="range"
              className="range-input"
              min="0"
              max={duration || 0}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => seekTo(Number(event.target.value))}
              disabled={!currentSong}
              aria-label="Seek"
            />
          </div>
          <small>{formatTime(duration)}</small>
        </div>
      </div>

      <div className="volume">
        <img src={VolumeIcon} alt="" className="volume-icon" aria-hidden="true" />
        <div className="range-wrap range-wrap--volume">
          <div className="range-fill" style={{ width: `${volume * 100}%` }} />
          <input
            type="range"
            className="range-input"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>
    </footer>
  )
}

export default Player
