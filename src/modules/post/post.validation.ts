import z from "zod";
import { PostStatus } from "./post.interface";

const createPostValidation = z.object({
  title: z.string({
    message: "title is required",
  }),
  content: z.string({ message: "content is required" }),
  thumbnail: z.string().optional(),
  status: z
    .enum(Object.values(PostStatus), {
      message: `Invalid status value. Allowed values are: ${Object.values(PostStatus).join(
        ", "
      )}`,
    })
    .optional(),
});

const postValidation = {
  createPostValidation,
};
export default postValidation;
