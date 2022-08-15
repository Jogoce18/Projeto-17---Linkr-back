import { tokenRepository } from "../repositories/tokenRepository.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  const secretKey = process.env.JWT_SECRET;

  if (!token) return res.status(401).send("Token não existe");

  try {
    jwt.verify(token, secretKey);

    const user = jwt.verify(token, secretKey).userId;
    const resultUser = await tokenRepository.getUser(user);
    console.log(user);
    if (resultUser.rowCount == 0)
      return res.status(404).send("Usuário não encontrado"); // unauthorized

    res.locals.resultUser = resultUser.rows[0];

    next();
  } catch (error) {
    console.log("Erro ao tentar obter usuário através da sessão");
    console.log(error);
    return res.status(401).send("Token expirado,faça login novamente");
  }
}
