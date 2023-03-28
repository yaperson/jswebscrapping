// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const scrap = require('./src/scrapping/scrap')
// Declare a route
fastify.get('/', async (request, reply) => {
  let data = scrap
  return data
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()