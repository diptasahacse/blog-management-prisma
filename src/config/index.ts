import dotenv from "dotenv";
dotenv.config();

const config = {
  port: Number(process.env.PORT) ?? 8000,
  database_url: process.env.DATABASE_URL!,
  frontend_url: process.env.FRONTEND_URL!,
  mail_smtp_host: process.env.MAIL_SMTP_HOST!,
  mail_app_user: process.env.MAIL_APP_USER!,
  mail_port: process.env.MAIL_PORT!,
  mail_app_password: process.env.MAIL_APP_PASSWORD!,
  app_logo: 'https://yourdomain.com/logo.png',
  app_name: 'Prisma Blog',
};
export default config;
