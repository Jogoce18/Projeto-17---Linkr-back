import { Router } from "express";

import { validateHeader, validateToken } from "../middlewares/validateHeader.js";
import { searchUsers } from "../controllers/usersControlles.js";

const router = Router();

router.get("/users", validateHeader, validateToken, searchUsers);

export default router;