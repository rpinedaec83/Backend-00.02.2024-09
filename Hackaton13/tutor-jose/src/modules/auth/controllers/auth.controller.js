import { json, request, response } from "express";
import UserModel from "../../users/entity/user.entity.js";
import bcrypt from "bcrypt";

import jsonwebtoken from "jsonwebtoken";

const login = async (req = request, resp = response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return resp.status(400).json({
      message: "fields (email,password) is required",
    });
  }
  const existUser = await UserModel.findOne(
    {
      email,
    },
    {
      createdAt: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
      password: 1,
    }
  );

  if (!existUser) {
    return resp.status(400).json({
      message: "User with email not found",
    });
  }

  const math = await bcrypt.compare(password, existUser.password);

  if (!math) {
    return resp.status(401).json({ message: "Unauthorized" });
  }

  const { password: _password, ...rest } = existUser.toJSON();

  const token = jsonwebtoken.sign(
    { id: existUser._id },
    process.env.TOKEN_SECRET
  );
  const data = {
    user: rest,
    token: token,
  };

  return resp.json({
    message: "Operation successful",
    data,
  });
};

export { login };
