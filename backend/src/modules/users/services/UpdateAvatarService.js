const AppError = require('../../../shared/AppError')

const fs = require('fs')
const path = require('path')
const { directory } = require('../../../config/upload')

class UpdateAvatarService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(payload) {
    const { file, user } = payload

    const existsUser = await this.usersRepository.findById(user.id)
    if (!existsUser) {
      throw new AppError('User not found', 404)
    }

    // Verifica se o campo avatar está preenchido
    if (existsUser.avatar) {
      const fileCompletePath = path.join(directory, existsUser.avatar)

      // verifica se o arquivo existe
      const fileExists = fs.existsSync(fileCompletePath)
      if (fileExists) {
        // exclui o arquivo
        fs.unlinkSync(fileCompletePath)
      }
    }

    const updatedUser = await this.usersRepository.update({
      id: user.id,
      avatar: file.filename,
    })

    delete updatedUser[0].password

    return updatedUser[0]
  }
}

module.exports = UpdateAvatarService
