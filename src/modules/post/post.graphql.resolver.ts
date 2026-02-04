import postService from "./post.service";

export const postResolvers = {
  Query: {
    // Post: {
    //   user: async (post: any) => {
    //     return await getPostById(post.id);
    //   },
    // },
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
    // getPost: (parent, args) => {
    //   return prisma.post.findUnique({
    //     where: {
    //       id: args.id,
    //     },
    //   });
    // },
  },
};
