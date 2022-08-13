import { Router } from "express";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import { schemaLogin, schemaSignUp } from "../schemas/authSchemas.js";
import { sign_up, login} from "../controllers/authorizationControllers.js";

const authRouter = Router();

authRouter.post('/sign-up', schemaValidateMiddleware(schemaSignUp), sign_up);
authRouter.post('/login', schemaValidateMiddleware(schemaLogin), login);

export default authRouter