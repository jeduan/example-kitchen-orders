const Hapi = require('hapi')
const createDatabase = require('./database')

async function createServer () {
  const server = new Hapi.Server({debug: {request: ['info', 'error']}})
  server.connection({
    port: process.env.PORT || 3001,
    host: 'localhost'
  })
  const database = await createDatabase()
  const plugins = [{
    register: require('./src/routes/orders'),
    options: { database }
  }]
  await server.register(plugins)
  return server
}

if (!module.parent) {
  createServer()
    .then(server => server.start()
      .catch((err) => {
        console.error(err)
        process.exit(1)
      })
    )
    .catch(err => console.error(err))
}

module.exports = createServer
