const { Router } = require('express')

const {
  getTracks,
  getAlbum,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistsByUser,
  getPlaylistByUser,
} = require('../controllers/lists.controller')

const {
  verifyPayloadForCreation,
  verifyPlaylistIdInParams,
} = require('../../middlewares/playlist.middleware')

const listRouters = Router()

listRouters.get('/tracks', getTracks)

listRouters.get('/album/:albumId', getAlbum)

listRouters.get('/', getPlaylistsByUser)

listRouters.get('/:playlistId', getPlaylistByUser)

listRouters.post('/', verifyPayloadForCreation(), createPlaylist)

listRouters.put('/:playlistId', verifyPlaylistIdInParams(), updatePlaylist)

listRouters.delete('/:playlistId', verifyPlaylistIdInParams(), deletePlaylist)

module.exports = listRouters
