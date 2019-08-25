import http from "http";
import Io from "socket.io";
import redisAdapter from "socket.io-redis";

import { getRedisConfig } from "./config/getRedisConfig";

export function createSocketIo(server: http.Server): Io.Server {
  const io = Io(server);
  io.adapter(redisAdapter(getRedisConfig()));
  return io;
}
