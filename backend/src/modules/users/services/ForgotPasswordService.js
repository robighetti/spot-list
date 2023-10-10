const AppError = require('../../../shared/AppError')

const { generateToken } = require('../../../shared/utils/encrypt')

const {
  forgotPassword,
} = require('../../../shared/providers/MailProvider/templates')

class ForgotPasswordService {
  /**
   * Metodo privado
   * @param {*} usersRepository
   * @param {*} mailProvider
   */
  constructor(usersRepository, mailProvider) {
    this.usersRepository = usersRepository
    this.mailProvider = mailProvider
  }

  async execute({ email }) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User not found')
    }

    const token = await generateToken()

    const link = process.env.PATH_FRONTEND.concat(`/reset-password/${token}`)
    const mail = forgotPassword({ name: user.name, link })

    await this.usersRepository.saveTokenInDb(user.id, token)

    return this.mailProvider.sendMail(email, 'Recuperação de senha', mail)
  }
}

module.exports = ForgotPasswordService
