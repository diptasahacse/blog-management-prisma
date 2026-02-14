import { PostWhereInput } from "../../../generated/prisma/models";
import { paginationSortingHelper } from "../../helpers/paginationSortingHelper";
import { prisma } from "../../lib/prisma";
import { SortOrder } from "../../types/sorting";
import { PostCommentStatus } from "../postComment/postComment.enum";
import { USER_ROLES } from "../user/user.type";
import { PostSortFields, PostStatus } from "./post.enum";
import { ICreatePost, IUpdatePost, PostQueryType } from "./post.interface";

const create = async (data: ICreatePost) => {
  const { content, title, thumbnail, status, owner_id, categories, tags } =
    data;
  try {
    const res = await prisma.post.create({
      data: {
        content,
        title,
        ...(thumbnail ? { thumbnail } : {}),
        ...(status ? { status } : {}),
        owner_id,
        ...(categories && categories?.length > 0
          ? {
              categories: {
                create: (categories || []).map((category) => ({
                  category_id: category,
                })),
              },
            }
          : {}),
        ...(tags && tags?.length > 0
          ? {
              tags: {
                create: (tags || []).map((tag) => ({
                  tag_id: tag,
                })),
              },
            }
          : {}),
      },
      include: {
        categories: true,
        postTags: true,
      },
    });

    return res;
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

  return {
    data: await prisma.post.findMany({
      where: {
        AND: andConditions,
      },
      include: {
        postComments: {
          where: {
            parent_id: null,
            status: PostCommentStatus.ENABLED,
          },
          orderBy: {
            created_at: SortOrder.DESC,
          },
          include: {
            replies: {
              where: {
                status: PostCommentStatus.ENABLED,
              },
            },
            _count: {
              select: {
                replies: true,
              },
            },
          },
        },
        categories: true,
        postTags: true,
        _count: {
          select: {
            postComments: true,
            categories: true,
          },
        },
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
  };
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
            increment: 1,
          },
        },
        include: {
          postComments: {
            include: {
              replies: true,
            },
          },
        },
      });
    }
    return null;
  } catch (error) {
    throw new Error("Failed");
  }
};
const getPost = async (id: string) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error("Failed");
  }
};
const getPostByIdAndUserId = async (id: string, userID: string) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id,
        owner_id: userID,
      },
    });
  } catch (error) {
    throw new Error("Failed");
  }
};

const update = async (id: string, data: IUpdatePost) => {
  try {
    const { content, status, thumbnail, title } = data;
    const updateData: IUpdatePost = {};
    if (title) {
      updateData.title = title;
    }
    if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }
    if (status) {
      updateData.status = status;
    }
    if (content) {
      updateData.content = content;
    }

    if (Object.entries(updateData).length > 0) {
      return await prisma.post.update({
        where: {
          id: id,
        },
        data: updateData as any,
      });
    }
    return null;
  } catch (error) {
    throw new Error("Failed");
  }
};

const deletePost = async (id: string) => {
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return null;
  } catch (error) {
    throw error;
  }
};

const getStats = async () => {
  try {
    // Post count, published post, draft posts,total comments, total views
    return await prisma.$transaction(async (tnx) => {
      const [
        totalPost,
        totalPublishedPost,
        totalDraftPost,
        totalComment,
        totalViews,
        totalAdmin,
        totalUser,
      ] = await Promise.all([
        await tnx.post.count(),
        await tnx.post.count({
          where: {
            status: PostStatus.PUBLISHED,
          },
        }),
        await tnx.post.count({
          where: {
            status: PostStatus.DRAFT,
          },
        }),
        await tnx.postComment.count(),
        await tnx.post.aggregate({
          _sum: {
            views: true,
          },
        }),
        await tnx.user.count({
          where: {
            role: USER_ROLES.ADMIN,
          },
        }),
        await tnx.user.count({
          where: {
            role: USER_ROLES.USER,
          },
        }),
      ]);

      return {
        totalPost,
        totalPublishedPost,
        totalDraftPost,
        totalComment,
        totalViews: totalViews._sum.views,
        totalAdmin,
        totalUser,
      };
    });
  } catch (error) {
    throw error;
  }
};

const postService = {
  create,
  getPosts,
  getPostById,
  update,
  getPost,
  getPostByIdAndUserId,
  deletePost,
  getStats,
};
export default postService;
