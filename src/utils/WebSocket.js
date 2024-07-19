const WebSocket = require('ws')
const config = require('./config')

const wss = new WebSocket.Server({ port: config.websocketPort })

wss.on('connection', (ws) => {
    // console.log('WebSocket client connected')
  
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`)

        const parsedMessage = JSON.parse(message)
        switch (parsedMessage.type) {
          case 'status': console.log('status'); break;
          case 'serverStatus': console.log('serverStatus'); break;
          default: console.error('Error message')
        }
    })
  
    ws.on('close', () => {
        console.log('WebSocket client disconnected')
    })
})

function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

function jsonBuilder(type, message) {
  jsonData = {
    type: type,
    data: message
  }
  return JSON.stringify(jsonData)
}

module.exports = {
    wss,
    broadcast,
    jsonBuilder
}
