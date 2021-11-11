const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  //emit - last argument can be a function that can pass to backend (but will execute on front end)
  socket.emit("enterRoom", { payload: input.value }, (msg) => {
    console.log(`message from back: ${msg}`);
  });
  input.value = "";
});
