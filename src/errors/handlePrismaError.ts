import { Prisma } from "../../generated/prisma/client";
import { IError } from "../types/common";

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
): IError[] => {
  return [];
};

export default handlePrismaError;
