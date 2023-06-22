const { Router } = require('express')

const userRouters = Router()

/**
 * POST - criação
 * PUT - alteração ou atualização (Varios dados de um registro)
 * PATCH - alteração ou atualização (Um dado de um registro)
 * GET - listagem
 * DELETE - remoção
 *
 * CRUD - Create, Read, Update, Delete
 */

userRouters.post('/', (request, response) => {
  return response.json({ message: 'User created' })
})

userRouters.put('/:id', (request, response) => {
  return response.json({ message: 'User updated' })
})

userRouters.patch('/:id', (request, response) => {
  return response.json({ message: 'User updated' })
})

userRouters.get('/:id', (request, response) => {
  return response.json({ message: 'User listed' })
})

userRouters.delete('/:id', (request, response) => {
  return response.json({ message: 'User deleted' })
})

module.exports = userRouters
