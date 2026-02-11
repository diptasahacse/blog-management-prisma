import { prisma } from "../../lib/prisma";

const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const userService = {
  getUserById,
};

export default userService;
