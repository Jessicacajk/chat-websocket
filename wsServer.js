let app = require("http").createServer();
let io = require("socket.io")(app);

const PORT = 3000;

let clientCount = 0;

app.listen(PORT);

io.on("connection", function (socket) {
  clientCount++;
  socket.nickname = "user" + clientCount;
  io.emit("enter", socket.nickname + " comes in");

  socket.on("message", function (str) {
    io.emit("message", socket.nickname + " says: " + str);
  });

  socket.on("disconnect", function () {
    io.emit("leave", socket.nickname + " left");
  });
});

//createServer的参数是一个回调函数，listen端口port，
//当一个连接连过来的时候，就会调用该连接
// let server = ws
//   .createServer(function (conn) {
//     console.log("New connection");
//     clientCount++;
//     conn.nickname = "user" + clientCount;

//     let mes = {};
//     mes.type = "enter";
//     mes.data = conn.nickname + " come in";
//     broadcast(JSON.stringify(mes));

//     //客户端有消息发送过来时回调的函数
//     conn.on("text", function (str) {
//       console.log("Received" + str);
//       let mes = {};
//       mes.type = "message";
//       mes.data = conn.nickname + " says: " + str;
//       broadcast(JSON.stringify(mes));
//     });

//     //有客户端断开时
//     conn.on("close", function (code, reason) {
//       console.log("Connection closed");
//       let mes = {};
//       mes.type = "left";
//       mes.data = conn.nickname + "left";
//       broadcast(JSON.stringify(mes));
//     });
//     conn.on("error", function (err) {
//       console.log("handle err");
//       console.log(err);
//     });
//   })
//   .listen(PORT);

// // 将一个客户端发送来的消息返回给每个连接的客户端；
// function broadcast(str) {
//   server.connections.forEach((connection) => {
//     connection.sendText(str);
//   });
// }

console.log("websocket server listening on port" + PORT);
