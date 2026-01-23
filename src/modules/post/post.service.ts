import { prisma } from "../../lib/prisma";
import { ICreatePost } from "./post.interface";

export const create = async (data: ICreatePost) => {
  const { content, title, thumbnail, status, owner_id } = data;
  try {
    return await prisma.post.create({
      data: {
        content,
        title,
        ...(thumbnail ? { thumbnail } : {}),
        ...(status ? { status } : {}),
        owner_id,
      },
    });
  } catch (error) {
    throw error;
  }
};
const postService = {
  create,
};
