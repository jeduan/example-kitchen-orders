const Lab = require('lab')
const Code = require('code')
const util = require('./util')

const lab = exports.lab = Lab.script()

const {test, experiment} = lab
const {expect} = Code

experiment('model utils', () => {
  test('formats order numbers correctly', (done) => {
    expect(util.formatOrderId(1)).to.equal('0001')
    expect(util.formatOrderId(10)).to.equal('0010')
    expect(util.formatOrderId(9999)).to.equal('9999')
    done()
  })

  test('estimated arrival generates a date in the future', (done) => {
    expect(util.estimatedArrival()).to.be.a.date()
    expect(util.estimatedArrival() - Date.now()).to.be.greaterThan(0)
    done()
  })
})
