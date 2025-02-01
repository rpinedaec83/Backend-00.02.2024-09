import { request, response } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../../users/entity/user.entity.js";
import axios from "axios";

const authLoginCredentials = async (req = request, resp = response) => {
  const { email, password } = req.body;

 

  const foundUser = await userModel.findOne({
    where: { email },
    attributes: ["id", "firstName", "lastName", "password", "email"],
  });

  if (!foundUser) {
    return resp.status(400).json({
      message: "User with email not found",
    });
  }

  const math = await bcrypt.compare(password, foundUser.password);
  if (!math) {
    return resp.status(401).json({ message: "Unauthorized" });
  }
  const { password: _, ...user } = foundUser.toJSON();

  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);

  return resp.json({ user: user, token });
};

const githubOauth = (req = request, resp = response) => {
  resp.redirect(
    `${process.env.GITHUB_URL}/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT}`
  );
};

const callBackGithub = async (req = request, resp = response) => {
  try {
    const { code } = req.query;

    const body = {
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };

    const options = { headers: { accept: "application/json" } };

    const { data } = await axios.post(
      `${process.env.GITHUB_URL}/login/oauth/access_token`,
      body,
      options
    );
    console.log(
      "🚀 ~ file: auth.controller.js:62 ~ callBackGithub ~ data:",
      data
    );

    const { data: dataUser } = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });
    console.log(
      "🚀 ~ file: auth.controller.js:69 ~ callBackGithub ~ dataUser:",
      dataUser
    );

    //logica de negocio
    if (dataUser) {
      //consulta si el suuario existe cib ek ud de github
      //si existe genera el jwt y devulve
      //si no existe, crear usuario
      
      const existUserGithub = await userModel.findOne({
        where: { githubId: dataUser.id },
      });
      if (!existUserGithub) {
        //creacion de usuario
      } else {
        login;
      }
    }
    return resp.json(dataUser);
  } catch (err) {
    console.log(err);
  }
};
export { authLoginCredentials, githubOauth, callBackGithub };
