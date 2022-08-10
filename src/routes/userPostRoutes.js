import { Router } from "express";

import {
    PostUser,
    deletePost,
    editPost,
} from "../controllers/userPostController.js";

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import bearerTokenValidateMiddleware from "../middlewares/bearerTokenValidateMiddleware.js";
import postSchema from "../schemas/userPostSchema.js";

const userPost = Router();

userPost.post("/post",bearerTokenValidateMiddleware,schemaValidateMiddleware(postSchema), PostUser);
userPost.delete("/post/:postId",bearerTokenValidateMiddleware,deletePost);
userPost.put("/post/:postId",bearerTokenValidateMiddleware,schemaValidateMiddleware(postSchema), editPost);

export default userPost;