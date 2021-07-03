import app from '../app/app.js'
import * as home from '../templates/views/home/home.js'

app.get('/', async (request, reply) => {
  await reply.view(home.template)
})
