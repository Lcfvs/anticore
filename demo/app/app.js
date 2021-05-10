import express from 'express'
import multer from 'multer'

const app = express()

app.use(multer().array())
app.use('/', express.static('public'))

export default app
