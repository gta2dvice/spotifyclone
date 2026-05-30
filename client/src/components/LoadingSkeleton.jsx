function LoadingSkeleton({ cards = false }) {
  if (cards) {
    return (
      <div className="card-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton skeleton-card" />
        ))}
      </div>
    )
  }

  return (
    <div className="song-list">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="skeleton skeleton-row" />
      ))}
    </div>
  )
}

export default LoadingSkeleton
