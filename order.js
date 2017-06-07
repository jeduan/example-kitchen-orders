let currentNumber = 0

function * nextOrder () {
  while (true) {
    yield {
      id: formatNumber(++currentNumber),
      name: 'Foo ' + currentNumber,
      address: 'Bar St 123, NY',
      ETA: '10 min'
    }
  }
}

function formatNumber (id) {
  return String(id).padStart(4, '0')
}

module.exports = nextOrder
