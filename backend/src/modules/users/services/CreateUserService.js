/**
 * A classe tem a responsabilidade de executar uma ação e usar o banco de dados
 * se necessario para isso
 *
 * A instancia da classe nada mais é do que a inicialização da classe
 */

class CreateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  /**
   *
   * Metodo de criação de usuário
   */
  async execute(payload) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      payload.email,
    )
    if (userAlreadyExists) {
      return {
        error: 'User already exists',
        msg: 'Email already exists',
      }
      // throw new Error('User already exists')
    }

    const user = await this.usersRepository.create(payload)

    return user
  }
}

module.exports = CreateUserService
