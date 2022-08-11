import bcrypt from 'bcrypt'
import { authRepository } from '../repositories/authRepository.js'

export async function sign_up(req,res) {
    const {username,email,password,pictureURL}=req.body
    
    try{
        const {rows:checkEmail}=await authRepository.getUser(email)
        if(checkEmail.length!==0) return res.status(409).send("Usuario já cadastrado")

        const hashPassword=bcrypt.hashSync(password, 10);
        await authRepository.postSignUp(email,hashPassword,username,pictureURL)

        res.sendStatus(201)

    } catch(e){
        console.log(e)
        res.status(500).send("Erro com o servidor")
    }
    
}
