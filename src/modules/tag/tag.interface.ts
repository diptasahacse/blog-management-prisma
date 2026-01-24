import z from "zod";
import tagValidation from "./tag.validation";
const { createTagValidation } = tagValidation;
export type ITagRequest = z.infer<typeof createTagValidation>;
