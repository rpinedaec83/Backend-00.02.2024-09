import { DataTypes } from "sequelize";
import sequelize from "../config/db/sequelize.config.js";
import Servicios from "./servicios.model.js";
import persveterinario from "./persveterinario.model.js";

const Consultas=sequelize.define(
    "Consultas",{
        IdConsulta:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        IdServicio:{
            type:DataTypes.STRING,
            allowNull:false
        },
        IdPersVeterinario:{
            type:DataTypes.STRING,
            allowNull:false
        },
        PrecioTotal:{
            type:DataTypes.DECIMAL,
            allowNull:false
        }
    },
    {
        tabeName:"Consultas",
        timestamps:true
    }
)


Servicios.belongsTo(Consultas,{
    foreignKey:"IdServicio",
})
Consultas.hasMany(Servicios, {
    foreignKey: "IdServicio",
    as: "servicios",
  });

persveterinario.belongsTo(Consultas,{
    foreignKey:"IdPersVeterinario",
})
Consultas.hasMany(persveterinario, {
    foreignKey: "IdPersVeterinario",
    as: "PersVeterinario",
  });


export default Consultas;