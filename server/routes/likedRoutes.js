const express = require('express')
const {
  likeSong,
  unlikeSong,
  fetchLikedSongs,
  checkLiked,
} = require('../controllers/likedController')

const router = express.Router()

router.get('/liked', fetchLikedSongs)
router.get('/liked/check/:songId', checkLiked)
router.post('/liked/:songId', likeSong)
router.delete('/liked/:songId', unlikeSong)

module.exports = router
