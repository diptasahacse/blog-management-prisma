import { NextFunction, Request, Response } from "express";
import {
  IPostCommentLikeCreatePayload,
  IPostCommentLikeRequest,
} from "./postCommentLike.interface";
import { sendResponse } from "../../helpers/sendResponse";
import postCommentLikeService from "./postCommentLike.service";

const { create } = postCommentLikeService;

const createPostCommentLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { post_id, post_comment_id, type }: IPostCommentLikeRequest =
      req.body;
    const payload: IPostCommentLikeCreatePayload = {
      post_id,
      post_comment_id,
      type,
      user_id: req.user!.id,
    };
    const result = await create(payload);

    if (result.sameReaction || result.newReaction) {
      return sendResponse(res, {
        message: "Post comment like created",
        status: 201,
        success: true,
      });
    }
    if (result.changeReaction) {
      return sendResponse(res, {
        message: "Post comment like updated",
        status: 201,
        success: true,
      });
    }
    if (result.unlike) {
      return sendResponse(res, {
        message: "Disliked the post comment",
        status: 201,
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

const postCommentLikeController = {
  createPostCommentLike,
};

export default postCommentLikeController;
