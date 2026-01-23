import { Request, Response } from "express";
import { ICreatePost } from "./post.interface";

const createPost = (req: Request, res: Response) => {
  const {}: ICreatePost = req.body;

  res.status(201).json({ message: "Post created successfully" });
};
const getPost = (req: Request, res: Response) => {
  res.status(201).json({ message: "Post created successfully" });
};

const postController = {
  createPost,
  getPost,
};
export default postController;
