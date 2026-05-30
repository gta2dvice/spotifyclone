const pool = require('../config/db')

async function addLike(songId) {
  await pool.query('INSERT IGNORE INTO liked_songs (song_id) VALUES (?)', [songId])
}

async function removeLike(songId) {
  await pool.query('DELETE FROM liked_songs WHERE song_id = ?', [songId])
}

async function isLiked(songId) {
  const [rows] = await pool.query(
    'SELECT 1 FROM liked_songs WHERE song_id = ? LIMIT 1',
    [songId],
  )
  return rows.length > 0
}

async function getLikedSongIds() {
  const [rows] = await pool.query(
    'SELECT song_id FROM liked_songs ORDER BY created_at DESC',
  )
  return rows.map((row) => row.song_id)
}

async function getLikedSongs() {
  const [rows] = await pool.query(
    `SELECT s.id, s.title, s.artist, s.file_url, s.cover_url, s.duration, s.lyrics
     FROM liked_songs ls
     INNER JOIN songs s ON s.id = ls.song_id
     ORDER BY ls.created_at DESC`,
  )
  return rows
}

module.exports = {
  addLike,
  removeLike,
  isLiked,
  getLikedSongIds,
  getLikedSongs,
}
