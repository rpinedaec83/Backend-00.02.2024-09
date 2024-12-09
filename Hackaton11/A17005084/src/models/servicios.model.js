import { DataTypes } from "sequelize";
import sequelize from "../config/db/sequelize.config.js";

const servicios=sequelize.define(
    "servicios",{
        IdServicio:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },

        NomServicio:{
            type:DataTypes.STRING,
            allowNull:false
        },

        DescServicio:{
            type:DataTypes.STRING,
            allowNull:false
        },

        PrecioServicio:{
            type:DataTypes.DECIMAL,
            allowNull:false
        }
    },
    {
        tabeName:"servicios",
        timestamps:true
    }
)

export default servicios;