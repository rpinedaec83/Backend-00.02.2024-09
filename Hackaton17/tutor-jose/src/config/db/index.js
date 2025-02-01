import dotenv from "dotenv";

dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: process.env.DATABASE_DB_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  dialect: "mysql",
  port:process.env.DATABASE_PORT
//   sync: true,
});

export default sequelize;
