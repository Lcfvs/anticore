import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(multer().array())
app.use('/', express.static('public'))

export default app
