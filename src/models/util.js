const faker = require('faker')
const addMinutes = require('date-fns/add_minutes')

function estimatedArrival () {
  const currentDate = new Date()
  return faker.date.between(addMinutes(currentDate, 1), addMinutes(currentDate, 60))
}

function formatOrderId (num) {
  return String(num).padStart(4, '0')
}

module.exports = {
  estimatedArrival,
  formatOrderId
}
