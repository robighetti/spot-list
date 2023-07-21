class GetAlbumTracksService {
  constructor(spotifyProvider) {
    this.spotifyProvider = spotifyProvider
  }

  async execute(albumId) {
    const result = await this.spotifyProvider.getAlbum(albumId)

    return result
  }
}

module.exports = GetAlbumTracksService
