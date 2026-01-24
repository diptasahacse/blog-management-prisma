import { prisma } from "../../lib/prisma";
import { ICategoryRequest } from "./category.interface";

const getById = async (id: string) => {
  try {
    return await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

const create = async (data: ICategoryRequest) => {
  try {
    return prisma.category.create({
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

const categoryService = {
  create,
  getById,
};
export default categoryService;
