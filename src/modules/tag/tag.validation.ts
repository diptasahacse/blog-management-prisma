import z from "zod";
import { prisma } from "../../lib/prisma";
const createTagValidation = z
  .object({
    name: z
      .string({
        message: "name is required",
      })
      .min(2, "name must be at least 2 characters long"),
  })
  .superRefine(async (data, ctx) => {
    const tag = await prisma.tag.findUnique({
      where: {
        name: data.name,
      },
      select: {
        id: true,
      },
    });
    if (tag) {
      ctx.addIssue({
        path: ["name"],
        message: "Invalid name. name already exists",
        code: "custom",
      });
    }
  });
const tagValidation = {
  createTagValidation,
};
export default tagValidation;
