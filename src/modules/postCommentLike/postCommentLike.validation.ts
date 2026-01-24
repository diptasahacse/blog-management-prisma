import z from "zod";
import { prisma } from "../../lib/prisma";
import { PostStatus } from "../post/post.enum";
import { LikeType } from "../like/like.enum";
import { PostCommentStatus } from "../postComment/postComment.enum";
const createPostCommentLikeValidation = z
  .object({
    post_id: z.string({
      message: "post_id is required",
    }),
    post_comment_id: z.string({
      message: "post_comment_id is required",
    }),
    type: z.enum(Object.values(LikeType), {
      message: `Invalid like value. Allowed values are: ${Object.values(
        LikeType,
      ).join(", ")}`,
    }).optional(),
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
    // Validate post_comment_id exists
    const postComment = await prisma.postComment.findUnique({
      where: {
        id: data.post_comment_id,
        status: PostCommentStatus.ENABLED,
      },
      select: {
        id: true,
      },
    });
    if (!postComment) {
      ctx.addIssue({
        path: ["post_comment_id"],
        message: "Invalid post_comment_id",
        code: "custom",
      });
    }
  });
const postCommentLikeValidation = {
  createPostCommentLikeValidation,
};
export default postCommentLikeValidation;
