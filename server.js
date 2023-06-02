//Require the necessary packages
const express = require("express");
const app = express();
const http = require("http").createServer(app);
// initialize socket
const io = require("socket.io")(http);

//Set up a route for the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Handle socket connections and disconnections when client establish a scoket connection
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//Serve the application
http.listen(3000, () => {
  console.log("listening on *:3000");
});
