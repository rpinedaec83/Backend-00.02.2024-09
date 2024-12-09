import { DataTypes } from "sequelize";
import sequelize from "../config/db/sequelize.cofig.js";
import Mascotas from "./mascota.model.js";

const Clientes = sequelize.define(
  "clientes",
  {
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        is: /^[0-9]+$/i,
        len: [8],
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]+$/i,
      },
    },
  },
  {
    tabeName: "clientes",
    timestamps: true,
  }
);

// Clientes.hasMany(Mascotas,{foreignKey:"responsable"})

Mascotas.belongsTo(Clientes, {
  foreignKey: "clienteDni",
});
Clientes.hasMany(Mascotas, {
  foreignKey: "clienteDni",
  as: "mascotas",
});

export default Clientes;