const Joi = require('joi')
const OrdersController = require('../controllers/orders')

exports.register = function (server, options, next) {
  const ordersController = new OrdersController(options.database)
  server.bind(ordersController)

  server.route([{
    method: 'POST',
    path: `/orders`,
    handler: ordersController.create
  }, {
    method: 'GET',
    path: `/orders`,
    handler: ordersController.index
  }, {
    method: 'PUT',
    path: '/orders/{id}/pickup',
    config: {
      handler: ordersController.pickup,
      validate: {
        params: {
          id: Joi.string().regex(/\d{4,}/)
        }
      }
    }
  }])

  next()
}

exports.register.attributes = {
  name: 'routes-orders',
  version: '0.1.0'
}
