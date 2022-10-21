const express = require("express");
const app = express();

const io = require("socket.io")(5000, {
  cors: {
    origin: ["*"],
  },
});

const idList = [];
const disconnections = [];
var connectedCounter = 0;

io.on("connection", (socket) => {
  idList.push(socket.handshake.query.userId);
  io.emit("newIdList", idList);
  io.emit("disconnections", disconnections);
  connectedCounter++;
  io.emit("connectedCounter", connectedCounter);

  socket.on("disconnect", () => {
    disconnections.push(socket.handshake.query.userId);
    io.emit("disconnections", disconnections);
    connectedCounter--;
    io.emit("connectedCounter", connectedCounter);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World, from server");
});

app.listen(8080, () = > { console.log("Listening on port 8080"); } );
