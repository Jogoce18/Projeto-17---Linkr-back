import { Router } from "express";

import {
    CreatePost,

} from "../controllers/userPostController.js";

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import postSchema from "../schemas/userPostSchema.js";

const userPost = Router();

userPost.post("/post",schemaValidateMiddleware(postSchema), CreatePost);


export default userPost;
