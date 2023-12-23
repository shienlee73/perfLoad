import useCanvas from "../hooks/useCanvas";

const Cpu = ({ data }) => {
  const { cpuLoad } = data;
  const canvasRef = useCanvas(cpuLoad);

  return (
    <div className="cpu col-3">
      <h3>Cpu Load</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="" width="200" height="200"></canvas>
        <div className="cpu-text">{cpuLoad}%</div>
      </div>
    </div>
  );
};

export default Cpu;
