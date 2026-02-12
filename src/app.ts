import express, { Application, Request, Response } from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import config from "./config";
import routes from "./routes/v1";
import { sendResponse } from "./helpers/sendResponse";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { expressMiddleware } from "@as-integrations/express5";
import { graphqlServer } from "./graphql/graphql.server";
import { auth as betterAuth } from "./lib/auth";
const app: Application = express();
app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

// All API Routes
app.get("/", (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    message: "Welcome to Blog Application",
    status: 200,
  });
});
await graphqlServer.start();
app.use(
  "/graphql",
  expressMiddleware(graphqlServer, {
    context: async ({ req }) => {
      const session = await betterAuth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      return {
        user: session?.user,
      };
    },
  }),
);
app.use("/api/v1", routes);

// Global Error Handling Middleware
app.use(globalErrorHandler);

//  Not Found Middleware
app.use((req: Request, res: Response) => {
  sendResponse(res, {
    success: false,
    message: "Not Found",
    status: 404,
  });
});

export default app;
