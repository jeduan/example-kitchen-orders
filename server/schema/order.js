const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.string().regex(/^\d{4,}$/).required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  courier: Joi.string().required(),
  eta: Joi.date().min('now').required(),
  pickedUp: false
})

module.exports = schema
