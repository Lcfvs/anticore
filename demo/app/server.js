import open from 'open';
import app from './app.js'

import './routes/home.js'
import './routes/form.js'

const listener = app.listen(process.env.PORT, async () => {
  const {port} = listener.address();
  console.log(`Your app is listening on port ${port}`)
  if (process.argv.includes('--open')) {
    await open(`http://127.0.0.1:${port}`);
  }
})
