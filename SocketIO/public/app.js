const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("newMessage", input.value, roomName, () => {
    // console.log(input.value);
    addMessage(`You: ${value}`);
  });
  input.value = "";
};

const handleNameSubmit = () => {
  event.preventDefault();
  const input = room.querySelector(".name input");
  socket.emit("nickname", input.value);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector(".name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNameSubmit);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  //emit - last argument can be a function that can pass to backend (but will execute on front end)
  socket.emit("enterRoom", input.value, showRoom);
  roomName = input.value;
  input.value = "";
});

socket.on("welcome", (user) => {
  addMessage(`${user} joined the chat`);
});

socket.on("bye", (user) => {
  addMessage(`${user} left the chat`);
});

// socket.on("newMessage", (msg) => addMessage(msg));
socket.on("newMessage", addMessage);

socket.on("roomChange", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.appendChild(li);
  });
});
