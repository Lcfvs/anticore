import plugin from 'fastify-static'
import resolve from '../../lib/resolve.js'
import fastify from '../fastify.js'

const prefix = '/assets/'
const root = resolve(import.meta.url, `../..${prefix}`)

fastify.register(plugin, { prefix, root })
