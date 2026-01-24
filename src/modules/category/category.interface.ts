import z from "zod";

import categoryValidation from "./category.validation";
const { createCategoryValidation } = categoryValidation;
export type ICategoryRequest = z.infer<typeof createCategoryValidation>;
