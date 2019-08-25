const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", socket => {
  console.log("a user connected", socket.id);
  socket.broadcast.emit("msg");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
