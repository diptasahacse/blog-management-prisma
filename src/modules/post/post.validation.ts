import z from "zod";
import { PostStatus } from "./post.enum";
import postService from "./post.service";
const { getPost } = postService;
const createPostValidation = z.object({
  title: z.string({
    message: "title is required",
  }),
  content: z.string({ message: "content is required" }),
  thumbnail: z.string().optional(),
  status: z
    .enum(Object.values(PostStatus), {
      message: `Invalid status value. Allowed values are: ${Object.values(
        PostStatus,
      ).join(", ")}`,
    })
    .optional(),
});
const updatePostValidation = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
  status: z
    .enum(Object.values(PostStatus), {
      message: `Invalid status value. Allowed values are: ${Object.values(
        PostStatus,
      ).join(", ")}`,
    })
    .optional(),
});
const updatePostParamsValidation = z
  .object({
    id: z.string({
      message: "id is required",
    }),
  })
  .superRefine(async (data, ctx) => {
    const { id } = data;
    const post = await getPost(id);
    if (!post) {
      ctx.addIssue({
        code: "custom",
        message: "Post not found",
      });
    }
  });
const postValidation = {
  createPostValidation,
  updatePostValidation,
  updatePostParamsValidation,
};
export default postValidation;
