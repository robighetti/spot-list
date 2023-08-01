const AppError = require('../../../shared/AppError')
const connection = require('../../../shared/database/connection')

module.exports = {
  async getPlaylistById(id, user_id) {
    try {
      return connection('playlists').where({ id }).andWhere({ user_id }).first()
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async getPlaylistsByUserId(user_id) {
    try {
      return connection('playlists').where({ user_id })
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async createPlaylist(payload) {
    try {
      const playlist = await connection('playlists')
        .insert(payload)
        .returning('*')

      return playlist[0]
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async updatePlaylist(payload) {
    try {
      const playlist = await connection('playlists')
        .update(payload)
        .where({ id: payload.id })
        .returning('*')

      return playlist[0]
    } catch (err) {
      throw new AppError(err.message)
    }
  },

  async deletePlaylist(id) {
    try {
      return connection('playlists').where({ id }).del()
    } catch (err) {
      throw new AppError(err.message)
    }
  },
}
