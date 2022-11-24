const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
require("dotenv").config();
const router = require("./router");
// const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

io.engine.generateId = (req) => {
  return req._query.id;
};

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);
});

app.use(express.json());

app.use(cors({ credentials: true, origin: true }));
app.use("/api", router(io));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
