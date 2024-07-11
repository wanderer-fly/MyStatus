const express = require('express')
const app = express()

const statusRouter = require('./statusRouter')
app.use('/', statusRouter)

module.exports = app