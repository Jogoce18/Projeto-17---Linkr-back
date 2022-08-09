import {Router} from "express";
import userPost from "./userPostRoutes.js";
const router = Router();

router.use(userPost);

export default router;