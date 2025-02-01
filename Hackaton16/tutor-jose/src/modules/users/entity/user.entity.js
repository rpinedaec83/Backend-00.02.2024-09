import { DataTypes } from "sequelize";
import sequelize from "../../../config/db/index.js";

const userModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    githubId: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    googleId: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  }
);

export default userModel;
