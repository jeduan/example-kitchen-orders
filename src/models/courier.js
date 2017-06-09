const BaseModel = require('./base')
const sample = require('lodash/sample')
const faker = require('faker')

class Courier extends BaseModel {
  async create (data = {}) {
    const values = {
      $name: data.name || faker.name.firstName()
    }
    const run = await this.db.run(`INSERT INTO couriers (name) VALUES ($name)`, values)
    return run.stmt.lastID
  }

  async getAll () {
    return this.db.all(`SELECT * FROM couriers`)
  }

  async get ($id) {
    return this.db.get('SELECT * FROM couriers WHERE id=$id', {$id})
  }

  async getRandomId () {
    const query = `SELECT id FROM couriers;`
    const ids = await this.db.get(query)
    return sample(ids)
  }
}

module.exports = Courier
