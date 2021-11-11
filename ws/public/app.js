const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("connected to server");
});

socket.addEventListener("message", (message) => {
  console.log("message:", message.data, message.timeStamp);
});

socket.addEventListener("close", () => {
  console.log("close");
});

setTimeout(() => {
  socket.send("hello from browser");
}, 10000);
