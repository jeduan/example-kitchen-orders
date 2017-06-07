const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.string().regex(/^\d{4,}$/).required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  courier: Joi.object().keys({
    id: Joi.number().min(0).required(),
    name: Joi.string().required()
  }).required(),
  eta: Joi.date().min('now').required()
})

module.exports = schema
