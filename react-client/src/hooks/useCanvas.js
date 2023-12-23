import { useEffect, useRef } from "react";
import drawCircle from "../utilities/canvasLoadAnimation";

const useCanvas = (data) => {
  const canvasRef = useRef();

  useEffect(() => {
    drawCircle(canvasRef.current, data);
  }, [data]);

  return canvasRef;
};

export default useCanvas;
