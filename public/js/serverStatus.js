function handleServerStatus(status) {
    if (status) {
        renderSystemInfo(status.systemInfo)
        renderDockerContainers(status.dockerContainers)
    } else {
        console.log('Server status is null or undefined.')
    }
}

async function fetchServerStatus() {
    try {
        const response = await fetch('/serverStatus')
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText)
        }
        const data = await response.json()
        return data.serverStatus
    } catch (error) {
        console.error('Error fetching server status')
        return null
    }
}

function renderCPUChart(cpuUsage) {
    const cpuUsageElement = document.getElementById('cpuUsage')
    cpuUsageElement.value = cpuUsage
}

function renderMemoryChart(usedMemory, totalMemory) {
    const memoryUsage = document.getElementById('memoryUsage')
    memoryUsage.max = totalMemory
    memoryUsage.value = usedMemory
}

function renderDockerContainers(containers) {
    const list = document.getElementById('dockerContainers')
    list.innerHTML = ''
    
    if (containers && containers.length > 0) {

        const table = document.createElement('table')
        table.classList.add('container-table')
    
        const headerRow = table.insertRow();
        const headers = ['Name', 'Image', 'State', 'Status'];
        headers.forEach(headerText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
    
        containers.forEach(container => {
            const row = table.insertRow();
            ['name', 'image', 'state', 'status'].forEach(key => {
                const cell = row.insertCell();
                cell.textContent = container[key];
            });
        });

        list.textContent = '';
        list.appendChild(table);
    } else {
        list.textContent = 'No Docker containers found.';
    }
}

function renderSystemInfo(systemInfo) {
    if (systemInfo) {
        // document.getElementById('totalMemory').textContent = systemInfo.totalMemory || 'N/A'
        // document.getElementById('usedMemory').textContent = systemInfo.usedMemory || 'N/A'
        // document.getElementById('freeMemory').textContent = systemInfo.freeMemory || 'N/A'

        const cpuUsage = parseFloat(systemInfo.cpuUsage)
        const usedMemory = parseFloat(systemInfo.usedMemory)
        const freeMemory = parseFloat(systemInfo.freeMemory)
        const totalMemory = parseFloat(systemInfo.totalMemory)

        if (!isNaN(cpuUsage)) {
            renderCPUChart(cpuUsage)
        }

        if (!isNaN(usedMemory) && !isNaN(totalMemory)) {
            renderMemoryChart(usedMemory, totalMemory)
        }
        
        
    } else {
        console.error('System information is not available.')
    }
}

async function initialize() {
    const status = await fetchServerStatus()
    if (status) {
        renderSystemInfo(status.systemInfo)
        renderDockerContainers(status.dockerContainers)
    } else {
        console.error('Failed to fetch server status.')
    }
}

document.addEventListener('DOMContentLoaded', initialize)

setInterval(() => {
    initialize()
}, 3000)