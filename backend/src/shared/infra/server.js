require('dotenv').config()

const express = require('express')
const { errors } = require('celebrate')

const routes = require('./routes')

const server = express()

server.use(express.json())

server.get('/health', (req, res) => {
  return res.json({ message: 'App is running' })
})

server.use(routes)

server.use(errors())

server.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`)
})
