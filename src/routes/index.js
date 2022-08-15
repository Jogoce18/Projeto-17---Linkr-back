import { Router } from "express";
import postsRouter from "./postsRoute.js";
import usersRouter from "./usersRoute.js";
import authRouter from "./authRoutes.js";
import hashtagRouter from "./hashtagRoutes.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(usersRouter);
router.use(hashtagRouter);
router.use(likesRouter);

export default router;
