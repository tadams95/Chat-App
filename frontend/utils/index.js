// utils/index.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:4000/"; // Local server URL
const socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket server");
});

export default socket;
