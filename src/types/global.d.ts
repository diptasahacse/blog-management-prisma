import { UserRoleEnum } from "../modules/user/user.type";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRoleEnum;
      };
    }
  }
}
