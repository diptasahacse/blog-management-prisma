import { Router } from "express";
import postController from "./post.controller";
import auth from "../../middlewares/auth";

const postRouter = Router();
const { createPost, getPost } = postController;
// Define your post routes here
postRouter.post("/", auth(), createPost);
postRouter.get("/", getPost);

export default postRouter;
