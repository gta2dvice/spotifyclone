const { getAllSongs, updateSongLyrics } = require('../models/songModel')

function withMediaBase(req, item) {
  const mediaBase = `${req.protocol}://${req.get('host')}`
  return {
    ...item,
    file_url: item.file_url.startsWith('http') ? item.file_url : `${mediaBase}${item.file_url}`,
    cover_url: item.cover_url.startsWith('http') ? item.cover_url : `${mediaBase}${item.cover_url}`,
  }
}

async function fetchSongs(req, res) {
  try {
    const songs = await getAllSongs()
    res.json(songs.map((song) => withMediaBase(req, song)))
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch songs' })
  }
}

async function saveLyrics(req, res) {
  const { id } = req.params
  const { lyrics } = req.body
  try {
    await updateSongLyrics(id, lyrics)
    res.json({ success: true, message: 'Lyrics updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lyrics' })
  }
}

module.exports = {
  fetchSongs,
  saveLyrics,
}
