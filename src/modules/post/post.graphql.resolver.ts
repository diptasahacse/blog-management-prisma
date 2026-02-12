import postService from "./post.service";
import userService from "../user/user.service";
import { ICreatePostRequest } from "./post.interface";
import { IGraphQLContext } from "../../graphql/graphql.server";
import { validateAuth } from "../../graphql/graphql.auth";
import { Post } from "../../../generated/prisma/client";

export const postResolvers = {
  Post: {
    user: async (post: Post) => {
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
    getPost: (parent: any, args: { id: string }) => {
      return postService.getPostById(args.id);
    },
  },
  Mutation: {
    createPost: async(
      parent: any,
      args: { input: ICreatePostRequest },
      context: IGraphQLContext,
    ) => {
      validateAuth(context);
      return await postService.create({
        ...args.input,
        owner_id: context.user?.id as string,
      });
    },
  },
};
