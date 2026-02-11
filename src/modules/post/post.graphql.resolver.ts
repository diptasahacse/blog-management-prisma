import postService from "./post.service";
import userService from "../user/user.service";

export const postResolvers = {
  Post: {
    user: async (post: any) => {
      return await userService.getUserById(post.owner_id);
    },
  },
  Query: {
    getPosts: async () => {
      const data = await postService.getPosts();
      return data.data;
    },
    getPostPagination: async (
      parent: any,
      args: { page: number; perPage: number },
    ) => {
      const data = await postService.getPosts({
        limit: args.perPage,
        page: args.page,
      });
      return {
        pagination: {
          page: data.pagination.page,
          limit: data.pagination.limit,
          total: data.pagination.total,
        },
        data: data.data,
      };
    },
    getPost: (parent: any, args: any) => {
      return postService.getPostById(args.id);
    },
  },
};
