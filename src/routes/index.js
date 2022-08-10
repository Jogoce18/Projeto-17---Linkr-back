import {Router} from "express";
import userPost from "./userPostRoutes.js";
import usersRouter from "./usersRoutes.js";

const router = Router();

router.use(userPost);
router.use(usersRouter);

export default router;