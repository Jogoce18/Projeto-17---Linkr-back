import { authRepository } from '../repositories/authRepository.js'
import { schemaFunctions } from '../schemas/schemas'
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

export async function login(req,res) {
    
    try{
        const {email,password}=req.body
        const {rows:checkUser}=await authRepository.getUser(email)
        if(checkUser.rowCount===0) return res.status(404).send("Usuario não encontrado")

        if(checkUser.rowCount!==0 && bcrypt.compareSync(password, checkUser)){
            const dados={userId:checkUser.id}
            const chaveSecreta = process.env.JWT_SECRET;
            const configuracoes = { expiresIn: 60*60*24 }
            const token = jwt.sign(dados, chaveSecreta,configuracoes);

            await authRepository.postLogin(checkUser.id,token)
            
            res.send({
                token,
                username:checkUser.username,
                pictureUrl:checkUser.pictureUrl
            })

        } else{
            return res.status(401).send("E-mail ou senha incorretos")            
        }
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}