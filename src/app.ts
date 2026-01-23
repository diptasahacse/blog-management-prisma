import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import config from "./config";
import routes from "./routes";
const app: Application = express();
app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/v1", routes);
app.use(express.json());
export default app;
