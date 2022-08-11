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

      res.send({
        token,
        username: checkUser[0].username,
        pictureUrl: checkUser[0].pictureUrl,
      });
    } else {
      return res.status(401).send("E-mail ou senha incorretos");
    }
  } catch (e) {
    res.status(500).send("Erro com o servidor");
  }
}
