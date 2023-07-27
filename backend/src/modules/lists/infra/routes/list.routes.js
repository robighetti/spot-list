const { Router } = require('express')

const {
  getTracks,
  getAlbum,
  createPlaylist,
  updatePlaylist,
} = require('../controllers/lists.controller')

const listRouters = Router()

listRouters.get('/tracks', getTracks)

listRouters.get('/album/:albumId', getAlbum)

listRouters.post('/', createPlaylist)

listRouters.put('/:playlistId', updatePlaylist)

module.exports = listRouters
