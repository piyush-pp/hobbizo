const express = require("express");
const router = express.Router();

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    socket.on("chat", (msg) => {
      //console.log(msg);
      io.emit("chat", msg);
    }); 
  });

  return router;
};
