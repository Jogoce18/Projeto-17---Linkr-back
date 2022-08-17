import { Router } from "express";

import validateToken from "../middlewares/authorizationMiddleware.js";
import { validateIds } from "../middlewares/followsMiddlewares.js";
import { verifyIfUserFollowsAnotherUser, createFollow, deleteFollow } from "../controllers/followsControllers.js"

const router = Router();

router.get("/follows/:userId/:followerId", validateToken, validateIds, verifyIfUserFollowsAnotherUser);
router.delete("/follows/:userId/:followerId", validateToken, validateIds, deleteFollow);
router.post("/follows/:userId/:followerId", validateToken, validateIds, createFollow);

export default router;