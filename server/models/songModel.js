const pool = require('../config/db')

async function getAllSongs() {
  const [rows] = await pool.query(
    'SELECT id, title, artist, file_url, cover_url, duration, lyrics FROM songs ORDER BY id',
  )
  return rows
}

async function updateSongLyrics(id, lyrics) {
  await pool.query('UPDATE songs SET lyrics = ? WHERE id = ?', [lyrics, id])
}

module.exports = {
  getAllSongs,
  updateSongLyrics,
}
