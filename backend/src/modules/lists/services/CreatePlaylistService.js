/* eslint-disable camelcase */
class CreatePlaylistService {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  async execute({ title, description, tracks, user_id }) {
    const playlist = await this.playlistRepository.createPlaylist({
      title,
      description,
      tracks,
      user_id,
    })

    return playlist
  }
}

module.exports = CreatePlaylistService
