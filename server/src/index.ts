import path from "path";
import express from "express";
import redisAdapter from "socket.io-redis";
import session from "express-session";
import cookieParser from "cookie-parser";
import ConnectRedis from "connect-redis";
import Http from "http";
import SocketIo from "socket.io";

// create app
const app = express();
// static
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
// cookie
const RedisStore = ConnectRedis(session);
app.use(
  session({
    store: new RedisStore({}),
    secret: "kashiesoaitasdisaodueoa",
    resave: false
  })
);

// socket.io
const http = Http.createServer(app);
const io = SocketIo(http);
io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

io.on("connection", socket => {
  console.log("connected", socket.id);
  socket.broadcast.emit("message", socket.id);
});

// start
http.listen(3000, () => {
  console.log("listening on *:3000");
});
