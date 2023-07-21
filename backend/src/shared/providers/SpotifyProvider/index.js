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

  async getTracks(filter) {
    await this.connectToSpotify()

    const results = await this.spotify.searchTracks(filter)

    return results.body
  }

  async getAlbum(albumId) {
    await this.connectToSpotify()

    const results = await this.spotify.getAlbum(albumId)

    return results.body
  }

  async getAlbunsByArtist() {}
}

module.exports = SpotifyProvider
