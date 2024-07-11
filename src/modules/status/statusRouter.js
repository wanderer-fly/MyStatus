const express = require('express')
const router = express.Router()
const WebSocket = require('../../utils/WebSocket')

let currentStatus = "Unknown"

router.get('/', (req, res) => {
    res.json({ status: currentStatus })
})

router.post('/', (req, res) => {
    const { status } = req.body
    if (status) {
        currentStatus = status
        WebSocket.broadcast({ status: currentStatus })
        res.status(200).json({ message: `Status updated to ${currentStatus}` })
    } else {
        res.status(400).json({ message: "Status not updated" })
    }
})

module.exports = router