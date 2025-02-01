import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { listUser } from "../controllers/user.controller.js";
import { validateJwt } from "../../../middleware/validate-jwt.js";
import { validateFields } from "../../../middleware/validate-field.js";
import { check } from "express-validator";
const userRoutes = Router();

userRoutes.post(
  "",
  [
    check("firstName",'FirstName is required').not().isEmpty(),
    check("email").isEmail(),
    check("password",'Password is required').not().isEmpty(),
    validateFields,
  ],
  createUser
);

userRoutes.get("", validateJwt, listUser);

export default userRoutes;
