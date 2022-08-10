import bcrypt from 'bcrypt'
import { authRepository } from '../repositories/authRepository.js'

export async function sign_up(req,res) {
    const {username,email,password,picture}=req.body
    
    try{
        const {rows:checkEmail}=await authRepository.getUser(email)
        if(checkEmail.length!==0) return res.status(409).send("Usuario já cadastrado")

        const hashPassword=bcrypt.hashSync(password, 10);
        await authRepository.postSignUp(email,hashPassword,username,picture)

        res.sendStatus(201)

    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}

