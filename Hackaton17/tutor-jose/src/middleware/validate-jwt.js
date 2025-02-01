import { request, response } from "express";
import jsonwebtoken from "jsonwebtoken";
import userModel from "../modules/users/entity/user.entity.js";


const validateJwt = async (req = request, res = response, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Access denied",
      });
    }

    const token = req.headers.authorization.split(" ");

    const decoded = jsonwebtoken.decode(token[1], process.env.TOKEN_SECRET);

    const userFound = await userModel.findByPk(decoded.id);

    if (!userFound) {
      return res.status(401).json({
        message: "Access denied",
      });
    }

    req.user = userFound.toJSON();
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Access denied",
    });
  }
};

export { validateJwt };
