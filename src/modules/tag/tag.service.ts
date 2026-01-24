import { prisma } from "../../lib/prisma";
import { ITagRequest } from "./tag.interface";

const getById = async (id: string) => {
  try {
    return await prisma.tag.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

const create = async (data: ITagRequest) => {
  try {
    return prisma.tag.create({
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

const tagService = {
  create,
  getById,
};
export default tagService;
