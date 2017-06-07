const Lab = require('lab')
const Code = require('code')
const Joi = require('joi')
const order = require('./order')
const schema = require('./schema')

const lab = exports.lab = Lab.script()

const {test, experiment} = lab
const {expect} = Code

experiment('orders', () => {
  test('formats order numbers correctly', (done) => {
    expect(order.formatOrderId(1)).to.equal('0001')
    expect(order.formatOrderId(10)).to.equal('0010')
    expect(order.formatOrderId(9999)).to.equal('9999')
    done()
  })

  test('estimated arrival generates a date in the future', (done) => {
    expect(order.estimatedArrival()).to.be.a.date()
    expect(order.estimatedArrival() - Date.now()).to.be.greaterThan(0)
    done()
  })

  test('getOrder() returns a valid object', (done) => {
    const courier = {id: 1, name: 'foo'}
    const newOrder = order.getOrder(1, courier)
    Joi.validate(newOrder, schema, done)
  })

  test('generator works', (done) => {
    const orders = order.createOrder()
    expect(orders).to.be.an.object()
    const next = orders.next()
    expect(next.done).to.be.false()
    expect(next.value.id).to.equal('0000')
    done()
  })
})
