import plugin from 'fastify-static'
import resolve from '../../lib/resolve.js'
import fastify from '../fastify.js'

const prefix = '/'
const root = resolve(import.meta.url, `../../../dist`)

fastify.register(plugin, { prefix, root })
