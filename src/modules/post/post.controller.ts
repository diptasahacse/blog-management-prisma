import { NextFunction, Request, Response } from "express";
import { ICreatePost, ICreatePostRequest } from "./post.interface";
import postService from "./post.service";
import { sendResponse } from "../../helpers/sendResponse";
const { create } = postService;
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { content, title, thumbnail, status }: ICreatePostRequest = req.body;
  const { id } = req.user!;
  try {
    const result = await create({
      content,
      title,
      thumbnail,
      status,
      owner_id: id,
    });
    return sendResponse(res, {
      success: true,
      status: 201,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getPost = (req: Request, res: Response) => {
  res.status(201).json({ message: "Post created successfully" });
};

const postController = {
  createPost,
  getPost,
};
export default postController;
