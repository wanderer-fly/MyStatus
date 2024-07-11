const fs = require('fs')
const path = require('path')

const configPath = path.join(__dirname, '../../config.json')
let config = {
    port: 3000,
    websocketPort: 8080
}

if (fs.existsSync(configPath)) {
    const rawConfig = fs.readFileSync(configPath)
    config = JSON.parse(rawConfig)
} else {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

module.exports = config
