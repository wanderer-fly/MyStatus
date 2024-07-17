const os = require('os');
const si = require('systeminformation');
const Docker = require('dockerode');

// 获取 CPU 和内存信息
async function getSystemInfo() {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();

    return {
      cpuUsage: cpu.currentload !== undefined ? cpu.currentload.toFixed(2) + '%' : 'N/A',
      totalMemory: memory.total !== undefined ? (memory.total / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A',
      usedMemory: memory.active !== undefined ? (memory.active / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A',
      freeMemory: memory.free !== undefined ? (memory.free / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A',
    };
  } catch (error) {
    console.error('Error getting system info:', error);
    return {
      cpuUsage: 'N/A',
      totalMemory: 'N/A',
      usedMemory: 'N/A',
      freeMemory: 'N/A',
    };
  }
}

// 获取运行的 Docker 容器
async function getDockerContainers() {
  try {
    const docker = new Docker();
    const containers = await docker.listContainers();

    return containers.map(container => ({
      id: container.Id,
      image: container.Image,
      state: container.State,
      status: container.Status,
    }));
  } catch (error) {
    console.error('Error getting Docker containers:', error);
    return [];
  }
}

// 综合获取所有信息
async function getServerStatus() {
  const systemInfo = await getSystemInfo();
  const dockerContainers = await getDockerContainers();

  return {
    systemInfo,
    dockerContainers,
  };
}

// 打印服务器状态
getServerStatus().then(status => console.log(status)).catch(err => console.error('Error getting server status:', err));
