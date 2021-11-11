const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");
app.get("/", (req, res) => res.render("home"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  socket.on("close", () => console.log("browser close socket connection"));
  socket.on("message", (message) => {
    socket.send(message.toString());
  });
  socket.send("hellloooooo");
});

server.listen(4000, () => console.log("server connected"));
