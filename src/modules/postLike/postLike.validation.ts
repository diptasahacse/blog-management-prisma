import z from "zod";
import { prisma } from "../../lib/prisma";
import { PostStatus } from "../post/post.enum";
import { LikeType } from "../like/like.enum";
const createPostLikeValidation = z
  .object({
    post_id: z.string({
      message: "post_id is required",
    }),
    type: z
      .enum(Object.values(LikeType), {
        message: `Invalid like value. Allowed values are: ${Object.values(
          LikeType,
        ).join(", ")}`,
      })
      .optional(),
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
  });
const postLikeValidation = {
  createPostLikeValidation,
};
export default postLikeValidation;
