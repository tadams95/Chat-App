const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let chatgroups = [];

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

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

  socket.on("findGroup", (groupID) => {
    const group = chatgroups.filter((item) => item.id === groupID);
    socket.emit("foundGroup", group[0].messages);
  });

  socket.on("newChatMessage", (data) => {
    const { currentChatMesage, groupIdentifier, currentUser, timeData } = data;
    const filteredGroup = chatgroups.filter(
      (item) => item.id === groupIdentifier
    );
    const newMessage = {
      id: createUniqueId(),
      text: currentChatMesage,
      currentUser,
      time: `${timeData.hr}:${timeData.mins}`,
    };

    socket.to(filteredGroup[0].groupName).emit("groupMessage", newMessage);
    filteredGroup[0].messages.push(newMessage);
    socket.emit("groupList", chatgroups);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
