import app from '../app/app.js'
import * as congrats from '../templates/views/congrats/congrats.js'
import * as form from '../templates/views/form/form.js'

app.get('/form', async (request, reply) => {
  reply.view(form.template)
})

app.post('/form', async ({ body }, reply) => {
  if (body.result !== '2') {
    reply.view(form.template, {
      data: body,
      errors: {
        result: new Error('Wrong answer')
      }
    })
  } else {
    reply.view(congrats.template)
  }
})
