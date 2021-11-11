const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nameForm = document.querySelector("#nickname");

socket.addEventListener("open", () => {
  console.log("connected to server");
});

socket.addEventListener("message", (message) => {
  // console.log("message:", message.data, message.timeStamp);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("close");
});

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("newMessage", input.value));
  input.value = "";
});

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nameForm.querySelector("input");
  socket.send(makeMessage("name", input.value));
  input.value = "";
});
