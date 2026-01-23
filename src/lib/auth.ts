import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import config from "../config";
import sendEmail from "../helpers/sendEmail";
import { emailVerification } from "../templates/email-verification";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [config.frontend_url],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ token, user }) => {
      await sendEmail({
        to: user.email,
        subject: "Please verify your email",
        html: emailVerification({
          token,
          name: user.name,
        }),
      });
    },
  },
  baseURL: config.better_auth_url,
  socialProviders: {
    google: {
      accessType: "offline",
      prompt: "select_account consent",
      clientId: config.google_client_id,
      clientSecret: config.google_client_secret,
    },
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
    },
  },
});
