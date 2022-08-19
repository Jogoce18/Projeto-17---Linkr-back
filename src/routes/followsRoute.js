import { Router } from "express";

import validateToken from "../middlewares/authorizationMiddleware.js";
import { validateIds } from "../middlewares/followsMiddlewares.js";
import { validateUserId } from "../middlewares/usersMIddlewares.js";
import {
  verifyIfUserFollowsAnotherUser,
  createFollow,
  deleteFollow,
  getUserFollowers,
} from "../controllers/followsControllers.js";

const router = Router();

router.get(
  "/follows/:userId/:followerId",
  validateToken,
  validateIds,
  verifyIfUserFollowsAnotherUser
);

router.get("/follows/:id", validateToken, validateUserId, getUserFollowers);

router.delete(
  "/follows/:userId/:followerId",
  validateToken,
  validateIds,
  deleteFollow
);

router.post(
  "/follows/:userId/:followerId",
  validateToken,
  validateIds,
  createFollow
);

export default router;
