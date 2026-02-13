import { PostCommentWhereInput } from "../../../generated/prisma/models";
import { paginationSortingHelper } from "../../helpers/paginationSortingHelper";
import { prisma } from "../../lib/prisma";
import { CommonSortFields } from "../../types/sorting";
import {
  IPostCommentCreatePayload,
  IPostCommentQuery,
} from "./postComment.interface";

const getComments = async ({
  comment,
  user_id,
  id,
  limit,
  page,
  sort_by,
  sort_order,
}: IPostCommentQuery) => {
  const andCondition: PostCommentWhereInput[] = [];
  if (comment) {
    andCondition.push({
      comment: {
        contains: comment,
        mode: "insensitive",
      },
    });
  }

  if (id) {
    andCondition.push({
      id: {
        contains: id,
      },
    });
  }

  if (user_id) {
    andCondition.push({
      user_id: {
        contains: user_id,
      },
    });
  }
  const total = await prisma.postComment.count({
    where: {
      AND: andCondition,
    },
  });

  const paginationSortData = paginationSortingHelper({
    allowedFields: Object.values(CommonSortFields),
    defaultSortBy: CommonSortFields.CREATED_AT,
    sort_by,
    sort_order,
    limit,
    page,
  });

  try {
    return {
      data: await prisma.postComment.findMany({
        where: {
          AND: andCondition,
        },
        take: paginationSortData.take,
        skip: paginationSortData.skip,
      }),
      pagination: {
        total: total,
        limit: paginationSortData.take,
        page: paginationSortData.page,
      },
      sort: {
        sort_by: paginationSortData.sort_by,
        sort_order: paginationSortData.sort_order,
      },
    };
  } catch (error) {
    throw error;
  }
};

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

const deleteComment = async (id: string) => {
  try {
    await prisma.postComment.delete({
      where: {
        id: id,
      },
    });
    return null;
  } catch (error) {
    throw error;
  }
};

const postCommentService = {
  create,
  getById,
  getComments,
  deleteComment,
};
export default postCommentService;
