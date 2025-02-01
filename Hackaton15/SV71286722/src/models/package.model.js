import { DataTypes, Model } from "sequelize";
import { sequelize as database } from "../config/dbconfig.js";

export class PackageModel extends Model {
    static async getPackages(){
        const packages = await PackageModel.findAll()
        return packages 
    }

    static async createPackage( input ){
        const packageCreated = await PackageModel.create( input )
        return packageCreated
    }

    static async updatePackage(id,  input ){
        const packageUpdated = await PackageModel.update(
             input ,
            {
                where: { id }
            }
        )
        return packageUpdated
    }

    static async deletePackage(id){
        const packageDeleted = await PackageModel.destroy({where: {id}})
        return packageDeleted
    }
}

PackageModel.init(
    {
        ubicación: {
            type: DataTypes.STRING
        },
        estado: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false,
        sequelize: database,
        modelName: 'Package'
    }
)