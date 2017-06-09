const Orders = require('../models/order')

class OrdersController {
  constructor (db) {
    this.model = new Orders(db)
  }

  create (request, reply) {
    return this.model.create(request.payload)
      .then(reply)
  }

  index (request, reply) {
    return this.model.all()
      .then(reply)
  }

  pickup (request, reply) {
    const id = Number(request.params.id)
    return this.model.pickup(id)
      .then(reply)
  }
}

module.exports = OrdersController
