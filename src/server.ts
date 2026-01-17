import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";
const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
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
