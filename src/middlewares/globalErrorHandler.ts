import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/sendResponse";
import { IGenericResponse } from "../types/common";
import { ZodError } from "zod";
import handleZodValidationError from "../errors/handleZodValidationError";

const globalErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response: IGenericResponse = {
    success: false,
    message: "Internal Server Error",
    status: 500,
  };
  if (err instanceof ZodError) {
    const zodErrors = handleZodValidationError(err);
    if (zodErrors.length) {
      response.message = "Validation Error";
      response.status = 400;
      response.errors = zodErrors;
    }
  }

  return sendResponse(res, response);
};

export default globalErrorHandler;
