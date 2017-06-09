const Lab = require('lab')
const Code = require('code')
const Base = require('./base')

const lab = exports.lab = Lab.script()

const {experiment, test} = lab
const {expect} = Code

const createDb = require('../../database')

experiment('Base Model', () => {
  test('should not work without a db', (done) => {
    expect(() => new Base()).to.throw()
    done()
  })

  test('should work with a db', async () => {
    const db = await createDb()
    expect(() => new Base(db)).to.not.throw()
  })
})
