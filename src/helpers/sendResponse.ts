import { Response } from "express";
import { IGenericResponse } from "../types/common";

export const sendResponse = (res: Response, data: IGenericResponse) => {
  res.status(data.status).json(data);
};
