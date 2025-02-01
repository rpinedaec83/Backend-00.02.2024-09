import { Router } from "express";
import { createUser, listUser } from "../controllers/user.controller.js";
import {validateJwt} from '../../../middleware/validate-jwt.middleware.js'
const userRoutes = Router();

userRoutes.post("", createUser);

userRoutes.get("", validateJwt,listUser);
export default userRoutes;
