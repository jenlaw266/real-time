const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));
app.set("view engine", "pug");
app.get("/", (req, res) => res.render("home"));

io.on("connection", (socket) => {
  socket.on("enterRoom", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done("hello from server"); //calls the done function in the front end after 5s
    }, 5000);
  });
});

server.listen(4000, () => console.log("server connected"));
