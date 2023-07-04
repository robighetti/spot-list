const bcrypt = require('bcrypt')
const crypto = require('crypto')

const AppError = require('../AppError')

module.exports = {
  async generateHash(password) {
    const hash = await bcrypt.hash(password, Number(process.env.ENCRYPT_BITS))

    return hash
  },

  async generateToken() {
    return parseInt(crypto.randomBytes(3).toString('hex'), 16)
      .toString()
      .substring(0, 6)
  },

  async comparePassword(password, hash) {
    const compare = await bcrypt.compare(password, hash)

    if (!compare) {
      throw new AppError('Incorrect email/password combination', 401)
    }
  },
}
