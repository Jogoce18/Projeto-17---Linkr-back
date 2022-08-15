import { Router } from "express";
import validateToken from "../middlewares/authorizationMiddleware.js";
import { postLikes, removeLikes } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.post("/like/:postId", validateToken, postLikes);
likesRouter.delete("/like/:postId", validateToken, removeLikes);

export default likesRouter;
