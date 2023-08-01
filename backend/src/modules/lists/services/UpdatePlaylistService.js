const AppError = require('../../../shared/AppError')

class UpdatePlaylistService {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  async execute({ id, title, description, tracks, user_id }) {
    const playlist = await this.playlistRepository.getPlaylistById(id, user_id)
    if (!playlist) {
      throw new AppError('Playlist not found')
    }

    const playlistUpdated = await this.playlistRepository.updatePlaylist({
      id,
      title,
      description,
      tracks: JSON.stringify(tracks),
      user_id,
    })

    return playlistUpdated
  }
}

module.exports = UpdatePlaylistService
