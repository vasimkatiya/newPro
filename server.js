const http = require("http");
const { Server } = require("socket.io");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User joined:", userId);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    }
  });
});

module.exports = { app, server, io, onlineUsers };