import { Router } from "express";

import validateToken from "../middlewares/authorizationMiddleware.js";
import {
  searchUsers,
  searchUserPosts,
} from "../controllers/usersControlles.js";
import { validateUserId } from "../middlewares/usersMiddlewares.js";

const router = Router();

router.get("/users", validateToken, searchUsers);
router.get("/users/:id", validateToken, validateUserId, searchUserPosts);

export default router;
