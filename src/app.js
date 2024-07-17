const express = require('express')
const http = require('http')
const path = require('path')
const config = require('./utils/config')

const app = express()
const server = http.createServer(app)
app.use(express.json())

// Static files
app.use(express.static(path.join(__dirname, '../public')))

// Routes
const statusRouter = require('./modules/status/statusRouter')
const serverStatusRouter = require('./modules/serverStatus/serverStatusRouter')
// const otherRouter = require('./modules/other/otherRouter')

app.use('/status', statusRouter)
app.use('/serverStatus', serverStatusRouter)
// app.use('/other', otherRouter)

const PORT = config.port

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
