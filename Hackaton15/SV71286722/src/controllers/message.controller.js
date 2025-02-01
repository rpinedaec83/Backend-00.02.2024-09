import { MessageModel } from "../models/index.js"

export class MessageController{
    static async getAll(req, res){
        const messages = await MessageModel.getMessages()
        if(!messages){
            return res.json({ message : "empty" })
        }
        res.json(messages)
    }

    static async createMessage(req, res){
        const input = req.body
        const message = await MessageModel.createMessage(input)
        if(!message){
            return res.json({ message : "No se pudo crear el mensaje"})
        }
        res.json(message)
    }

    static async updateMessage(req, res){
        const input = req.body
        const id = req.params.id
        const isUpdated = await MessageModel.updateMessage(id, input)
        if(!isUpdated){
            return res.json({ message : "No se actualizó"})
        }
        res.json({ id : id , ...input})
    }

    static async deleteMessage(req, res){
        const id = req.params.id
        const isDeleted = await MessageModel.deleteMessage(id)
        if(!isDeleted){
            return res.json({ message: "No se eliminó"})
        }
        res.json({ message : `Se eliminó el mensaje con ID: ${id}`})
    }
}