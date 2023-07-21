const SpotifyProvider = require('../../../../shared/providers/SpotifyProvider')

const GetTracksService = require('../../../lists/services/GetTracksService')
const GetAlbumTracksService = require('../../../lists/services/GetAlbumTracksService')

const spotifyProvider = new SpotifyProvider()

module.exports = {
  async getTracks(request, response) {
    const { name, album, artist } = request.query

    const getTracksService = new GetTracksService(spotifyProvider)

    const tracks = await getTracksService.execute({ name, album, artist })

    return response.json({ data: tracks })
  },

  async getAlbum(request, response) {
    const getAlbum = new GetAlbumTracksService(spotifyProvider)

    const { albumId } = request.params

    const albumTracks = await getAlbum.execute(albumId)

    return response.json({ albumTracks })
  },
}
