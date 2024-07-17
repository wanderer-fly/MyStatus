const statusElement = document.getElementById('status')
const emotionElement = document.getElementById('emotion')

const wsURL = `ws://${window.location.hostname}:8080`

const ws = new WebSocket(wsURL)

ws.onopen = () => {
  console.log('WebSocket connected')
  statusElement.textContent = "Unknown"
  emotionElement.textContent = "Unknown"
}

ws.onmessage = (event) => {
  try {
    const { status, emotion } = JSON.parse(event.data)
    statusElement.textContent = status
    emotionElement.textContent = emotion
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
