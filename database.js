const sqlite = require('sqlite')

async function createDatabase () {
  const url = (process.env.NODE_ENV === 'test')
    ? ':memory:'
    : './data/database.sqlite'

  const db = await sqlite.open(url)
  await sqlite.migrate()
  return db
}

module.exports = createDatabase
