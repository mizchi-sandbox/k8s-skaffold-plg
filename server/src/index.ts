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
  console.log("connected", socket.id);
  socket.broadcast.emit("message", socket.id);
});

// start
server.listen(3000, () => {
  console.log("listening on *:3000");
});
