const Lab = require('lab')
const Code = require('code')

const lab = exports.lab = Lab.script()

const {experiment, test, before, beforeEach} = lab
const {expect} = Code

const createDb = require('../database')
const Couriers = require('./courier')
const range = require('lodash/range')
const map = require('lodash/map')

experiment('Couriers', () => {
  let db
  let couriers

  before(async () => {
    db = await createDb()
    couriers = new Couriers(db)
    return Promise.resolve()
  })

  beforeEach(async () => {
    db.run('DELETE FROM couriers')
  })

  test('create works with names', async () => {
    const id = await couriers.create({name: 'foo'})
    expect(id).to.be.a.number()

    const inserted = await couriers.get(id)
    expect(inserted.name).to.equal('foo')
  })

  test('getAll lists couriers', async () => {
    for (let i of range(5)) {
      await couriers.create({name: `Foo ${i + 1}`})
    }

    const all = await couriers.getAll()
    expect(all).to.be.an.array()
    expect(all).to.have.length(5)
    expect(all[0].name).to.equals('Foo 1')
  })

  test('getRandom gets a random number', async () => {
    for (let i of range(5)) {
      await couriers.create({name: `Courier ${i + 1}`})
    }

    const all = await couriers.getAll()
    const allIds = all.map(order => order.id)
    expect(allIds).to.be.array()

    const randomId = await couriers.getRandomId()
    expect(allIds).to.contain(randomId)
  })
})
