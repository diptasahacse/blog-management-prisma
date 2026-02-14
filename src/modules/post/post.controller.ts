import { NextFunction, Request, Response } from "express";
import {
  IUpdatePostParams,
} from "./post.interface";
import postService from "./post.service";
import { sendResponse } from "../../helpers/sendResponse";
import { CustomError } from "../../errors/CustomError";
import { USER_ROLES } from "../user/user.type";
const {
  create,
  getPosts,
  getPostById,
  update,
  getPostByIdAndUserId,
  deletePost,
  getStats,
} = postService;
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user!;
  try {
    const result = await create({
      ...req.body,
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

/**
 * 1. Owner can only update own post
 * 2. Admin can update any post
 */

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params as IUpdatePostParams;
  const user = req.user!;
  try {
    if (user.role === USER_ROLES.USER) {
      const post = await getPostByIdAndUserId(id, user.id);
      if (!post) {
        throw new CustomError("You are not the owner of this post", 404);
      }
    }
    const result = await update(id, req.body);
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

/**
 * 1. Owner can only delete own post
 * 2. Admin can delete any post
 */

const deletePostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params as IUpdatePostParams;
  const user = req.user!;
  try {
    if (user.role === USER_ROLES.USER) {
      const post = await getPostByIdAndUserId(id, user.id);
      if (!post) {
        throw new CustomError("You are not the owner of this post", 404);
      }
    }
    await deletePost(id);
    return sendResponse(res, {
      success: true,
      status: 200,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getStats();
    return sendResponse(res, {
      success: true,
      status: 200,
      data: data,
      message: "Post deleted successfully",
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
  deletePostController,
  getStatsController,
};
export default postController;
