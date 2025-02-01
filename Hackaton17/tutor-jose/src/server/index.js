import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

import express from "express";
import { Server as SocketServer } from "socket.io";
import sequelize from "../config/db/index.js";
import userRoutes from "../modules/users/routes/user.routes.js";
import authRoutes from "../modules/auth/routes/auth.routes.js";
import StripeRouter from "../services/stripe/routes/stripe.routes.js";

class Server {
  constructor() {
    this.__dirname = dirname(fileURLToPath(import.meta.url));

    this.port = process.env.PORT || 3000;
    this.app = express();

    this.server = createServer(this.app);
    this.io = new SocketServer(this.server);
    // this.originPath='api/v1'

    this.userPath = "/api/users";
    this.authPath = "/api/auth";
    this.stripePath = "/api/stripe";

    this.middleware();

    this.routes();

    this.connectDb();

    this.socket();
  }

  routes() {
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.stripePath, StripeRouter);
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(this.__dirname, "../public/")));
  }

  connectDb = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({
        alter: true,
      });
      console.log("🚀 Connection has been established successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  socket() {
    this.io.on("connection", (socket) => {
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

        socket.emit("response message", {
          username: "GPT",
          message: "Perú,Argentina,Venezuela",
        });
      });
    });
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }
}

export default Server;
