import z from "zod";
import postValidation from "./post.validation";
import { PostStatusEnum } from "./post.enum";
import { IPaginationQuery } from "../../types/pagination";
import { ISortingQuery } from "../../types/sorting";

// add {owner_id: string} to ICreatePost
export type ICreatePostRequest = z.infer<
  typeof postValidation.createPostValidation
>;

export type PostQueryType = {
  search?: string;
  title?: string;
  status?: PostStatusEnum;
  owner_id?: string;
  id?: string;
} & IPaginationQuery &
  ISortingQuery;

export type ICreatePost = ICreatePostRequest & { owner_id: string };
