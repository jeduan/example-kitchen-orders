const sqlite = require('sqlite')

function createDatabase () {
  const url = (process.env.NODE_ENV === 'test')
    ? ':memory:'
    : './data/database.sqlite'

  return sqlite.open(url)
    .then(() => sqlite.migrate({force: 'last'}))
}

module.exports = createDatabase
