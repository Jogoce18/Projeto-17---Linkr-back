import { Router } from "express";

import {
    CreatePost,
    editPost,
    timeline,
   /*  deletePost, */
} from "../controllers/PostController.js";

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import postSchema from "../schemas/userPostSchema.js";
import { haveHashtag, validatePostExistence, verifyIfPostBelongsToUser } from "../middlewares/postMIddleware.js";
import validateToken from "../middlewares/authorizationMiddleware.js";

const userPost = Router();
 
userPost.post("/posts", validateToken, schemaValidateMiddleware(postSchema), haveHashtag, CreatePost);
userPost.put("/posts/:id", validateToken, validatePostExistence, verifyIfPostBelongsToUser, haveHashtag, editPost);
userPost.get("/posts", validateToken, timeline);
/* userPost.delete("/post/:id", validateToken, validatePostExistence,verifyIfPostBelongsToUser,deletePost) */

export default userPost;