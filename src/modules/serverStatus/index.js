const express = require('express')
const app = express()

const serverStatusRouter = require('./serverStatusRouter')
app.use('/', serverStatusRouter)

module.exports = app