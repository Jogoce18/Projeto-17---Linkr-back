import { Router } from "express";

import {
    CreatePost,
    editPost,
    timeline,
} from "../controllers/PostController.js";

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import postSchema from "../schemas/userPostSchema.js";
import { haveHashtag, validatePostExistence, verifyIfPostBelongsToUser } from "../middlewares/postMIddleware.js";
import validateToken from "../middlewares/authorizationMiddleware.js";

const userPost = Router();
 
userPost.post("/posts", validateToken, schemaValidateMiddleware(postSchema), haveHashtag, CreatePost);
userPost.put("/posts", validateToken, validatePostExistence, verifyIfPostBelongsToUser, haveHashtag, editPost);
userPost.get("/posts", validateToken, timeline);

export default userPost;