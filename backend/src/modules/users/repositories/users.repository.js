/**
 * Responsabilidade da repository é acessar o nosso banco de dados
 */
const AppError = require('../../../shared/AppError')

const connection = require('../../../shared/database/connection')

module.exports = {
  async findByEmail(email) {
    try {
      return connection('users').where('email', email).first()
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async create(payload) {
    try {
      const user = await connection('users').insert(payload).returning('*')

      return user[0]
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async listAll() {
    try {
      return connection('users')
        .select('id', 'name', 'email', 'created_at')
        .orderBy('created_at', 'desc')
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async saveTokenInDb(userId, token) {
    try {
      return connection('user_tokens').insert({ user_id: userId, token })
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async findByToken(token) {
    try {
      return connection('user_tokens').where('token', token).first()
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  /**
   *
   * password - com o hash
   * id - do usuario
   */
  async updateUserPassword(payload) {
    try {
      return connection.transaction(async (trx) => {
        await trx('users')
          .update({ password: payload.password })
          .where('id', payload.id)

        await trx('user_tokens').where('user_id', payload.id).del()
      })
    } catch (err) {
      throw new AppError(err.message)
    }
  },
}
