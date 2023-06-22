const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
  verifyPayloadForCreation() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
      },
    })
  },
}
