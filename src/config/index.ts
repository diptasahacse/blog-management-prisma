import dotenv from "dotenv";
dotenv.config();

const config = {
  port: Number(process.env.PORT) ?? 8000,
  database_url: process.env.DATABASE_URL!,
};
export default config;
