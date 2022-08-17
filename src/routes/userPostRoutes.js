import { Router } from "express";

import {
  PostUser,
  deletePost,
  editPost,
} from "../controllers/userPostController.js";

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import validateToken from "../middlewares/authorizationMiddleware.js";
import postSchema from "../schemas/userPostSchema.js";
import { validateUserId } from "../middlewares/usersMIddlewares.js";
import { selectAll } from "../controllers/userPostController.js";

const userPost = Router();

userPost.post(
  "/post",
  validateToken,
  schemaValidateMiddleware(postSchema),
  PostUser
);
userPost.delete("/post/:postId", validateToken, deletePost);
userPost.put(
  "/post/:postId",
  validateToken,
  schemaValidateMiddleware(postSchema),
  editPost
);
userPost.get("post/:userId", validateToken, validateUserId, selectAll);

export default userPost;
