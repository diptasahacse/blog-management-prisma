import z from "zod";

import categoryValidation from "./category.validation";
import { IPaginationQuery } from "../../types/pagination";
import { ISortingQuery } from "../../types/sorting";
const { createCategoryValidation } = categoryValidation;
export type ICategoryRequest = z.infer<typeof createCategoryValidation>;
export type ICategoriesQuery = Partial<ICategoryRequest> & {
  id?: string;
  search?: string;
} & IPaginationQuery &
  ISortingQuery;
