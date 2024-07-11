const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const fs = require('fs')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

let currectStatus = "Unknown"

app.use(express.json())
app.use(express.static('public'))

app.get('/status', (req, res) => {
    res.json({ status: currectStatus })
})

app.post('/status', (req, res) => {
    const { status } = req.body
    console.log(req.body)
    if (status) {
        currectStatus = status
        wss.clients.forEach(client => {
            client.send(JSON.stringify({ status: currectStatus }))
        })
        res.status(200).json({ message: `Status updated to ${currectStatus}` })
    } else {
        res.status(400).json({ message: "Status not updated" })
    }
})

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ status: currectStatus }))

    ws.on('message', (message) => {
        const { status } = JSON.parse(message)
        currectStatus = status

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ status: currectStatus }))
            }
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
