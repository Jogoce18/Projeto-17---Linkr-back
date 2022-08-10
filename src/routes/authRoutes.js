import { Router } from "express";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import { login } from "../controllers/loginController.js"
import { sign_up } from "../controllers/signUpController.js";
import { schemaLogin, schemaSignUp } from "../schemas/authSchemas.js";

const authRouter=Router()

authRouter.post('/sign-up',schemaValidateMiddleware(schemaSignUp),sign_up)
authRouter.post('/login',schemaValidateMiddleware(schemaLogin),login)

export default authRouter