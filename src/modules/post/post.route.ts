import { NextFunction, Request, Response, Router } from "express";
import postController from "./post.controller";
import auth from "../../middlewares/auth";
import postValidation from "./post.validation";
import validateRequest from "../../middlewares/validateRequest";

const postRouter = Router();
const { createPost, getPost, getPostBuyId, updatePost } = postController;
const {
  createPostValidation,
  updatePostValidation,
  updatePostParamsValidation,
} = postValidation;

// Define your post routes here
postRouter.post(
  "/",
  auth(),
  validateRequest(createPostValidation, "body"),
  createPost,
);
postRouter.get("/", auth(), getPost);
postRouter.get("/:postId", getPostBuyId);
postRouter.put(
  "/:id",
  auth(),
  validateRequest(updatePostValidation, "body"),
  validateRequest(updatePostParamsValidation, "params"),
  updatePost,
);

export default postRouter;
