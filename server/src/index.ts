// setup
// @ts-ignore
import dotenv from "dotenv-override";
dotenv.config();

import http from "http";

import { createServer } from "./createServer";
import { createSocketIo } from "./createSocketIo";

const app = createServer();
const server = http.createServer(app);
const io = createSocketIo(server);

io.on("connection", socket => {
  console.log("connected", socket);
  // socket.emit("message", socket.id);
  io.sockets.emit("message", socket.id);
  // socket.broadcast.emit("message", socket.id);
  // console.log("bloadcast", "message", socket.id);
});

// start
server.listen(3000, () => {
  console.log("listening on *:3000");
});
