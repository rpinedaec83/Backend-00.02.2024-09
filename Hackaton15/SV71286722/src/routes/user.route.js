import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"

export const userRoute = Router()

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserbyID)
router.get('/:id/messages', UserController.getUserMessages)
router.get('/:id/packages', UserController.getUserPackages)

router.post('/', UserController.createUser)

router.patch('/', UserController.updateUser)

router.delete('/', UserController.deleteUser)