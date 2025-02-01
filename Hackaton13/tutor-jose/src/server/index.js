import express from "express";

import mongoose from "../config/db/index.js";
import userRoutes from "../modules/users/routes/index.routes.js";

import authRoutes from "../modules/auth/routes/auth.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.dbUrl = process.env.MONGO_URL || "";
    this.userPath = "/api/users";
    this.authPath = "/api/auth";

    this.connectDb();

    this.middleware();

    this.routes();
  }

  routes() {
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.authPath, authRoutes);
  }

  middleware() {
    this.app.use(express.json());
  }

  async connectDb() {
    try {
      await mongoose.connect(this.dbUrl);
      console.log("MongoDb connected");
    } catch (err) {
      console.log("error in connect");
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

export default Server;
