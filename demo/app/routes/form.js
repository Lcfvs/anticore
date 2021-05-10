import app from '../app.js'
import { render } from '../dom.js'
import { congrats, error, form, layout } from '../templates.js'

app.get('/form', (request, response) => {
  response.send(render(layout, form, response.xhr))
})

app.post('/form', (request, response) => {
  if (request.body.result !== '2') {
    const partials = {
      result: error.fill('result')
    }
    
    
    return response.send(render(layout, form, response.xhr, partials))
  }

  response.send(render(layout, congrats, response.xhr))
})
