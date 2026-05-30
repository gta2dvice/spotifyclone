const { getAllPlaylists, getPlaylistById } = require('../models/playlistModel')

function withMediaBase(req, item) {
  const mediaBase = `${req.protocol}://${req.get('host')}`
  return {
    ...item,
    cover_url: item.cover_url.startsWith('http') ? item.cover_url : `${mediaBase}${item.cover_url}`,
    file_url:
      item.file_url && !item.file_url.startsWith('http') ? `${mediaBase}${item.file_url}` : item.file_url,
  }
}

async function fetchPlaylists(req, res) {
  try {
    const playlists = await getAllPlaylists()
    res.json(playlists.map((playlist) => withMediaBase(req, playlist)))
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch playlists' })
  }
}

async function fetchPlaylistById(req, res) {
  try {
    const data = await getPlaylistById(req.params.id)
    if (!data) {
      return res.status(404).json({ message: 'Playlist not found' })
    }

    return res.json({
      playlist: withMediaBase(req, data.playlist),
      songs: data.songs.map((song) => withMediaBase(req, song)),
    })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch playlist' })
  }
}

module.exports = {
  fetchPlaylists,
  fetchPlaylistById,
}
