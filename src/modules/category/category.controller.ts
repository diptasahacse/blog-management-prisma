import { NextFunction, Request, Response } from "express";
import { ICategoryRequest } from "./category.interface";
import { sendResponse } from "../../helpers/sendResponse";
import categoryService from "./category.service";

const { create, getCategories } = categoryService;
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, slug }: ICategoryRequest = req.body;
    const payload: ICategoryRequest = {
      name,
      slug,
    };
    const result = await create(payload);

    sendResponse(res, {
      message: "Category created",
      status: 201,
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getCategories(req.query);

    sendResponse(res, {
      message: "Categories fetched",
      status: 201,
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const categoryController = {
  createCategory,
  getAllCategories
};

export default categoryController;
