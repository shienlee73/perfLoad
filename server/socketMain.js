const socketMain = (io) => {
  io.on("connection", (socket) => {
    let macAddress;
    const auth = socket.handshake.auth.token;

    if (auth === "LBzmyF6AxM2GDEAg") {
      // valid node client
      socket.join("nodeClient");
    } else if (auth === "jxjPcNqoVr3HZzNM") {
      // valid react client
      socket.join("reactClient");
    } else {
      socket.disconnect();
    }

    socket.emit("welcome", "Welcome to the cluster driven socket.io server!");

    socket.on("perfData", (data) => {
      if (!macAddress) {
        macAddress = data.macAddress;
        console.log(macAddress);
      }
      io.to("reactClient").emit("perfData", data);
    });

    socket.on("disconnect", () => {
      io.to("reactClient").emit("deviceStatus", { macAddress, isAlive: false });
    });
  });
};

module.exports = socketMain;
