import { Router } from "express";
import postsRouter from "./postsRoute.js";
import usersRouter from "./usersRoute.js";
import authRouter from "./authRoutes.js";
import hashtagRouter from "./hashtagRoutes.js";
import likesRouter from "./likesRoute.js";
import commentsRouter from "./commentsRoutes.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(usersRouter);
router.use(hashtagRouter);
router.use(likesRouter);
router.use(commentsRouter);

export default router;
