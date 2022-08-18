import { authRepository } from "../repositories/authRepository.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { rows: checkUser } = await authRepository.getUser(email);

    if (checkUser.length === 0)
      return res.status(404).send("Usuario não encontrado");

    if (
      checkUser.length !== 0 &&
      bcrypt.compareSync(password, checkUser[0].password)
    ) {
      const dados = { userId: checkUser[0].id };
      const chaveSecreta = process.env.JWT_SECRET;
      const configuracoes = { expiresIn: 60 * 60 * 24 };
      const token = jwt.sign(dados, chaveSecreta, configuracoes);

      await authRepository.postLogin(token);

      res.status(200).send({
        token,
        username: checkUser[0].username,
        pictureUrl: checkUser[0].pictureURL,
        id: checkUser[0].id,
      });
    } else {
      return res.status(401).send("E-mail ou senha incorretos");
    }
  } catch (e) {
    res.status(500).send("Erro com o servidor");
    console.log(e);
  }
}

export async function sign_up(req, res) {
  const { username, email, password, pictureURL } = req.body;

  try {
    const { rows: checkEmail } = await authRepository.getUser(email);
    if (checkEmail.length !== 0)
      return res.status(409).send("Usuario já cadastrado");

    const hashPassword = bcrypt.hashSync(password, 10);
    await authRepository.postSignUp(email, hashPassword, username, pictureURL);

    res.sendStatus(201);
  } catch (e) {
    res.status(500).send("Erro com o servidor");
  }
}
