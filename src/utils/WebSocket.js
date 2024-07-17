const WebSocket = require('ws')
const config = require('./config')

const wss = new WebSocket.Server({ port: config.websocketPort })

// wss.on('connection', (ws) => {
//     console.log('WebSocket client connected')
  
//     ws.on('message', (message) => {
//         console.log(`Received message => ${message}`)
//     })
  
//     ws.on('close', () => {
//         console.log('WebSocket client disconnected')
//     })
// })

function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

module.exports = {
    wss,
    broadcast
}
