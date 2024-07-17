const express = require('express')
const router = express.Router()
const config = require('../../utils/config')
const WebSocket = require('../../utils/WebSocket')

router.get('/', (req, res) => {
    try {
        const avatarData = config.avatar
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(avatarData))
    } catch (parseError) {
        console.error('Error parsing JSON from config.json:', parseError);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
})

router.post('/', (req, res) => {
    
})

module.exports = router