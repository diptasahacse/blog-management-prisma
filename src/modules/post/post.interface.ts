import z from "zod";
import postValidation from "./post.validation";
export const PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;
export type PostStatusEnum = (typeof PostStatus)[keyof typeof PostStatus];

// add {owner_id: string} to ICreatePost
export type ICreatePostRequest = z.infer<
  typeof postValidation.createPostValidation
>;

export type ICreatePost = ICreatePostRequest & { owner_id: string };
