const { Router } = require('express')

const {
  createUser,
  updateUser,
  deleteUser,
  listUser,
  updateAvatar,
  listAllUsers,
  forgotPassword,
} = require('../controllers/users.controller')

const {
  verifyPayloadForCreation,
  verifyEmailToForgotPassword,
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

/**
 * Não implementado
 */
userRouters.put('/:id', updateUser)

userRouters.delete('/:id', deleteUser)

userRouters.get('/:id', listUser)

userRouters.patch('/:id', updateAvatar)

module.exports = userRouters
