import z from "zod";

const createPostValidation = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
});

const postValidation = {
  createPostValidation,
};
export default postValidation;
