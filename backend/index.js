const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let chatgroups = [];

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("groupList", chatgroups);

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
    const group = chatgroups.filter(
      (item) => item.id === parseInt(groupID, 10)
    );
    if (group.length > 0) {
      socket.emit("foundGroup", group[0].messages);
    } else {
      socket.emit("error", { message: "Group not found" });
    }
  });

  socket.on("newChatMessage", (data) => {
    const { currentChatMessage, groupIdentifier, currentUser, timeData } = data;
    const filteredGroup = chatgroups.filter(
      (item) => item.id === parseInt(groupIdentifier, 10)
    );

    console.log("New Chat Message Data: ", data);
    console.log("Filtered Group: ", filteredGroup);
    if (filteredGroup.length > 0) {
      const newMessage = {
        id: createUniqueId(),
        text: currentChatMessage,
        currentUser,
        time: `${timeData.hr}:${timeData.mins}`,
      };

      filteredGroup[0].messages.push(newMessage);
      console.log(
        `New message added to group ${filteredGroup[0].groupName}:`,
        newMessage
      );
      io.to(filteredGroup[0].groupName).emit("groupMessage", newMessage);
      socket.emit("groupList", chatgroups);
      socket.emit("foundGroup", filteredGroup[0].messages);
    } else {
      socket.emit("error", { message: "Group not found" });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
