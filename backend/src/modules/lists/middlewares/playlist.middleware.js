const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
  verifyPayloadForCreation() {
    return celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
        description: Joi.string().allow(null, ''),
        tracks: Joi.array().required(),
      },
    })
  },
  verifyPlaylistIdInParams() {
    return celebrate({
      [Segments.PARAMS]: {
        playlistId: Joi.string().required(),
      },
    })
  },
}
