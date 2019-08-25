import io from "socket.io-client";
const socket = io({
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("connected");
  socket.on("message", (msg: any) => {
    console.log("receive msg", msg);
  });
});

const button = document.querySelector("button") as HTMLElement;
button.addEventListener("click", () => {
  socket.emit(Date.now().toString());
});
