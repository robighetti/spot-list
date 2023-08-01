const AppError = require('../../../shared/AppError')

class DeletePlaylistService {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  async execute({ id, user_id }) {
    const playlist = await this.playlistRepository.getPlaylistById(id, user_id)
    if (!playlist) {
      throw new AppError('Playlist not found')
    }

    const playlistDeleted = await this.playlistRepository.deletePlaylist(id)

    return playlistDeleted
  }
}

module.exports = DeletePlaylistService
