const express = require('express')
const router = express.Router()
const WebSocket = require('../../utils/WebSocket')

let currentStatus = "Unknown"
let currentEmotion = "Unknown"

router.get('/', (req, res) => {
    res.json({ type: 'status', status: currentStatus, emotion: currentEmotion })
})

router.post('/', (req, res) => {
    const { status, emotion } = req.body
    const type = 'status'
    if (status || emotion) {
        currentStatus = status? status : currentStatus
        currentEmotion = emotion? emotion : currentEmotion
        const message = {
            status: currentStatus,
            emotion: currentEmotion
        }
        WebSocket.broadcast(WebSocket.jsonBuilder(type, message))
        res.status(200).json({ message: `updated` })
    } else {
        res.status(400).json({ message: "Status or emotion not updated" })
    }
})

module.exports = router