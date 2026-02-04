import { PostWhereInput } from "../../../generated/prisma/models";
import { paginationSortingHelper } from "../../helpers/paginationSortingHelper";
import { prisma } from "../../lib/prisma";
import { PostSortFields, PostStatus } from "./post.enum";
import { ICreatePost, PostQueryType } from "./post.interface";

const create = async (data: ICreatePost) => {
  const { content, title, thumbnail, status, owner_id } = data;
  try {
    return await prisma.post.create({
      data: {
        content,
        title,
        ...(thumbnail ? { thumbnail } : {}),
        ...(status ? { status } : {}),
        owner_id,
      },
    });
  } catch (error) {
    throw error;
  }
};
const getPosts = async (query?: PostQueryType) => {
  const {
    search,
    title,
    status,
    owner_id,
    id,
    limit,
    page,
    sort_by,
    sort_order,
  } = query || {};
  const andConditions: PostWhereInput[] = [];

  // Search
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          postComments: {
            some: {
              comment: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    });
  }

  // Title search
  if (title) {
    andConditions.push({
      title: {
        contains: title as string,
        mode: "insensitive",
      },
    });
  }
  // status
  if (status && Object.values(PostStatus).includes(status)) {
    andConditions.push({
      status,
    });
  }

  //  Owner id
  if (owner_id) {
    andConditions.push({
      owner_id: {
        contains: owner_id,
        mode: "insensitive",
      },
    });
  }

  //  id
  if (id) {
    andConditions.push({
      id: {
        contains: id,
        mode: "insensitive",
      },
    });
  }
  const total = await prisma.post.count({
    where: {
      AND: andConditions,
    },
  });

  const paginationSortData = paginationSortingHelper({
    allowedFields: Object.values(PostSortFields),
    defaultSortBy: PostSortFields.CREATED_AT,
    sort_by,
    sort_order,
    limit,
    page,
  });

  return ({
    data: await prisma.post.findMany({
      where: {
        AND: andConditions,
      },
      include: {
        postComments: true,
        categories: true,
      },
      orderBy: {
        [paginationSortData.sort_by]: paginationSortData.sort_order,
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
  }).data;
};
const getPostById = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (post) {
      return await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          views: {
            increment: 1
          }
        },
      });
    }
    return null;
  } catch (error) {
    throw new Error("Failed");
  }
};
const postService = {
  create,
  getPosts,
  getPostById,
};
export default postService;
