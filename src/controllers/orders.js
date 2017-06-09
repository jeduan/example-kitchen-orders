const Orders = require('../models/order')

class OrdersController {
  constructor (db) {
    this.model = new Orders(db)
  }

  create (request, reply) {
    const value = request.payload.order
    return this.model.add(value)
      .then(reply)
  }

  index (request, reply) {
    return this.model.getAll()
      .then(reply)
  }

  pickup (request, reply) {
    return this.model.pickup(request.params.id)
      .then(reply)
  }
}

module.exports = OrdersController
