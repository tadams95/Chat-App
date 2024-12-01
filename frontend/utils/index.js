import { Platform } from "react-native";
import { io } from "socket.io-client";

export const BaseUrl =
  Platform.OS === "android" ? "http://localhost:3000" : "http://10.0.2.2:3000";

export const socket = io("http://10.0.2.2:4000"); // Remove trailing slash

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
