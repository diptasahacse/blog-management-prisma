import { Router } from "express";
import postController from "./post.controller";
import auth from "../../middlewares/auth";
import postValidation from "./post.validation";
import validateRequest from "../../middlewares/validateRequest";

const postRouter = Router();
const { createPost, getPost } = postController;
const { createPostValidation } = postValidation;

// Define your post routes here
postRouter.post(
  "/",
  auth(),
  validateRequest(createPostValidation, "body"),
  createPost,
);
postRouter.get("/", auth(), getPost);

export default postRouter;
