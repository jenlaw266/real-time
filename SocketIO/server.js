const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));
app.set("view engine", "pug");
app.get("/", (req, res) => res.render("home"));

const publicRooms = () => {
  const sids = io.sockets.adapter.sids;
  const rooms = io.sockets.adapter.rooms;
  //const {sockets:{adapter:{sids, rooms}}} = io;
  const publicRooms = [];
  rooms.forEach((value, key) => {
    if (!sids.get(key)) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
};

io.on("connection", (socket) => {
  socket.nickname = "Anon";
  socket.onAny((event) => {
    // console.log(io.sockets.adapter)
    console.log(`socket event: ${event}`);
  });
  socket.on("enterRoom", (roomName, showRoom) => {
    // console.log(socket.id);
    // console.log(socket.rooms);
    socket.join(roomName);
    showRoom();
    socket.to(roomName).emit("welcome", socket.nickname);
    io.sockets.emit("roomChange", publicRooms());
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });
  socket.on("disconnect", () => {
    io.sockets.emit("roomChange", publicRooms());
  });
  socket.on("newMessage", (msg, room, done) => {
    socket.to(room).emit("newMessage", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname", (name) => (socket.nickname = name));
});

server.listen(4000, () => console.log("server connected"));
