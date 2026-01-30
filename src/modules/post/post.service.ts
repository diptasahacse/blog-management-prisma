import { PostWhereInput } from "../../../generated/prisma/models";
import handlePagination from "../../helpers/pagination";
import handleSorting from "../../helpers/sorting";
import { prisma } from "../../lib/prisma";
import { PostSortFieldEnum, PostSortFields, PostStatus } from "./post.enum";
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
const getPosts = async (query: PostQueryType) => {
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
  } = query;
  const { skip, take } = handlePagination({
    limit,
    page,
  });

  //  Sorting
  const sortData = handleSorting({
    allowedFields: Object.values(PostSortFields),
    defaultSortBy: PostSortFields.CREATED_AT,
    sort_by,
    sort_order,
  });

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

  return await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
    include: {
      postComments: true,
      categories: true,
    },
    orderBy: {
      [sortData.sort_by]: sortData.sort_order,
    },
    take,
    skip,
  });
};
const postService = {
  create,
  getPosts,
};
export default postService;
