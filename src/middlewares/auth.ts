import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { UserRoleEnum } from "../modules/user/user.type";
import { sendResponse } from "../helpers/sendResponse";
const auth = (...roles: UserRoleEnum[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await betterAuth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return sendResponse(res, {
        success: false,
        message: "Unauthorized",
        status: 401,
      });
    }
    const { user } = session;
    if (!user.emailVerified) {
      return sendResponse(res, {
        success: false,
        message: "Please verify your email to proceed",
        status: 401,
      });
    }
    if (roles.length && !roles.includes(user.role as UserRoleEnum)) {
      return sendResponse(res, {
        success: false,
        message: "You are not authorized to access this route",
        status: 403,
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as UserRoleEnum,
    };
    next();
  };
};

export default auth;
