const BaseModel = require('./base')
const Courier = require('./courier')

const faker = require('faker')
const {estimatedArrival, formatOrderId} = require('./util')

const defaults = {
  name: faker.name.findName,
  address: faker.address.streetAddress,
  eta: estimatedArrival
}

class Order extends BaseModel {
  async all () {
    const query = `SELECT o.id, o.name, o.address, o.eta, (1 - o.active) AS pickedUp, c.name AS courier
    FROM orders o
      LEFT JOIN couriers c ON o.courierId = c.id
    WHERE active = 1
    SORT BY o.eta ASC`
    const values = await this.db.all(query)
    return values.map(processRecord)
  }

  async create (data) {
    data = data || {}
    const values = {
      $name: data.name || defaults.name(),
      $address: data.address || defaults.address(),
      $eta: data.eta || defaults.eta(),
      $courierId: data.courierId
    }
    if (!values.$courierId) {
      const couriers = new Courier(this.db)
      values.$courierId = await couriers.getRandomId()
    }
    const query = `INSERT INTO orders(name, address, eta, courierId) VALUES($name, $address, $eta, $courierId)`
    const run = await this.db.run(query, values)
    const id = run.stmt.lastID
    return this.get(id)
  }

  async get ($id) {
    const query = `
    SELECT o.id, o.name, o.address, o.eta, (1 - o.active) AS pickedUp, c.name AS courier
    FROM orders o
      LEFT JOIN couriers c ON o.courierId = c.id
    WHERE o.id = $id`
    const raw = await this.db.get(query, {$id})
    return processRecord(raw)
  }

  async pickup ($id) {
    const query = `UPDATE orders SET active = 0 WHERE id=$id`
    const run = await this.db.run(query, {$id})
    return run.stmt.changes
  }
}

module.exports = Order

function processRecord (record) {
  return Object.assign(record, {
    id: formatOrderId(record.id),
    eta: new Date(record.eta),
    pickedUp: Boolean(record.pickedUp)
  })
}
