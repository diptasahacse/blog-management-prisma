import { Router } from "express";
import postCommentValidation from "./postComment.validation";
import postCommentController from "./postComment.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLES } from "../user/user.type";
const postCommentRouter = Router();
const {
  createPostCommentValidation,
  commentParamsValidation,
  updatePostCommentValidation,
} = postCommentValidation;
const {
  createPostComment,
  getCommentById,
  getPostComments,
  deletePostComment,
  updatePostComment,
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
postCommentRouter.put(
  "/:id",
  auth(USER_ROLES.USER, USER_ROLES.ADMIN),
  validateRequest(commentParamsValidation, "params"),
  validateRequest(updatePostCommentValidation, "body"),
  updatePostComment,
);
postCommentRouter.delete(
  "/:id",
  auth(),
  validateRequest(commentParamsValidation, "params"),
  deletePostComment,
);

export default postCommentRouter;
