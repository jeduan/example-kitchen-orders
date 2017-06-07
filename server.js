const Hapi = require('hapi')
const Boom = require('boom')
const createOrder = require('./order')

function server () {
  const app = new Hapi.Server()
  const orders = createOrder()
  app.connection({
    port: process.env.PORT || 3001
  })

  app.route({
    method: 'GET',
    path: '/order',
    handler: function (request, reply) {
      const order = orders.next()
      if (order.done) {
        reply(Boom.serverUnavailable)
        return
      }
      reply(order.value)
    }
  })

  const oldStart = app.start

  app.start = () => oldStart.call(app, (err) => {
    if (err) throw err
    console.log(`Listening at port ${app.info.uri}`)
  })
  return app
}

if (require.main === module) {
  server().start()
}

module.exports = server
