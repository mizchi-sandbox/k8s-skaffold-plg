import io from "socket.io-client";
import { wrapSocket } from "../../packages/slink";
const socket = io({
  transports: ["websocket"]
});

socket.on("connect", async () => {
  // with slink
  const wrapped = wrapSocket(socket);
  const res = await wrapped.call("foo", { id: socket.id });
  console.log("res", res);
});

const button = document.querySelector("button") as HTMLElement;
button.addEventListener("click", () => {
  socket.send(Date.now().toString());
});
