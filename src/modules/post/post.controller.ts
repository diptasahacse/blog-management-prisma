import { Request, Response } from "express";

const createPost = (req: Request, res: Response) => {

  res.status(201).json({ message: "Post created successfully" });
};
const getPost = (req: Request, res: Response) => {

  res.status(201).json({ message: "Post created successfully" });
};

const postController = {
  createPost,
  getPost
};
export default postController;
