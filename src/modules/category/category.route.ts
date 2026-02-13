import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import categoryValidation from "./category.validation";
import categoryController from "./category.controller";
const { createCategoryValidation } = categoryValidation;
const { createCategory, getAllCategories } = categoryController;
const categoryRouter = Router();
categoryRouter.post(
  "/",
  auth("ADMIN"),
  validateRequest(createCategoryValidation, "body"),
  createCategory,
);
categoryRouter.get("/", getAllCategories);

export default categoryRouter;
