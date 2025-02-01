import { Router } from "express"
import { MessageController } from "../controllers/message.controller.js"

export const messageRoute = Router()

messageRoute.get('/', MessageController.getAll)
messageRoute.post('/', MessageController.createMessage)
messageRoute.patch('/:id', MessageController.updateMessage)
messageRoute.delete('/:id', MessageController.deleteMessage)