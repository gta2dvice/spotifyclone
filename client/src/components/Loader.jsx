import './Loader.css'

const WAVE_BARS = 12

function Loader({ visible, exiting, progress = 0 }) {
  if (!visible && !exiting) {
    return null
  }

  return (
    <div
      className={`loader ${exiting ? 'loader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading your music"
    >
      <div className="loader-vignette" aria-hidden="true" />
      <div className="loader-glow loader-glow--left" aria-hidden="true" />
      <div className="loader-glow loader-glow--right" aria-hidden="true" />

      <div className="loader-stage">
        <div className="loader-plinth">
          <div className="loader-plinth-sheen" aria-hidden="true" />

          {/* Vinyl */}
          <div className="loader-vinyl-wrap">
            <div className="loader-vinyl">
              <div className="loader-grooves" aria-hidden="true" />
              <div className="loader-grooves loader-grooves--fine" aria-hidden="true" />
              <div className="loader-reflection" aria-hidden="true" />
              <div className="loader-label">
                <span className="loader-label-ring" aria-hidden="true" />
                <span className="loader-label-core">
                  <span className="loader-label-dot" />
                </span>
              </div>
            </div>
          </div>

          {/* Tonearm */}
          <div className="loader-tonearm-pivot" aria-hidden="true">
            <div className="loader-tonearm">
              <div className="loader-tonearm-head" />
              <div className="loader-tonearm-tube" />
              <div className="loader-tonearm-base" />
            </div>
          </div>

          {/* Start indicator */}
          <div className="loader-start-ring" aria-hidden="true">
            <span className="loader-start-dot" />
          </div>
        </div>

        {/* Waveform */}
        <div className="loader-waves" aria-hidden="true">
          {Array.from({ length: WAVE_BARS }, (_, i) => (
            <span
              key={i}
              className="loader-wave-bar"
              style={{ '--i': i }}
            />
          ))}
        </div>

        {/* Copy */}
        <p className="loader-text">
          Loading your music
          <span className="loader-dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>

        <div className="loader-progress-wrap">
          <div className="loader-progress-track">
            <div
              className="loader-progress-fill"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <span className="loader-progress-label">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  )
}

export default Loader
