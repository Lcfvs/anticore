import plugin from 'fastify-multipart'
import fastify from '../fastify.js'

fastify.register(plugin, {
  attachFieldsToBody: true
})
