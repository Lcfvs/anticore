import fastify from '../fastify.js'

fastify.addHook('preHandler', async (request, reply) => {
  reply.header('content-security-policy', [
    `default-src 'none'`,
    `connect-src 'self'`,
    `script-src 'self'`,
    `style-src 'self'`,
    `require-trusted-types-for 'script'`,
    `trusted-types anticore dom-engine`
  ].join('; '))
})
