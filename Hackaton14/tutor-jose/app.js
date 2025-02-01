import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import express from "express";
import { Server } from "socket.io";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  // escuchar cuando se desconecte un usuario

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  //escuchar mensajes
  socket.on("chat message", (data) => {
    console.log("🚀 ~ file: app.js:25 ~ socket.on ~ data:", data);
    //guardado de mensajes en la base de datos


  //peticion http a open IA

    socket.emit("response message", { username: "GPT", message:'Perú,Argentina,Venezuela' });
  });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
  console.log(`server running on port ${3000}`);
});
