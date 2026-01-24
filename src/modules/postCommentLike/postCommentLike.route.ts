import { Router } from "express";
import postCommentValidation from "./postCommentLike.validation";
import postCommentController from "./postCommentLike.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import postCommentLikeValidation from "./postCommentLike.validation";
const postCommentLikeRouter = Router();
const { createPostCommentLikeValidation } = postCommentLikeValidation;
const { createPostCommentLike } = postCommentController;
postCommentLikeRouter.post(
  "/",
  auth("USER"),
  validateRequest(createPostCommentLikeValidation, "body"),
  createPostCommentLike,
);

export default postCommentLikeRouter;
