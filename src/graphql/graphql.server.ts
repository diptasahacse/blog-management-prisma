import { ApolloServer } from "@apollo/server";
import { gqlResolvers } from "./graphql.resolvers";
import { gqlTypes } from "./graphql.types";
import { startStandaloneServer } from "@apollo/server/standalone";
import config from "../config";
import { UserRoleEnum } from "../modules/user/user.type";
import { auth as betterAuth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

interface IGraphQLContext {
  user?: {
    id: string;
    email: string;
    role: UserRoleEnum;
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

  // const { url } = await startStandaloneServer(graphqlServer, {
  //   listen: { port: config.graphQL_port },
  //   context: async ({ req }) => {
  //     const session = await betterAuth.api.getSession({
  //       headers: fromNodeHeaders(req.headers),
  //     });
  //     return {
  //       user: session?.user,
  //     };
  //   },
  // });
  // console.log(`GraphQL server ready at ${url}`);
};
export { graphqlServer, startGraphQLServer };
