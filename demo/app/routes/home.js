import app from '../app.js'
import { render } from '../dom.js'
import { home, layout } from '../templates.js'

app.get('/', (request, response) => {
  response.send(render(layout, home, response.xhr))
})
