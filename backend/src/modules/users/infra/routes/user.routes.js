const { Router } = require('express')
const multer = require('multer')

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

const ensureAuthenticated = require('../../../../shared/middlewares/ensure-autenticated')
const uploadConfig = require('../../../../config/upload')

const userRouters = Router()

const upload = multer(uploadConfig)

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

userRouters.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatar,
)

/**
 * Não implementado
 */
userRouters.put('/:id', ensureAuthenticated, updateUser)

userRouters.delete('/:id', ensureAuthenticated, deleteUser)

userRouters.get('/:id', ensureAuthenticated, listUser)

module.exports = userRouters
