const { Router } = require('express')

const { getTracks, getAlbum } = require('../controllers/lists.controller')

const listRouters = Router()

listRouters.get('/tracks', getTracks)

listRouters.get('/album/:albumId', getAlbum)

module.exports = listRouters
