import { DataTypes } from "sequelize";
import sequelize from "../config/db/sequelize.config.js";
const persveterinario=sequelize.define(
    "persveterinario",{
        IdPersVete:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        NroDocuIden:{
            type:DataTypes.STRING(8),
            allowNull:false
        },
        NroLicencia:{
            type:DataTypes.STRING(12),
            allowNull:false
        },
        NomPersVeter:{
            type:DataTypes.STRING,
            allowNull:false
        },
        ApePersVeter:{
            type:DataTypes.STRING,
            allowNull:false
        },
        FecIngreso:{
            type:DataTypes.DATE,
            allowNull:false
        },
        Sueldo:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        Especialidad:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tabeName:"PersVeterinario",
        timestamps:true
    }
)

export default persveterinario;