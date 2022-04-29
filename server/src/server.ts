import { Server as SocketServer, Socket } from "socket.io";

enum SocketEvents {
  CONNECTION = "connection",
  ROTATION_MATRIX = "rotation",
}

const socketServer = new SocketServer({
  cors: { origin: "*", methods: ["GET", "POST"] },
});

socketServer.on(SocketEvents.CONNECTION, (socket: Socket) => {
  console.log("Got connection from socket ", socket.id);

  socket.on(SocketEvents.ROTATION_MATRIX, (data) => {
    socket.broadcast.emit(SocketEvents.ROTATION_MATRIX, data);
  });
});

socketServer.listen(7777);
