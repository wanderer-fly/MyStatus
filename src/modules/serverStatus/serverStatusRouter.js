const os = require('os')
const si = require('systeminformation')
const express = require('express')
const Docker = require('dockerode')
const router = express.Router()
const WebSocket = require('../../utils/WebSocket')

// Get CPU and RAM info
async function getSystemInfo() {
    try {
        const cpu = await si.currentLoad()
        const memory = await si.mem()
  
        return {
            cpuUsage: cpu.currentLoad !== undefined ? cpu.currentLoad.toFixed(2) + '%' : 'N/A',
            totalMemory: memory.total !== undefined ? (memory.total / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A',
            usedMemory: memory.active !== undefined ? (memory.active / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A',
            freeMemory: memory.free !== undefined ? (memory.free / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A',
        }
    } catch (error) {
        console.error('Error getting system info:', error)
        return {
            cpuUsage: 'N/A',
            totalMemory: 'N/A',
            usedMemory: 'N/A',
            freeMemory: 'N/A',
        }
        
    }
}

// Get Docker info
async function getDockerContainers() {
    try {
        const docker = new Docker()
        const containers = await docker.listContainers()

        return containers.map(container => ({
            name: container.Names[0].substring(1),
            image: container.Image,
            state: container.State,
            status: container.Status,
        }))
    } catch (error) {
        console.error('Error getting Docker containers:', error)
        return []
    }
}

async function getServerStatus() {
    const systemInfo = await getSystemInfo()
    const dockerContainers = await getDockerContainers()
  
    return {
        systemInfo,
        dockerContainers,
    }
}

router.get('/', (req, res) => {
    getServerStatus().then(status => {
        res.json({ serverStatus: status })
    }).catch(err => {
        res.status(500).json({ error: 'Failed to get server status' })
    })
})

// setInterval(() => {
//     getServerStatus().then(status => {
//         WebSocket.broadcast({ serverStatus: status }, 'serverStatus')
//     }).catch(err => {
//         console.log('Failed to get server status')
//     })
// }, 1000)

module.exports = router
 
// getServerStatus().then(status => console.log(status)).catch(err => console.error('Error getting server status:', err))