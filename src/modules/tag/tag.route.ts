import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import tagValidation from "./tag.validation";
import categoryController from "./tag.controller";
const { createTagValidation } = tagValidation;
const { createTag } = categoryController;
const tagRouter = Router();
tagRouter.post(
  "/",
  auth("ADMIN"),
  validateRequest(createTagValidation, "body"),
  createTag,
);

export default tagRouter;
