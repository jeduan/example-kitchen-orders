const Hapi = require('hapi')
const Inert = require('inert')
const createDatabase = require('./database')

async function createServer () {
  const serverConfig = process.env.NODE_ENV === 'production'
    ? {}
    : {
      debug: {
        request: ['info', 'error']
      }
    }
  const server = new Hapi.Server(serverConfig)
  server.connection({
    port: process.env.PORT || 3001,
    host: 'localhost'
  })
  const database = await createDatabase()
  const plugins = [
    {
      register: require('./routes/orders'),
      options: { database }
    },
    Inert
  ]
  await server.register(plugins)

  if (process.env.NODE_ENV === 'production') {
    // Serve create-react-app's build in production
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'client/build'
        }
      }
    })
  }

  return server
}

if (!module.parent) {
  createServer()
    .then(server => server.start()
    .then(() => {
      console.log(`Started server at ${server.info.uri}`)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
    )
    .catch(err => console.error(err))
}

module.exports = createServer
