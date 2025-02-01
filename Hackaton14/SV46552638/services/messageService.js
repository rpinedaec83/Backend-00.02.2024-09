const Message = require ('../models/messageModels')
class MessageService{

    constructor(){}
    async getAll(){
       const messagess = await Message.find({})
       return messagess
    }

    async filterById(id){
        const message = await Message.findOne({_id: id})
        return message
     }

    async create(msg){
        const message = new Message(msg)
        return await message.save()
    }

    async update(id, msg){
        return await Message.findByIdAndUpdate({_id:id},msg)
    }

    async delete (id){
        return await Message.findByIdAndDelete({_id:id})
    }
}

module.exports = MessageService