const { Router } = require('express')

const userRouters = require('../../../modules/users/infra/routes/user.routes')

const routes = Router()

routes.use('/users', userRouters)

module.exports = routes
