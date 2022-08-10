import {Router} from "express";
import userPost from "./userPostRoutes.js";
import usersRouter from "./usersRoutes.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.use(userPost);
router.use(usersRouter);
router.use(authRouter)

export default router;