const statusElement = document.getElementById('status')

const wsURL = `ws://${window.location.hostname}:8080`

const ws = new WebSocket(wsURL)

ws.onopen = () => {
  console.log('WebSocket connected')
  statusElement.textContent = "Unknown"
}

ws.onmessage = (event) => {
  try {
    const { status } = JSON.parse(event.data)
    console.log('Received status:', status)
    statusElement.textContent = status
  } catch (error) {
    console.error('Error parsing message:', error)
  }
}

ws.onclose = () => {
  console.log('WebSocket disconnected')
}

ws.onerror = (error) => {
  console.error('WebSocket error:', error.message)
}
