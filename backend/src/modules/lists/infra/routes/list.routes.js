const { Router } = require('express')

const { createList } = require('../controllers/lists.controller')

const listRouters = Router()

listRouters.post('/', createList)

module.exports = listRouters
