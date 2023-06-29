/**
 * Responsabilidade da repository é acessar o nosso banco de dados
 */

const connection = require('../../../shared/database/connection')

module.exports = {
  async findByEmail(email) {
    return connection('users').where('email', email).first()
  },

  async create(payload) {
    const user = await connection('users').insert(payload).returning('*')

    return user[0]
  },

  async listAll() {
    return connection('users')
      .select('id', 'name', 'email', 'created_at')
      .orderBy('created_at', 'desc')
  },

  async saveTokenInDb(userId, token) {
    return connection('user_tokens').insert({ user_id: userId, token })
  },
}
