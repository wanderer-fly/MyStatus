const wsURL = `ws://${window.location.hostname}:8080`

const ws = new WebSocket(wsURL)


ws.onopen = () => {
    // Things to do when connected
    console.log("WebSocket connected")
}

ws.onmessage = (event) => {

    console.log(event.data)

    const parsedMessage = JSON.parse(event.data)

    console.log(`Received message => ${parsedMessage.type}`)

    switch (parsedMessage.type) {
        case 'status': handleStatus(parsedMessage); break;
        case 'serverStatus': console.log('serverStatus'); break;
        default: console.error('Error message')
    }
}

ws.onclose = () => {
    console.log('WebSocket connection closed')
}
