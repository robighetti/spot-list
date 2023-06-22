/**
 * Controller controla todo o fluxo de entrada e saida dos dados da aplicação
 */

const usersRepository = require('../../repositories/users.repository')

const CreateUserService = require('../../services/CreateUserService')

module.exports = {
  async createUser(request, response) {
    const { name, email, password } = request.body

    const createUser = new CreateUserService(usersRepository)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    return response.json({ data: user })
  },

  async updateUser(request, response) {
    return response.json({ message: 'User updated' })
  },

  async deleteUser(request, response) {
    return response.json({ message: 'User deleted' })
  },

  async listUser(request, response) {
    return response.json({ message: 'User listed' })
  },

  async updateAvatar(request, response) {
    return response.json({ message: 'Avatar updated' })
  },
}
