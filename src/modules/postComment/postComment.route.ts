import { Router } from "express";
import postCommentValidation from "./postComment.validation";
import postCommentController from "./postComment.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
const postCommentRouter = Router();
const { createPostCommentValidation, commentParamsValidation } =
  postCommentValidation;
const {
  createPostComment,
  getCommentById,
  getPostComments,
  deletePostComment,
} = postCommentController;
postCommentRouter.post(
  "/",
  auth(),
  validateRequest(createPostCommentValidation, "body"),
  createPostComment,
);
postCommentRouter.get("/", auth(), getPostComments);
postCommentRouter.get(
  "/:id",
  auth(),
  validateRequest(commentParamsValidation, "params"),
  getCommentById,
);
postCommentRouter.delete(
  "/:id",
  auth(),
  validateRequest(commentParamsValidation, "params"),
  deletePostComment,
);

export default postCommentRouter;
