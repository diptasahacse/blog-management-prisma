import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import config from "./config";
import routes from "./routes/v1";
import { sendResponse } from "./helpers/sendResponse";
import globalErrorHandler from "./middlewares/globalErrorHandler";
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
