import postService from "./post.service";

export const postResolvers = {
  Query: {
    // Post: {
    //   user: async (post: any) => {
    //     return await getPostById(post.id);
    //   },
    // },
    getPosts: async () => {
      return await postService.getPosts();
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
