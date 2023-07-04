const { Router } = require('express')

const { userLogin } = require('../controllers/login.controller')
const { verifyPayloadForLogin } = require('../../middlewares/users.middleware')

const loginRouter = Router()

loginRouter.post('/', verifyPayloadForLogin(), userLogin)

module.exports = loginRouter
