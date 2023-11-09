require('dotenv').config()

const express = require('express')
const { errors } = require('celebrate')
const Youch = require('youch')
const cors = require('cors')
const uploadConfig = require('../../config/upload')

require('express-async-errors')

const routes = require('./routes')

const server = express()

server.use(express.json())

server.use(cors({ origin: '*' }))

server.get('/health', (req, res) => {
  return res.json({ message: 'App is running' })
})

server.use('/files', express.static(uploadConfig.directory))

server.use(routes)

server.use(errors())

server.use(async (error, request, response, _) => {
  const appError = await new Youch(error, request).toJSON()

  return response.status(appError.error.status || 500).json({
    error: {
      code: appError.error.status || 500,
      message: appError.error.message || 'Internal server error',
    },
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`)
})
