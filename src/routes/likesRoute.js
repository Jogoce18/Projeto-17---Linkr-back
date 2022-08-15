import { Router } from "express";
import validateToken from "../middlewares/authorizationMiddleware.js";
import { postLikes } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.post("/sign-up", validateToken, postLikes);

export default likesRouter;
