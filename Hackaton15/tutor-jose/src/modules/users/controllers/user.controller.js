import { request, response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../entity/user.entity.js";

const createUser = async (req = request, res = response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "data required",
    });
  }

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
  const users = await UserModel.findAll();
  return res.json(users);
};

export { createUser, listUser };
