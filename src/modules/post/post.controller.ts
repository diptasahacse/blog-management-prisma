import { NextFunction, Request, Response } from "express";
import { ICreatePostRequest } from "./post.interface";
import postService from "./post.service";
import { sendResponse } from "../../helpers/sendResponse";
const { create, getPosts } = postService;
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
const getPost = async (req: Request, res: Response) => {
  try {
    const data = await getPosts(req.query);
    sendResponse(res, {
      success: true,
      status: 200,
      message: "Posts fetched successfully",
      data: data.data,
      pagination: data.pagination,
      sort: data.sort,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};

const postController = {
  createPost,
  getPost,
};
export default postController;
