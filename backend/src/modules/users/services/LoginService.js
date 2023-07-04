const AppError = require('../../../shared/AppError')

const { comparePassword } = require('../../../shared/utils/encrypt')

class LoginService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User not found')
    }

    await comparePassword(password, user.password)

    return user
  }
}

module.exports = LoginService
