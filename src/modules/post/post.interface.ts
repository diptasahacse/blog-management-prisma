import z from "zod";
import postValidation from "./post.validation";

// add {owner_id: string} to ICreatePost
export type ICreatePostRequest = z.infer<
  typeof postValidation.createPostValidation
>;

export type ICreatePost = ICreatePostRequest & { owner_id: string };
