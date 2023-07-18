const SpotifyProvider = require('../../../../shared/providers/SpotifyProvider')

const CreateMusicListService = require('../../services/CreateMusicListService')

module.exports = {
  async createList(request, response) {
    const spotifyProvider = new SpotifyProvider()

    const album = await spotifyProvider.getAlbuns()

    /*  const createMusicListService = new CreateMusicListService(spotifyProvider)

    const data = await createMusicListService.execute({ msg: true }) */

    return response.json({ data: album })
  },
}
