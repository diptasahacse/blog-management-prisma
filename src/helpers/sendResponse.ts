import { Response } from "express";
import { IGenericResponse } from "../types/common";

export const sendResponse = <T = null>(res: Response, data: IGenericResponse<T>) => {
  res.status(data.status).json(data);
};
