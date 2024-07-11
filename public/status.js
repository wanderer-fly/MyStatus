const statusElement = document.getElementById('status')
const ws = new WebSocket(`ws://${window.location.host}`)

ws.onmessage = (event) => {
    const { status } = JSON.parse(event.data)
    statusElement.textContent = status
}