import { ApolloServer } from "@apollo/server";
import { gqlResolvers } from "./graphql.resolvers";
import { gqlTypes } from "./graphql.types";
import { UserRoleEnum } from "../modules/user/user.type";

export interface IGraphQLContext {
  user?: {
    id: string;
    email: string;
    role: UserRoleEnum;
    emailVerified: boolean;
  };
}
const graphqlServer = new ApolloServer<IGraphQLContext>({
  typeDefs: gqlTypes,
  resolvers: {
    ...gqlResolvers,
  },
});
const startGraphQLServer = async () => {
  await graphqlServer.start();
};
export { graphqlServer, startGraphQLServer };
