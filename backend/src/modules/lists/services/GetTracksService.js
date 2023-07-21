class GetTracksService {
  constructor(spotifyProvider) {
    this.spotifyProvider = spotifyProvider
  }

  async execute(filter) {
    let convertedFilter = ''

    if (filter.name) {
      convertedFilter += `name:${filter.name} `
    }

    if (filter.album) {
      convertedFilter += `album:${filter.album} `
    }

    if (filter.artist) {
      convertedFilter += `artist:${filter.artist} `
    }

    const result = await this.spotifyProvider.getTracks(convertedFilter)

    const albumsFiltered = result.tracks.items.map((item) => {
      return {
        albumId: item.album.id,
        albumName: item.album.name,
        albumArtist: item.artists.map((artist) => {
          return {
            id: artist.id,
            name: artist.name,
          }
        }),
        totalOfMusics: item.album.total_tracks,
      }
    })

    return albumsFiltered
  }
}

module.exports = GetTracksService
