import {Router} from "express";
import userPost from "./userPostRoutes.js";
import usersRouter from "./usersRoutes.js";
import authRouter from "./authRoutes.js";
import hashtagRouter from "./hashtagRoutes.js";

const router = Router();

router.use(authRouter)
router.use(userPost);
router.use(usersRouter);
router.use(hashtagRouter)

export default router;