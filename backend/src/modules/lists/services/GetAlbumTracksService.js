/* eslint-disable camelcase */
class GetAlbumTracksService {
  constructor(spotifyProvider) {
    this.spotifyProvider = spotifyProvider
  }

  async execute(albumId) {
    const result = await this.spotifyProvider.getAlbum(albumId)

    const { album_type, artists, images, name, popularity, tracks } = result

    const artistFiltered = artists.map((artist) => {
      const { id, name } = artist

      return { id, name }
    })

    const imagesFiltered = images.map((image) => {
      const { url } = image

      return { url }
    })

    const itemsFiltered = tracks.items.map((item) => {
      const { id, name, track_number, external_urls } = item

      return {
        id,
        name,
        track_number,
        url: external_urls.spotify,
      }
    })

    return {
      album_type,
      name,
      popularity,
      artistFiltered,
      imagesFiltered,
      itemsFiltered,
    }
  }
}

module.exports = GetAlbumTracksService
