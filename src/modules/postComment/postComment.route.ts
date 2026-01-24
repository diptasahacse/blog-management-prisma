import { Router } from "express";
import postCommentValidation from "./postComment.validation";
import postCommentController from "./postComment.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
const postCommentRouter = Router();
const { createPostCommentValidation } = postCommentValidation;
const { createPostComment } = postCommentController;
postCommentRouter.post(
  "/",
  auth(),
  validateRequest(createPostCommentValidation, "body"),
  createPostComment,
);

export default postCommentRouter;
