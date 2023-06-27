const bcrypt = require('bcrypt')
// const crypto = require('crypto')

module.exports = {
  async generateHash(password) {
    const hash = await bcrypt.hash(password, Number(process.env.ENCRYPT_BITS))

    return hash
  },
}
