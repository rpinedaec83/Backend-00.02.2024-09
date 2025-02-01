import { Sequelize, DataTypes } from "sequelize"
import sequelize from "../config/dbconfig.js"
import { MessagesModel } from "./messages.model.js"

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Messages = new MessagesModel(sequelize, DataTypes);

export default db;