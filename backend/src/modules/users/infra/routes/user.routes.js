const { Router } = require('express')

const {
  createUser,
  updateUser,
  deleteUser,
  listUser,
  updateAvatar,
  listAllUsers,
  forgotPassword,
  resetPassword,
} = require('../controllers/users.controller')

const {
  verifyPayloadForCreation,
  verifyEmailToForgotPassword,
  verifyPayloadForResetPassword,
} = require('../../middlewares/users.middleware')

const userRouters = Router()

/**
 * POST - criação
 * PUT - alteração ou atualização (Varios dados de um registro)
 * PATCH - alteração ou atualização (Um dado de um registro)
 * GET - listagem
 * DELETE - remoção
 *
 * CRUD - Create, Read, Update, Delete
 *
 * As rotas tem a responsabilidade de roteamento das requisições (Entrada e Saida)
 */

userRouters.post('/', verifyPayloadForCreation(), createUser)

userRouters.get('/', listAllUsers)

userRouters.post('/forgot', verifyEmailToForgotPassword(), forgotPassword)

userRouters.patch(
  '/reset-password/:token',
  verifyPayloadForResetPassword(),
  resetPassword,
)

/**
 * Não implementado
 */
userRouters.put('/:id', updateUser)

userRouters.delete('/:id', deleteUser)

userRouters.get('/:id', listUser)

userRouters.patch('/avatar/:id', updateAvatar)

module.exports = userRouters
