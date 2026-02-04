import app from "./app";
import config from "./config";
import { startGraphQLServer, graphqlServer } from "./graphql/graphql.server";
import { prisma } from "./lib/prisma";
import { expressMiddleware } from "@as-integrations/express5";
("./graphql/graphql.server");
const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    await startGraphQLServer();

    app.use("/graphql", expressMiddleware(graphqlServer));

    // Listen
    app.listen(config.port, () => {
      console.log(`Server is running on ${config.port}`);
    });
  } catch (error) {
    console.error("An error occurred while starting the server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
