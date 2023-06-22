/**
 * Responsabilidade da repository é acessar o nosso banco de dados
 */

const connection = require('../../../shared/database/connection')

module.exports = {
  async findByEmail(email) {
    return connection('users').where('email', email).first()
  },

  async create(payload) {
    return connection('users').insert(payload).returning('*')
  },
}
