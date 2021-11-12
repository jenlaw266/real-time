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
  socket.onAny((event) => console.log(`socket event: ${event}`));
  socket.on("enterRoom", (roomName, showRoom) => {
    // console.log(socket.id);
    // console.log(socket.rooms);
    socket.join(roomName);
    showRoom();
    socket.to(roomName).emit("welcome");
  });
  socket.on("disconnecting", () =>
    socket.rooms.forEach((room) => socket.to(room).emit("bye"))
  );
  socket.on("newMessage", (msg, room, done) => {
    socket.to(room).emit("newMessage", msg);
    done();
  });
});

server.listen(4000, () => console.log("server connected"));
