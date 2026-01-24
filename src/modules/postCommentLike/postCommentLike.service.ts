import { LikeTypeEnum } from "./../like/like.enum";
import { prisma } from "../../lib/prisma";
import {
  ICreatePostCommentLikeResponseType,
  IPostCommentLikeCreatePayload,
} from "./postCommentLike.interface";
import { CustomError } from "../../errors/CustomError";
const create = async (
  data: IPostCommentLikeCreatePayload,
): Promise<ICreatePostCommentLikeResponseType> => {
  try {
    const { post_comment_id, user_id, type, post_id } = data;
    const returnData: ICreatePostCommentLikeResponseType = {
      changeReaction: false,
      unlike: false,
      newReaction: false,
      sameReaction: false,
    };

    const existData = await prisma.postCommentLike.findFirst({
      where: {
        post_id: post_id,
        post_comment_id: post_comment_id,
        user_id: user_id,
      },
    });
    if (!existData && !type) {
      throw new CustomError("Like type is required for new like", 400);
    }

    // If existData exist and type is not provided, then we delete the like
    if (existData && !type) {
      await prisma.postCommentLike.delete({
        where: {
          id: existData.id,
        },
      });
      returnData.unlike = true;
    }

    if (existData && type && existData.type === type) {
      returnData.sameReaction = true;
    }
    if (existData && type && existData.type !== type) {
      await prisma.postCommentLike.update({
        where: {
          id: existData.id,
        },
        data: {
          type: type as LikeTypeEnum,
        },
      });
      returnData.changeReaction = true;
    }
    if (!existData && type) {
      await prisma.postCommentLike.create({
        data: {
          post_id: post_id,
          post_comment_id: post_comment_id,
          user_id: user_id,
          type: type as LikeTypeEnum,
        },
      });
      returnData.newReaction = true;
    }

    return returnData;
  } catch (error) {
    throw error;
  }
};

const postCommentLikeService = {
  create,
};
export default postCommentLikeService;
