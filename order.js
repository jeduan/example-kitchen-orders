const faker = require('faker')
const range = require('lodash/range')
const sample = require('lodash/sample')
const addMinutes = require('date-fns/add_minutes')

function * createOrder ({numCouriers = 5} = {}) {
  let currentNumber = 0
  let couriers = range(numCouriers).map((id) => ({
    id,
    name: faker.name.firstName()
  }))

  while (true) {
    yield getOrder(currentNumber++, sample(couriers))
  }
}

function getOrder (id, courier) {
  return {
    id: formatOrderId(id),
    courier,
    name: faker.name.findName(),
    address: faker.address.streetAddress(),
    eta: estimatedArrival()
  }
}

function estimatedArrival () {
  const currentDate = new Date()
  return faker.date.between(addMinutes(currentDate, 1), addMinutes(currentDate, 60))
}

function formatOrderId (num) {
  return String(num).padStart(4, '0')
}

module.exports = {
  createOrder,
  getOrder,
  formatOrderId,
  estimatedArrival
}
