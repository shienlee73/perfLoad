const os = require("os");
const io = require("socket.io-client");

const socket = io("http://localhost:3000", {
  auth: {
    token: "LBzmyF6AxM2GDEAg",
  },
});

let perfDataInterval;

socket.on("connect", () => {
  // console.log("Connected to the server!");
  let macAddress;
  const interfaces = os.networkInterfaces();
  for (let key in interfaces) {
    if (!interfaces[key][0].interval) {
      macAddress = interfaces[key][0].mac;
      break;
    }
  }

  // emit performance data per second
  perfDataInterval = setInterval(async () => {
    const perfData = await performanceLoadData();
    perfData.macAddress = macAddress;
    socket.emit("perfData", perfData);
  }, 1000);
});

socket.on("disconnect", () => {
  clearInterval(perfDataInterval);
});

function cpuAverage() {
  const cpus = os.cpus();

  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    idleMs += core.times.idle;
    for (mode in core.times) {
      totalMs += core.times[mode];
    }
  });
  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const percentOfCpu = 100 - Math.floor((idleDiff / totalDiff) * 100);
      resolve(percentOfCpu);
    }, 100);
  });
}

const performanceLoadData = async () => {
  const osType = os.type() === "Darwin" ? "Mac" : os.type();
  const upTime = os.uptime();
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMem = totalMem - freeMem;
  const memUsage = ((usedMem / totalMem) * 100).toFixed(2);
  const cpus = os.cpus();
  const cpuType = cpus[0].model;
  const numCores = cpus.length;
  const cpuSpeed = cpus[0].speed;
  const cpuLoad = await getCpuLoad();
  const isAlive = true;
  return {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    isAlive,
  };
};

// const run = async () => {
//   const data = await performanceLoadData();
//   console.log(data);
// };
// run();
