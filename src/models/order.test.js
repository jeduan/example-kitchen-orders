const Lab = require('lab')
const Joi = require('joi')
const Code = require('code')
const Orders = require('./order')
const Couriers = require('./courier')
const schema = require('../schema/order')
const createDatabase = require('../../database')
const range = require('lodash/range')
const addMinutes = require('date-fns/add_minutes')

const lab = exports.lab = Lab.script()

const {test, experiment, before, beforeEach} = lab
const {expect} = Code

experiment('Models:Order', () => {
  let orders = null
  let db

  before(async () => {
    db = await createDatabase()
    orders = new Orders(db)

    // seed
    const couriers = new Couriers(db)

    for (let i of range(5)) {
      couriers.create({name: `Courier ${i + 1}`})
    }
  })

  beforeEach(async () => {
    return db.run('DELETE FROM orders')
  })

  test('create() with full data creates a valid object', async () => {
    const eta = addMinutes(new Date(), 1)

    const order = await orders.create({
      courierId: 1,
      name: 'Order',
      address: 'Address',
      eta
    })

    Joi.validate(order, schema)

    expect(order.name).to.equal('Order')
    expect(order.address).to.equal('Address')
    expect(order.eta).to.equal(eta)
    expect(order.courier).to.equal('Courier 1')
    expect(order.pickedUp).to.equal(false)
  })

  test('create() empty creates a valid object', async () => {
    const order = await orders.create()
    Joi.validate(order, schema)
  })

  test('all returns a list', async () => {
    for (let i of range(5)) {
      await orders.create({name: `Order ${i + 1}`})
    }
    const all = await orders.all()
    expect(all).to.be.an.array()
    expect(all).to.have.length(5)
    expect(all[0].name).to.equal('Order 1')
    Joi.validate(all, schema)
  })

  test('pickup() sets the value as pickedUp', async () => {
    const before = await orders.create()
    const {id} = before

    await orders.pickup(id)
    const after = await orders.get(id)

    expect(before.pickedUp).to.not.equal(after.pickedUp)
  })
})
