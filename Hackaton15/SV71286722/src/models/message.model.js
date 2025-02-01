import { DataTypes, Model } from "sequelize";
import { sequelize as database } from "../config/dbconfig.js";

export class MessageModel extends Model {

    static async getMessages(){
        const messages = await MessageModel.findAll()
        return messages 
    }

    static async createMessage(input){
        const messageCreated = await MessageModel.create( input )
        return messageCreated
    }

    static async updateMessage(id,  input){
        const messageUpdated = await MessageModel.update(
            {
                message: input.message
            } ,
            {
                where: { id }
            }
        )
        return messageUpdated
    }

    static async deleteMessage(id){
        const messageDeleted = await MessageModel.destroy({where: {id}})
        return messageDeleted
    }
}

MessageModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: DataTypes.STRING
        },
    },
    { 
        timestamps: false,
        sequelize: database,
        modelName: 'Message',
    })
