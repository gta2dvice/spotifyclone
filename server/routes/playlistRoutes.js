const express = require('express')
const { fetchPlaylists, fetchPlaylistById } = require('../controllers/playlistController')

const router = express.Router()

router.get('/playlists', fetchPlaylists)
router.get('/playlist/:id', fetchPlaylistById)

module.exports = router
