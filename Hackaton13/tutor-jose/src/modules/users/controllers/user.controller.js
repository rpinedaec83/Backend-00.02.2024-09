import { request, response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../entity/user.entity.js";

const createUser = async (req = request, res = response) => {
  const { firstName, lastName, username, email, password, phoneNumber } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !phoneNumber
  ) {
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
    phoneNumber,
    username,
  });
  res.json({
    message: "Operation successful",
    data: newUser,
  });
};

const listUser = async (req = request, res = response) => {
  const { user } = req;
  console.log(user);
  const users = await UserModel.find();

  return res.json({
    message: "Operation successful",
    data: users,
  });
};
export { createUser, listUser };
