const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");
app.get("/", (req, res) => res.render("home"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket.nickname = "Anon";
  socket.on("close", () => console.log("browser close socket connection"));
  socket.on("message", (message) => {
    const newMessage = JSON.parse(message);
    if (newMessage.type === "newMessage") {
      sockets.forEach((aSocket) =>
        aSocket.send(`${socket.nickname}: ${newMessage.payload}`)
      );
    } else if (newMessage.type === "name") {
      socket.nickname = newMessage.payload;
    }
  });
});

server.listen(4000, () => console.log("server connected"));
