const db = require('../config/db')

async function seedIfEmpty() {
  const [songsCountRows] = await db.query('SELECT COUNT(*) AS count FROM songs')
  if (songsCountRows[0].count > 0) {
    return { seeded: false }
  }

  await db.query(
    `INSERT INTO songs (id, title, artist, file_url, cover_url, duration) VALUES
    (1, 'Night Waves', 'Nova Bloom', '/media/audio/night-waves.mp3', '/media/images/night-waves.svg', '3:11'),
    (2, 'Echo Heart', 'Zayn River', '/media/audio/echo-heart.mp3', '/media/images/echo-heart.svg', '2:56'),
    (3, 'Sapphire Sky', 'Ari Cole', '/media/audio/sapphire-sky.mp3', '/media/images/sapphire-sky.svg', '3:42'),
    (4, 'Afterglow Run', 'Luna Drift', '/media/audio/afterglow-run.mp3', '/media/images/afterglow-run.svg', '3:19'),
    (5, 'City Pulse', 'Metroline', '/media/audio/city-pulse.mp3', '/media/images/city-pulse.svg', '3:06'),
    (6, 'Velvet Drift', 'Milo Grey', '/media/audio/velvet-drift.mp3', '/media/images/velvet-drift.svg', '4:01')`,
  )

  await db.query(
    `INSERT INTO playlists (id, name, cover_url) VALUES
    (1, 'Daily Mix 1', '/media/images/daily-mix-1.svg'),
    (2, 'Chill Nights', '/media/images/chill-nights.svg'),
    (3, 'Focus Flow', '/media/images/focus-flow.svg')`,
  )

  await db.query(
    `INSERT INTO playlist_songs (playlist_id, song_id) VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 2), (2, 4), (2, 6),
    (3, 1), (3, 5), (3, 6)`,
  )

  return { seeded: true }
}

module.exports = { seedIfEmpty }
