// @ts-ignore
import dotenv from "dotenv-override";
dotenv.config();

import http from "http";
import { createServer } from "./createServer";
import { createSocketIo } from "./createSocketIo";
import { buildSocket } from "../../packages/slink";

const app = createServer();
const server = http.createServer(app);
const io = createSocketIo(server);

const handlerMap = {
  async foo(args: { id: string }) {
    return "foo:" + args.id;
  }
};

io.on("connection", socket => {
  socket.on("message", payload => {
    console.log("[debug] message", payload);
  });
  buildSocket(socket, handlerMap);
});

// start
server.listen(3000, () => {
  console.log("listening on *:3000");
});
