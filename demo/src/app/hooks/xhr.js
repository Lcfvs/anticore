import fastify from '../fastify.js'

fastify.addHook('preHandler', async (request, reply) => {
  reply.xhr = request.headers['x-requested-with'] === 'XMLHttpRequest'
})
