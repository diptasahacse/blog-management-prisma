import { Router } from "express";
import postController from "./post.controller";
import auth from "../../middlewares/auth";
import postValidation from "./post.validation";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLES } from "../user/user.type";

const postRouter = Router();
const {
  createPost,
  getPost,
  getPostBuyId,
  updatePost,
  deletePostController,
  getStatsController,
} = postController;
const { createPostValidation, updatePostValidation, postParamsValidation } =
  postValidation;

// Define your post routes here
postRouter.post(
  "/",
  auth(),
  validateRequest(createPostValidation, "body"),
  createPost,
);
postRouter.get("/", getPost);
postRouter.get("/stats", auth(USER_ROLES.USER), getStatsController);
postRouter.get("/:postId", getPostBuyId);
postRouter.put(
  "/:id",
  auth(USER_ROLES.USER, USER_ROLES.ADMIN),
  validateRequest(updatePostValidation, "body"),
  validateRequest(postParamsValidation, "params"),
  updatePost,
);
postRouter.delete(
  "/:id",
  auth(USER_ROLES.USER, USER_ROLES.ADMIN),
  validateRequest(postParamsValidation, "params"),
  deletePostController,
);

export default postRouter;
