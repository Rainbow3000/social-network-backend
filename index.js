require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 5000;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database is connected !"))
  .catch((error) => {
    console.log(error);
    process.exit();
  });

const router = require("./src/router");

app.use("/api", router);

const server = app.listen(PORT, () =>
  console.log(`server is running at port ${PORT}`)
);

const io = new Server(server, {
  cors: {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  },
});

global.userOnline = new Map();

global.online = []; 


io.on("connection", (socket) => {
  socket.on("user-online", (userId) => {
    userOnline.set(userId, socket.id);
    const flag = online.indexOf(userId);
    if(flag === -1){
      online.push(userId); 
    } 
   socket.emit("user-is-online",online)
  });

 socket.on("user-send-msg",(data) => {
    const hUser = userOnline.get(data.to);
    if (hUser) {
      data._id = Date.now().toString();
      socket.to(hUser).emit("server-send-data",data);
    }
  });
});
