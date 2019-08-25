import path from "path";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import ConnectRedis from "connect-redis";
import { getRedisConfig } from "./config/getRedisConfig";

export function createServer() {
  // create app
  const app = express();
  // static
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(cookieParser());
  // cookie
  const RedisStore = ConnectRedis(session);
  app.use(
    session({
      store: new RedisStore(getRedisConfig()),
      secret: "kashiesoaitasdisaodueoa",
      resave: false
    })
  );
  return app;
}
