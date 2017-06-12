const {assert} = require('hoek')

class BaseModel {
  constructor (db) {
    assert(db, 'A database object is required')
    this.db = db
  }
}

module.exports = BaseModel
