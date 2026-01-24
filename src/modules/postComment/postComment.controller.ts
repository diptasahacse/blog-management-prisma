import { NextFunction, Request, Response } from "express";
import { IPostCommentRequest } from "./postComment.interface";
import postCommentService from "./postComment.service";
import { sendResponse } from "../../helpers/sendResponse";

const { create } = postCommentService;

const createPostComment = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment, post_id, parent_id }: IPostCommentRequest = req.body;
    console.log(comment, post_id, parent_id);
    sendResponse(res, {
      message: "Post comment created",
      status: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const postCommentController = {
  createPostComment,
};

export default postCommentController;
