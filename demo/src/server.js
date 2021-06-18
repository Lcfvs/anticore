import open from 'open'
import app from './app/app.js'
import './routes/index.js'

const port = process.env.PORT ?? 8080

await app.listen(port)

if (process.argv.includes('--open')) {
  await open(`http://127.0.0.1:${port}`)
}

console.log(`Your app is listening on port ${port}`)
