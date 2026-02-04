import { ApolloServer } from "@apollo/server";
import { gqlResolvers } from "./graphql.resolvers";
import { gqlTypes } from "./graphql.types";
import { startStandaloneServer } from "@apollo/server/standalone";
import config from "../config";
const graphqlServer = new ApolloServer({
  typeDefs: gqlTypes,
  resolvers: {
    ...gqlResolvers,
  },
});
const startGraphQLServer = async () => {
  const { url } = await startStandaloneServer(graphqlServer, {
    listen: { port: config.graphQL_port },
  });
  console.log(`GraphQL server ready at ${url}`);
};
export { graphqlServer, startGraphQLServer };
