import { Router } from "express";
import postCommentValidation from "./postComment.validation";
import postCommentController from "./postComment.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
const postCommentRouter = Router();
const { createPostCommentValidation, getCommentParamsValidation } =
  postCommentValidation;
const { createPostComment, getCommentById } = postCommentController;
postCommentRouter.post(
  "/",
  auth(),
  validateRequest(createPostCommentValidation, "body"),
  createPostComment,
);
postCommentRouter.get(
  "/:id",
  auth(),
  validateRequest(getCommentParamsValidation, "params"),
  getCommentById,
);

export default postCommentRouter;
