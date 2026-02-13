import z from "zod";
import postCommentValidation from "./postComment.validation";
import { ICommonUserIdPayload } from "../user/user.interface";
import { IPaginationQuery } from "../../types/pagination";
import { ISortingQuery } from "../../types/sorting";
const { createPostCommentValidation, updatePostCommentValidation } =
  postCommentValidation;

export type IPostCommentRequest = z.infer<typeof createPostCommentValidation>;
export type IUpdateCommentRequest = z.infer<typeof updatePostCommentValidation>;
export type IPostCommentCreatePayload = IPostCommentRequest &
  ICommonUserIdPayload;

export type IPostCommentQuery = {
  id?: string;
  comment?: string;
  user_id?: string;
} & IPaginationQuery &
  ISortingQuery;
