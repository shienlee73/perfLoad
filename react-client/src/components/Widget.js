import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./Widget.css";

const Widget = ({ data }) => {
  const {
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
    macAddress,
    isAlive,
  } = data;

  const cpuData = { cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUsage };
  const infoData = { macAddress, osType, upTime, cpuType, cpuSpeed, numCores };

  const notAliveDiv = !isAlive ? (
    <div className="not-active">Offline</div>
  ) : null;

  return (
    <div className="widget row justify-content-evenly">
      {notAliveDiv}
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={infoData} />
    </div>
  );
};

export default Widget;
