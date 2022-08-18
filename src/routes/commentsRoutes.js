import { Router } from "express";
import validateToken from "../middlewares/authorizationMiddleware.js";
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware.js";
import { schemaComments } from "../schemas/commentsSchema.js";
import {
  postComment,
  getCommentsbyId,
} from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.post(
  "/comments/:postId",
  schemaValidateMiddleware(schemaComments),
  validateToken,
  postComment
);
commentsRouter.get("/comments/:postId", validateToken, getCommentsbyId);

export default commentsRouter;
