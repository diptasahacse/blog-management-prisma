import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest = (
  schema: ZodObject,
  mode: "body" | "query" | "params",
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (mode === "body") {
        await schema.parseAsync(req.body);
      } else if (mode === "query") {
        await schema.parseAsync(req.query);
      } else if (mode === "params") {
        await schema.parseAsync(req.params);
      }
      next();
    } catch (error) {
      throw error;
    }
  };
};

export default validateRequest;
