const express = require('express')
const { fetchSongs, saveLyrics } = require('../controllers/songController')

const router = express.Router()

router.get('/songs', fetchSongs)
router.put('/songs/:id/lyrics', saveLyrics)

module.exports = router
