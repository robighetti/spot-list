const SpotifyWebApi = require('spotify-web-api-node')

class SpotifyProvider {
  constructor() {
    this.spotify = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT,
    })
  }

  async connectToSpotify() {
    const { body } = await this.spotify.clientCredentialsGrant()

    this.spotify.setAccessToken(body.access_token)
  }

  async getAlbuns() {
    await this.connectToSpotify()

    const results = await this.spotify.searchTracks('artist:O Rappa')

    const albumsFiltered = results.body.tracks.items.map((album) => {
      return {
        albumId: album.id,
        albumName: album.name,
        albumArtist: album.artists.map((artist) => {
          return {
            id: artist.id,
            name: artist.name,
          }
        }),
        totalOfMusics: album.total_tracks,
      }
    })

    return albumsFiltered
  }

  async getAlbunsByArtist() {}
}

module.exports = SpotifyProvider
