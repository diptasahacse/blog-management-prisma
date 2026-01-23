import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware");
    const session = await betterAuth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(session);
    next();
  };
};

export default auth;
