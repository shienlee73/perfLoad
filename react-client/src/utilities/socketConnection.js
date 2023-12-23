import io from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
  auth: {
    token: "jxjPcNqoVr3HZzNM",
  },
});

// socket.on("welcome", (data) => {
//   console.log(data);
// });

export default socket;
