import app from '../app/app.js'
import * as ping from '../templates/sse/ping/ping.js'

const delay = 1000

const wait = resolve => setTimeout(resolve, delay)

app.get('/ping', async (request, reply) => {
  const sse = reply.sse()
  let counter = 0

  while (!reply.raw.writableEnded) {
    counter += 1
    sse('ping', counter, ping.template, { counter })
    await new Promise(wait)
  }
})
