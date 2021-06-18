import fastify from '../fastify.js'

const { entries, fromEntries } = Object

const field = ([name, { value }]) => [name, value]

fastify.addHook('preHandler', async request => {
  const { body } = request

  request.body = body && fromEntries(entries(body).map(field))
})
