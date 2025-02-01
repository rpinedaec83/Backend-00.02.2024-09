export class MessagesModel{
    constructor(sequelize, DataType){
        this.sequelize = sequelize
        this.DataType = DataType
        this.Messages = this.sequelize.define("messages",{
            id: {
                type: this.DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            role : {
                type: this.DataType.STRING
            },
            message: {
                type: this.DataType.STRING
            },

        }, { timestamps: false })
    }

    async getMessages(){
        try{
            const messages = await this.Messages.findAll()
            const retrieveData = []
            messages.forEach((message)=>{
                retrieveData.push(message.dataValues)
            })
            return retrieveData
        }catch(e){
            return null
        }
    }

    async createMessage(role, message){
        try{
            const newMessage = await this.Messages.create({
                role,
                message
            })
            return newMessage
        }catch(e){
            return null
        }
    }

}