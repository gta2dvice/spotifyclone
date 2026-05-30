const pool = require('../config/db')

async function getAllPlaylists() {
  const [rows] = await pool.query(
    `SELECT p.id, p.name, p.cover_url, COUNT(ps.song_id) AS song_count
     FROM playlists p
     LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
     GROUP BY p.id, p.name, p.cover_url
     ORDER BY p.id`,
  )
  return rows
}

async function getPlaylistById(id) {
  const [playlists] = await pool.query('SELECT id, name, cover_url FROM playlists WHERE id = ?', [id])
  if (!playlists.length) {
    return null
  }

  const [songs] = await pool.query(
    `SELECT s.id, s.title, s.artist, s.file_url, s.cover_url, s.duration
     FROM playlist_songs ps
     JOIN songs s ON ps.song_id = s.id
     WHERE ps.playlist_id = ?
     ORDER BY s.id`,
    [id],
  )

  return { playlist: playlists[0], songs }
}

module.exports = {
  getAllPlaylists,
  getPlaylistById,
}
