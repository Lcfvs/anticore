import app from './app.js'

import './routes/home.js'
import './routes/form.js'

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
