import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/sendResponse";
import { IGenericResponse } from "../types/common";
import { ZodError } from "zod";
import handleZodValidationError from "../errors/handleZodValidationError";
import config from "../config";
import { CustomError } from "../errors/CustomError";
import { Prisma } from "../../generated/prisma/client";
import handlePostgresError from "../errors/handlePostgresError";
import handlePrismaError from "../errors/handlePrismaError";
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
    ...(config.is_production ? {} : { errorDetails: err }),
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
  //  Handle postgres error
  const isPostgresError = (err as any).cause?.kind === "postgres";
  if (isPostgresError) {
    const postgresErrors = handlePostgresError(err);
    if (postgresErrors.length) {
      response.message = "Conflict Error";
      response.status = 409;
      response.errors = postgresErrors;
    }
  }

  //  Handle Prisma Client Errors
  const isPrismaError =
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientValidationError;

  if (isPrismaError) {
    const prismaErrors = handlePrismaError(err);
    if (prismaErrors.length) {
      response.message = "Database Error";
      response.status = 500;
      response.errors = prismaErrors;
    }
  }

  return sendResponse(res, response);
};

export default globalErrorHandler;
