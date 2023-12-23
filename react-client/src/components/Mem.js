import useCanvas from "../hooks/useCanvas";

const Mem = ({ data }) => {
  const { freeMem, totalMem, usedMem, memUsage } = data;
  const canvasRef = useCanvas(memUsage);

  const bytesToGigabytes = (bytes) => {
    return bytes / 1024 ** 3; // 1 gigabyte = 1024^3 bytes
  };

  return (
    <div className="mem col-3">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="" width="200" height="200"></canvas>
        <div className="mem-text">{memUsage}%</div>
      </div>
      <div>Total Memory: {bytesToGigabytes(totalMem).toFixed(2)} GB</div>
      <div>Free Memory: {bytesToGigabytes(freeMem).toFixed(2)} GB</div>
    </div>
  );
};

export default Mem;
