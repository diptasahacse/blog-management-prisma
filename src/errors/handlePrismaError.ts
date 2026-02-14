import { Prisma } from "../../generated/prisma/client";
import { IError } from "../types/common";
export const handlePrismaError = (
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientValidationError,
): IError[] => {
  return [
    {
      message: error.message,
    },
  ];
};

export default handlePrismaError;
