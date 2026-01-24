import z from "zod";
import { ICommonUserIdPayload } from "../user/user.interface";
import postLikeValidation from "./postLike.validation";
const { createPostLikeValidation } = postLikeValidation;

export type IPostLikeRequest = z.infer<typeof createPostLikeValidation>;
export type IPostLikeCreatePayload = IPostLikeRequest & ICommonUserIdPayload;

export interface ICreatePostLikeResponseType {
  changeReaction: boolean;
  unlike: boolean;
  newReaction: boolean;
  sameReaction: boolean;
}
