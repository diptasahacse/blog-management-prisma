import { AnyZodObject, ZodSchema } from "zod";
import { NextFunction, Router } from "express";
import postController from "./post.controller";
import auth from "../../middlewares/auth";
import postValidation from "./post.validation";

const postRouter = Router();
const { createPost, getPost } = postController;
const { createPostValidation } = postValidation;
const test = () => {
  return async (req, res, next:NextFunction) => {
    await createPostValidation.parseAsync({});
    next();
  };
};

// Define your post routes here
postRouter.post("/", auth(), test(), createPost);
postRouter.get("/", getPost);

export default postRouter;
