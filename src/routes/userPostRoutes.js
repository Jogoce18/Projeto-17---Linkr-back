import { Router } from "express";

import {
    PostUser,
    deletePost,
    editPost,
} from "../controllers/userPostController.js";

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import bearerTokenValidateMiddleware from "../middlewares/bearerTokenValidateMiddleware.js";
import postSchema from "../schemas/userPostSchema.js";
import { validateUserId } from "../middlewares/usersMIddlewares.js";
import { selectAll } from "../controllers/userPostController.js";

const userPost = Router();

userPost.post("/post",bearerTokenValidateMiddleware,schemaValidateMiddleware(postSchema), PostUser);
userPost.delete("/post/:postId",bearerTokenValidateMiddleware,deletePost);
userPost.put("/post/:postId",bearerTokenValidateMiddleware,schemaValidateMiddleware(postSchema), editPost);
userPost.get("post/:userId", bearerTokenValidateMiddleware, validateUserId, selectAll);

export default userPost;