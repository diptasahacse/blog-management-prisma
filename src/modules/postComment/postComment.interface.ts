import z from "zod";
import postCommentValidation from "./postComment.validation";
import { ICommonUserIdPayload } from "../user/user.interface";
const { createPostCommentValidation } = postCommentValidation;


export type IPostCommentRequest = z.infer<typeof createPostCommentValidation>;
export type IPostCommentCreatePayload = IPostCommentRequest &
  ICommonUserIdPayload;

