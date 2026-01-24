import z from "zod";
import { prisma } from "../../lib/prisma";
const createCategoryValidation = z
  .object({
    name: z.string({
      message: "name is required",
    }),
    slug: z
      .string({
        message: "slug is required",
      })
      .min(2, "slug must be at least 2 characters long"),
  })
  .superRefine(async (data, ctx) => {
    const category = await prisma.category.findUnique({
      where: {
        slug: data.slug,
      },
      select: {
        id: true,
      },
    });
    if (category) {
      ctx.addIssue({
        path: ["slug"],
        message: "Invalid slug. slug already exists",
        code: "custom",
      });
    }
  });
const categoryValidation = {
  createCategoryValidation,
};
export default categoryValidation;
