import z from "zod";
import { PostStatus } from "./post.enum";
import postService from "./post.service";
import categoryService from "../category/category.service";
import { prisma } from "../../lib/prisma";
const { getPost } = postService;
const { getById } = categoryService;
const createPostValidation = z
  .object({
    title: z.string({
      message: "title is required",
    }),
    content: z.string({ message: "content is required" }),
    categories: z
      .array(z.string())
      .min(1, {
        message: "At least one category is required",
      })
      .optional(),
    tags: z
      .array(z.string())
      .min(1, {
        message: "At least one tag is required",
      })
      .optional(),
    thumbnail: z.string().optional(),
    status: z
      .enum(Object.values(PostStatus), {
        message: `Invalid status value. Allowed values are: ${Object.values(
          PostStatus,
        ).join(", ")}`,
      })
      .optional(),
  })
  .superRefine(async (data, ctx) => {
    // check category id exist on database
    const categories = data.categories;
    const tags = data.tags;
    if (categories) {
      const existCategories = await prisma.category.findMany({
        where: {
          id: {
            in: categories,
          },
        },
      });
      if (existCategories.length !== categories.length) {
        ctx.addIssue({
          path: ["categories"],
          message: "Invalid category id",
          code: "custom",
        });
      }
    }
    if (tags) {
      const existTags = await prisma.tag.findMany({
        where: {
          id: {
            in: tags,
          },
        },
      });
      if (existTags.length !== existTags.length) {
        ctx.addIssue({
          path: ["tags"],
          message: "Invalid tag id",
          code: "custom",
        });
      }
    }
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
const postParamsValidation = z
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
  postParamsValidation,
};
export default postValidation;
