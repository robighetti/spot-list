const { generateHash } = require('../../../shared/utils/encrypt')
const AppError = require('../../../shared/AppError')
const MailProvider = require('../../../shared/providers/MailProvider')
const { welcome } = require('../../../shared/providers/MailProvider/templates')
const { v4: uuid } = require('uuid')

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
      throw new AppError('User already exists')
    }

    const { password } = payload

    const hashedPassword = await generateHash(password)

    /**
     * É uma forma de appendar valores em uma variavel, ou seja, adicionar ou
     * alterar algum valor
     */
    Object.assign(payload, { password: hashedPassword })

    const user = await this.usersRepository.create(payload)

    delete user.password

    const mailProvider = new MailProvider()

    await mailProvider.sendMail(
      user.email,
      'Bem vindo ao SpotList',
      welcome({ name: user.name, token: uuid() }),
    )

    return { user }
  }
}

module.exports = CreateUserService
