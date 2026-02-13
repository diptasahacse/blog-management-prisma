import z from "zod";
import { prisma } from "../../lib/prisma";
import { PostCommentStatus } from "./postComment.enum";
import { PostStatus } from "../post/post.enum";
import postCommentService from "./postComment.service";
const createPostCommentValidation = z
  .object({
    post_id: z.string({
      message: "post_id is required",
    }),
    comment: z
      .string({
        message: "comment is required",
      })
      .min(2, "comment must be at least 2 characters long"),
    parent_id: z.string().optional(),
  })
  .superRefine(async (data, ctx) => {
    // Validate post_id exists
    const post = await prisma.post.findUnique({
      where: {
        id: data.post_id,
        status: PostStatus.PUBLISHED,
      },
      select: {
        id: true,
      },
    });
    if (!post) {
      ctx.addIssue({
        path: ["post_id"],
        message: "Invalid post_id",
        code: "custom",
      });
    }
    // Validate parent_id exists if provided
    if (data.parent_id) {
      const postComment = await prisma.postComment.findUnique({
        where: {
          id: data.parent_id,
          status: PostCommentStatus.ENABLED,
        },
        select: {
          id: true,
        },
      });
      if (!postComment) {
        ctx.addIssue({
          path: ["parent_id"],
          message: "Invalid parent_id",
          code: "custom",
        });
      }
    }
  });
const commentParamsValidation = z
  .object({
    id: z.string({
      message: "comment id is required",
    }),
  })
  .superRefine(async (data, ctx) => {
    // Validate comment id exists
    const comment = await postCommentService.getById(data.id);
    if (!comment) {
      ctx.addIssue({
        path: ["id"],
        message: "Invalid comment id",
        code: "custom",
      });
    }
  });
const postCommentValidation = {
  createPostCommentValidation,
  commentParamsValidation
};
export default postCommentValidation;
