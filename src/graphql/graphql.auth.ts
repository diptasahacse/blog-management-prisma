import { GraphQLError } from "graphql/error";
import { UserRoleEnum } from "../modules/user/user.type";
import { IGraphQLContext } from "./graphql.server";

export const validateAuth = (
  context: IGraphQLContext,
  roles?: UserRoleEnum[],
) => {
  if (!context.user) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
  if (context.user.emailVerified === false) {
    throw new GraphQLError("Please verify your email to proceed", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
  if (
    roles &&
    roles.length > 0 &&
    !roles.includes(context.user.role as UserRoleEnum)
  ) {
    throw new GraphQLError("Forbidden", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }
};
