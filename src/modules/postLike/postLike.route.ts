import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import postLikeValidation from "./postLike.validation";
import postLikeController from "./postLike.controller";
const postLikeRouter = Router();
const { createPostLikeValidation } = postLikeValidation;
const { createPostLike } = postLikeController;
postLikeRouter.post(
  "/",
  auth("USER"),
  validateRequest(createPostLikeValidation, "body"),
  createPostLike,
);

export default postLikeRouter;
