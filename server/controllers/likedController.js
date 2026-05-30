const likedModel = require('../models/likedModel')
const pool = require('../config/db')

function withMediaBase(req, item) {
  const mediaBase = `${req.protocol}://${req.get('host')}`
  return {
    ...item,
    file_url: item.file_url.startsWith('http')
      ? item.file_url
      : `${mediaBase}${item.file_url}`,
    cover_url: item.cover_url.startsWith('http')
      ? item.cover_url
      : `${mediaBase}${item.cover_url}`,
  }
}

async function songExists(songId) {
  const [rows] = await pool.query('SELECT id FROM songs WHERE id = ?', [songId])
  return rows.length > 0
}

async function likeSong(req, res) {
  const songId = Number(req.params.songId)
  if (!songId) {
    return res.status(400).json({ message: 'Invalid song id' })
  }
  try {
    if (!(await songExists(songId))) {
      return res.status(404).json({ message: 'Song not found' })
    }
    await likedModel.addLike(songId)
    res.status(201).json({ liked: true, songId })
  } catch (error) {
    res.status(500).json({ message: 'Failed to like song' })
  }
}

async function unlikeSong(req, res) {
  const songId = Number(req.params.songId)
  if (!songId) {
    return res.status(400).json({ message: 'Invalid song id' })
  }
  try {
    await likedModel.removeLike(songId)
    res.json({ liked: false, songId })
  } catch (error) {
    res.status(500).json({ message: 'Failed to unlike song' })
  }
}

async function fetchLikedSongs(req, res) {
  try {
    const songs = await likedModel.getLikedSongs()
    res.json(songs.map((song) => withMediaBase(req, song)))
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch liked songs' })
  }
}

async function checkLiked(req, res) {
  const songId = Number(req.params.songId)
  if (!songId) {
    return res.status(400).json({ message: 'Invalid song id' })
  }
  try {
    const liked = await likedModel.isLiked(songId)
    res.json({ liked, songId })
  } catch (error) {
    res.status(500).json({ message: 'Failed to check liked status' })
  }
}

module.exports = {
  likeSong,
  unlikeSong,
  fetchLikedSongs,
  checkLiked,
}
