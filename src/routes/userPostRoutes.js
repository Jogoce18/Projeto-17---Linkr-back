import { Router } from "express";

import {
    CreatePost,

} from "../controllers/PostController.js";
import { validateHeader, validateToken } from "../middlewares/validateHeader.js"

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import postSchema from "../schemas/userPostSchema.js";

const userPost = Router();

userPost.post("/post",validateHeader, validateToken, schemaValidateMiddleware(postSchema), CreatePost);


export default userPost;