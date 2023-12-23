import { useState, useEffect } from "react";
import "./App.css";
import socket from "./utilities/socketConnection";
import Widget from "./components/Widget";

function App() {
  const [perfData, setPerfData] = useState({});

  useEffect(() => {
    const handlePerfData = (data) => {
      setPerfData((prev) => {
        const copyPerfData = { ...prev };
        copyPerfData[data.macAddress] = {
          ...copyPerfData[data.macAddress],
          ...data,
        };
        return copyPerfData;
      });
    };

    const handleDeviceStatus = ({ macAddress, isAlive }) => {
      setPerfData((prev) => {
        const copyPerfData = { ...prev };
        copyPerfData[macAddress] = { ...copyPerfData[macAddress], isAlive };
        return copyPerfData;
      });
    };

    socket.on("perfData", handlePerfData);
    socket.on("deviceStatus", handleDeviceStatus);

    return () => {
      socket.off("perfData", handlePerfData);
      socket.off("deviceStatus", handleDeviceStatus);
    };
  }, []);

  const renderWidgets = () => {
    return Object.values(perfData).map((data) => {
      return <Widget key={data.macAddress} data={data} />;
    });
  };

  return <div className="container">{renderWidgets()}</div>;
}

export default App;
