const io = require("socket.io")(5000, {
  cors: {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://192.168.1.5:3000",
    ],
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
