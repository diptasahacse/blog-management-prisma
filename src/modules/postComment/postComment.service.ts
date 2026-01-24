import { prisma } from "../../lib/prisma";
import { IPostCommentCreatePayload } from "./postComment.interface";

const getById = async (id: string) => {
  try {
    return await prisma.postComment.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

const create = async (data: IPostCommentCreatePayload) => {
  try {
    const { comment, post_id, user_id, parent_id } = data;
    return prisma.postComment.create({
      data: {
        comment,
        post_id,
        user_id,
        ...(parent_id && { parent_id }),
      },
    });
  } catch (error) {
    throw error;
  }
};

const postCommentService = {
  create,
  getById,
};
export default postCommentService;
