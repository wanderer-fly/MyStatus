const express = require('express')
const router = express.Router()
const WebSocket = require('../../utils/WebSocket')

let currentStatus = "Unknown"
let currentEmotion = "Unknown"

router.get('/', (req, res) => {
    res.json({ status: currentStatus, emotion: currentEmotion })
})

router.post('/', (req, res) => {
    const { status, emotion } = req.body
    if (status) {
        currentStatus = status
        WebSocket.broadcast({ status: currentStatus, emotion: currentEmotion })
        res.status(200).json({ message: `Status updated to ${currentStatus}` })
    } else if (emotion) {
        currentEmotion = emotion
        WebSocket.broadcast({ status: currentStatus, emotion: currentEmotion })
        res.status(200).json({ message: `Emotion updated to ${currentEmotion}` })
    } else {
        res.status(400).json({ message: "Status or emotion not updated" })
    }
})

module.exports = router