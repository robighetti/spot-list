const bcrypt = require('bcrypt')
const crypto = require('crypto')

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
}
