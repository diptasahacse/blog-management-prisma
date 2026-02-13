import { NextFunction, Request, Response } from "express";
import {
  IPostCommentCreatePayload,
  IPostCommentRequest,
} from "./postComment.interface";
import postCommentService from "./postComment.service";
import { sendResponse } from "../../helpers/sendResponse";

const { create, getById } = postCommentService;

const createPostComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { comment, post_id, parent_id }: IPostCommentRequest = req.body;
    const payload: IPostCommentCreatePayload = {
      comment,
      post_id,
      user_id: req.user!.id,
      parent_id,
    };
    const result = await create(payload);
    sendResponse(res, {
      message: "Post comment created",
      status: 201,
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await getById(id as string);
    sendResponse(res, {
      message: "Post comment fetched",
      status: 200,
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const postCommentController = {
  createPostComment,
  getCommentById,
};

export default postCommentController;
