class GetPlaylistsByUserService {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  async execute({ user_id }) {
    const playlists = await this.playlistRepository.getPlaylistsByUserId(
      user_id,
    )

    return playlists
  }
}

module.exports = GetPlaylistsByUserService
