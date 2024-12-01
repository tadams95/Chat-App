const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let chatgroups = [];

io.on("connection", (socket) => {
  console.log(`${socket.id} just connected`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatgroups);
  });

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatgroups);
  });

  socket.on("createRoom", (groupName) => {
    console.log(`New group created: ${groupName}`);
    chatgroups.unshift({
      id: chatgroups.length + 1,
      groupName,
      messages: [],
    });
    io.emit("groupList", chatgroups); // Emit the updated group list to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
