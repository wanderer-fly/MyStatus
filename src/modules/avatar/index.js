const express = require('express')
const app = express()

const avatarRouter = require('./avatar')
app.use('/', avatarRouter)

module.exports = app