
import { Router } from "express";

import { newRepost } from "../controllers/repostController.js";
import { getReposts } from "../controllers/repostController.js";


import validateToken from "../middlewares/authorizationMiddleware.js";
const repostsRouter = Router();

repostsRouter.post("/reposts/:postId",validateToken,newRepost);
repostsRouter.get("/reposts",validateToken,getReposts);


export default repostsRouter;