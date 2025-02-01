import { UserModel } from "../models/index.js";

export class UserController{

    static async createUser(req, res){
        const input = req.body
        const user = await UserModel.createUser(input)
        if(!user){
            return res.json({ message : "No se pudo crear el usuario"})
        }
        res.json(user)
    }

    static async getUserbyID(req, res){
        const id  = req.params.id
        const user = await UserModel.getUserbyID(id)
        if(!user){
            return res.json({ message: "Usuario no encontrado" })
        }
        res.json(user)
    }

    static async getUsers(req, res){
        const user = await UserModel.getUsers()
        if(!user){
            return res.json({ message: "No hay usuarios" })
        }
        res.json(user)
    }

    static async getUserMessages(req, res){
        const id = req.params.id
        const user = await UserModel.getUserbyID(id)
        if(!user){
            return res.json({ message : "Usuario no econtrado" })
        }
        const messages = user.getMessages()
        if(!messages){
            return res.json({ message : "No tiene mensajes"})
        }
        res.json(messages)
    }

    static async deleteUser(req, res){
        const id = req.params.id
        const user = await UserModel.deleteUser(id)
        if(!user){
            return res.json({ message: `No se eliminó el usuario con ID: ${id}`})
        }
        res.json({ message: `Se eliminó el usuario con ID: ${id}`})
    }

    static async updateUser(req, res){
        const id = req.params.id
        const input = req.params.body
        const user = await UserModel.updateUser(id, input)
        if(!user){
            return res.json({ message: `No se actualizó el usuario con ID: ${id}`})
        }
        res.json({ message: `Se actualizó el usuario con ID: ${id}`, id: id, ...input})
    }

    static async getUserPackages(req, res){
        const id = req.params.id
        const user = await UserModel.getUserbyID(id)
        if(!user){
            return res.json({ message : "Usuario no econtrado" })
        }
        const messages = user.getPackages()
        if(!messages){
            return res.json({ message : "No tiene paquetes"})
        }
        res.json(messages)
    }
}

/* const req = {
    body:{
        userData:{ nombre : 'Camilo', 
            apellido : 'Montemayor', correo: 'asd17@asd.com', contraseña:'123'},
        messageData:{
            message: "Hola 17"
        }
    }
}

const res = {}

console.log(await UserController.createUserAndMessage(req, res)) */