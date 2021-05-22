import app from '../app.js'
import { serialize } from '../dom.js'
import { ping } from '../templates.js'

const delay = 1000

const wait = resolve => setTimeout(resolve, delay)

app.get('/ping', async (request, response) => {
  let counter = 0

  response.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  })

  while (!response.writableEnded) {
    counter += 1

    response.write(`id: ${counter}\n`)

    response.write('type: ping\n')

    response.write(`data: ${serialize({
      ...ping,
      counter
    })}\n\n`)

    await new Promise(wait)
  }
})
