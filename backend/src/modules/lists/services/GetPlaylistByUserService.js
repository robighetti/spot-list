class GetPlaylistByUserService {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  async execute({ id, user_id }) {
    const playlist = await this.playlistRepository.getPlaylistById(id, user_id)

    return playlist
  }
}

module.exports = GetPlaylistByUserService
