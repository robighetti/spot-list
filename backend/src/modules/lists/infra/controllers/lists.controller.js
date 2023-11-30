const SpotifyProvider = require('../../../../shared/providers/SpotifyProvider')

const GetTracksService = require('../../../lists/services/GetTracksService')
const GetAlbumTracksService = require('../../services/GetAlbumTracksService')
const CreatePlaylistService = require('../../services/CreatePlaylistService')
const UpdatePlaylistService = require('../../services/UpdatePlaylistService')
const DeletePlaylistService = require('../../services/DeletePlaylistService')
const GetPlaylistsByUserService = require('../../services/GetPlaylistsByUserService')
const GetPlaylistByUserService = require('../../services/GetPlaylistByUserService')

const playlistRepository = require('../../repositories/playlist.repository')

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

  async getPlaylistsByUser(request, response) {
    const { id } = request.user

    const getPlaylistsByUserService = new GetPlaylistsByUserService(
      playlistRepository,
    )

    const playlists = await getPlaylistsByUserService.execute({ user_id: id })

    return response.json({ data: playlists })
  },

  async getPlaylistByUser(request, response) {
    const { playlistId } = request.params
    const { id } = request.user

    const getPlaylistByUserService = new GetPlaylistByUserService(
      playlistRepository,
    )

    const playlist = await getPlaylistByUserService.execute({
      id: playlistId,
      user_id: id,
    })
    return response.json({ data: playlist })
  },

  async createPlaylist(request, response) {
    const { title, description, tracks = null } = request.body
    const { id } = request.user

    const createPlaylistService = new CreatePlaylistService(playlistRepository)

    const playlistCreated = await createPlaylistService.execute({
      title,
      description,
      tracks: tracks ? JSON.stringify(tracks) : null,
      user_id: id,
    })

    return response.json({ data: playlistCreated })
  },

  async updatePlaylist(request, response) {
    const { title, description, tracks } = request.body
    const { playlistId } = request.params
    const { id } = request.user

    const updatePlaylistService = new UpdatePlaylistService(playlistRepository)

    const playlistUpdated = await updatePlaylistService.execute({
      id: playlistId,
      title,
      description,
      tracks,
      user_id: id,
    })
    return response.json({ data: playlistUpdated })
  },

  async deletePlaylist(request, response) {
    const { playlistId } = request.params
    const { id } = request.user

    const deletePlaylistService = new DeletePlaylistService(playlistRepository)

    await deletePlaylistService.execute({ id: playlistId, user_id: id })

    return response.json({ message: 'Playlist deleted' })
  },
}
