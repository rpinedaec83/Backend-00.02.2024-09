import { request, response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../entity/user.entity.js";

const createUser = async (req = request, res = response) => {
  const { firstName, lastName, email, password } = req.body;

  console.log(req.body)

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    firstName,
    lastName,
    email,
    password: newPassword,
  });

  await newUser.save();
  const token = jwt.sign(
    { id: newUser.dataValues.id },
    process.env.SECRET_TOKEN
  );

  return res.json({ user: newUser, token });
};

const listUser = async (req = request, res = response) => {
  console.log(req.user);
  if(req.user.role!=='ADMIN'){
    //RESPONDER CON ERROR 401
  }
  const users = await UserModel.findAll();
  return res.json(users);
};

export { createUser, listUser };
