import dotenv from "dotenv";
dotenv.config();

const config = {
  is_production: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) ?? 8000,
  graphQL_port:  4000,
  database_url: process.env.DATABASE_URL!,
  frontend_url: process.env.FRONTEND_URL!,
  better_auth_url: process.env.BETTER_AUTH_URL!,
  better_auth_secret: process.env.BETTER_AUTH_SECRET!,
  mail_smtp_host: process.env.MAIL_SMTP_HOST!,
  mail_app_user: process.env.MAIL_APP_USER!,
  mail_port: process.env.MAIL_PORT!,
  mail_app_password: process.env.MAIL_APP_PASSWORD!,
  app_logo: 'https://yourdomain.com/logo.png',
  app_name: 'Prisma Blog',
  google_client_id: process.env.GOOGLE_CLIENT_ID!,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  
};
export default config;
