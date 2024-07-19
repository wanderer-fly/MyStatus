const statusElement = document.getElementById('status')
const emotionElement = document.getElementById('emotion')

fetch(`http://${window.location.hostname}:3000/status`)
  .then(res => {
    if (!res.ok) {
      console.error('Error to GET /status')
    } return res.json()
  })
  .then(data => {
    statusElement.textContent = data.status || "Unknown"
    emotionElement.textContent = data.emotion || "Unknown"
  })
  .catch(err => {
    console.error('There was a problem with the fetch operation:', err)
  })

function handleStatus(data) {
  try {
    const { status, emotion } = data.data
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
