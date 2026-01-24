import { NextFunction, Request, Response } from "express";
import { ITagRequest } from "./tag.interface";
import { sendResponse } from "../../helpers/sendResponse";
import categoryService from "./tag.service";
import tagService from "./tag.service";

const { create } = tagService;
const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name }: ITagRequest = req.body;
    const payload: ITagRequest = {
      name,
    };
    const result = await create(payload);

    sendResponse(res, {
      message: "Tag created",
      status: 201,
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const tagController = {
  createTag,
};

export default tagController;
