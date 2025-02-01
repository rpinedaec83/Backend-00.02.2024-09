import { Router } from "express";
import { check } from "express-validator";

import {
  authLoginCredentials,
  callBackGithub,
  githubOauth,
} from "../controllers/auth.controller.js";
import { validateFields } from "../../../middleware/validate-field.js";

const authRoutes = Router();

authRoutes.post(
  "",
  [check("email").isEmail(), check("password").not().isEmpty(), validateFields],
  authLoginCredentials
);
authRoutes.get("/github", githubOauth);
authRoutes.get("/github/callback", callBackGithub);
export default authRoutes;
