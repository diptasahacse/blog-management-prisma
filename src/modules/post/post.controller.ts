import { NextFunction, Request, Response } from "express";
import {
  ICreatePostRequest,
  IUpdatePostParams,
  IUpdatePostRequest,
} from "./post.interface";
import postService from "./post.service";
import { sendResponse } from "../../helpers/sendResponse";
const { create, getPosts, getPostById, update } = postService;
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
      pagination: {
        limit: data.pagination.limit,
        page: data.pagination.page,
        total: data.pagination.total,
      },
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};
const getPostBuyId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "Post id is required",
      });
    }
    const result = await getPostById(postId as string);
    if (!result) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "Post not found",
      });
    }
    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Post successfully retrieved",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params as IUpdatePostParams;
  const { id: userId } = req.user!;
  try {
    const result = await update(id, userId, req.body);
    return sendResponse(res, {
      success: true,
      status: 200,
      message: "Post updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const postController = {
  createPost,
  getPost,
  getPostBuyId,
  updatePost,
};
export default postController;
