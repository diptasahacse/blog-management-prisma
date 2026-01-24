import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/sendResponse";
import { IGenericResponse } from "../types/common";
import { ZodError } from "zod";
import handleZodValidationError from "../errors/handleZodValidationError";
import config from "../config";
import { CustomError } from "../errors/CustomError";

const globalErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response: IGenericResponse = {
    success: false,
    message: err.message || "Internal Server Error",
    status: 500,
    ...(config.is_production && err.stack ? {} : { stack: err.stack }),
  };
  if (err instanceof ZodError) {
    const zodErrors = handleZodValidationError(err);
    if (zodErrors.length) {
      response.message = "Validation Error";
      response.status = 400;
      response.errors = zodErrors;
    }
  }
  if (err instanceof CustomError) {
    response.status = err.code;
    response.message = err.message;
  }

  return sendResponse(res, response);
};

export default globalErrorHandler;
