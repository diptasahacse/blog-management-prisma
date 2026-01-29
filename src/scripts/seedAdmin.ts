import { User } from "../../generated/prisma/client";
import config from "../config";
import { prisma } from "../lib/prisma";
import { USER_ROLES } from "../modules/user/user.type";

const seedAdmin = async () => {
  try {
    const adminUserData = {
      name: "Admin User",
      email: "admin1@blogapp.com",
      password: "admin12356789",
    };

    const existUser = await prisma.user.findUnique({
      where: {
        email: adminUserData.email,
      },
    });
    if (existUser) {
      throw new Error("User email already exist");
    }
    const resData = await fetch(
      `${config.better_auth_url}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: config.frontend_url,
        },
        body: JSON.stringify(adminUserData),
      },
    );

    const data = await resData.json();
    const updateUser = await prisma.user.update({
      where: {
        id: data.user.id,
      },
      data: {
        role: USER_ROLES.ADMIN,
        emailVerified: true,
      },
    });
    console.log("Admin Created successfully", updateUser);
  } catch (error) {
    console.log(error);
  }
};
seedAdmin();
