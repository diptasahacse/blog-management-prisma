import z from "zod";
import postCommentValidation from "./postCommentLike.validation";
import { ICommonUserIdPayload } from "../user/user.interface";
import postCommentLikeValidation from "./postCommentLike.validation";
const { createPostCommentLikeValidation } = postCommentLikeValidation;

export type IPostCommentLikeRequest = z.infer<
  typeof createPostCommentLikeValidation
>;
export type IPostCommentLikeCreatePayload = IPostCommentLikeRequest &
  ICommonUserIdPayload;

export interface ICreatePostCommentLikeResponseType {
  changeReaction: boolean;
  unlike: boolean;
  newReaction: boolean;
  sameReaction: boolean;
}
