import { NextFunction, Request, Response } from "express";
import {
  IPostLikeCreatePayload,
  IPostLikeRequest,
} from "./postLike.interface";
import { sendResponse } from "../../helpers/sendResponse";
import postLikeService from "./postLike.service";

const { create } = postLikeService;

const createPostLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { post_id, type }: IPostLikeRequest = req.body;
    const payload: IPostLikeCreatePayload = {
      post_id,
      type,
      user_id: req.user!.id,
    };
    const result = await create(payload);

    if (result.sameReaction || result.newReaction) {
      return sendResponse(res, {
        message: "Post like created",
        status: 201,
        success: true,
      });
    }
    if (result.changeReaction) {
      return sendResponse(res, {
        message: "Post like updated",
        status: 201,
        success: true,
      });
    }
    if (result.unlike) {
      return sendResponse(res, {
        message: "Disliked the post",
        status: 201,
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

const postLikeController = {
  createPostLike,
};

export default postLikeController;
