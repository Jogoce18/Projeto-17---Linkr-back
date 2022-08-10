import { tokenRepository } from "../repositories/tokenRepository.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

async function authRoute(req,res,next){
    const {authorization}= req.headers
    const token= authorization ?.replace('Bearer ', '').trim();
    const secretKey = process.env.JWT_SECRET;
    if(!token) return res.status(401).send("Token não existe"); 

    try {
        jwt.verify(token, secretKey,(err)=>{
            if(err) return res.status(401).send("Token expirado")
        })
        
        const resultSession= await tokenRepository.getToken(token)


        if(resultSession.rowCount==0){
            return res.status(401).send("Sessão não existe")
        }

        const user = resultSession.rows[0].userId


        const resultUser= await tokenRepository.getUser(user)
    
        if(resultUser.rowCount==0) return res.status(404).send("Usuário não encontrado"); // unauthorized

        res.locals.resultUser = resultUser.rows;
        next()

    } catch (error) {

    console.log("Erro ao tentar obter usuário através da sessão");
    console.log(error);
    return res.sendStatus(500);

    }
   

}

export default authRoute;