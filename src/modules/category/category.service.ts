import { CategoryWhereInput } from "../../../generated/prisma/models";
import { paginationSortingHelper } from "../../helpers/paginationSortingHelper";
import { prisma } from "../../lib/prisma";
import { CommonSortFields } from "../../types/sorting";
import { ICategoriesQuery, ICategoryRequest } from "./category.interface";

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

const getCategories = async (data: ICategoriesQuery) => {
  try {
    const { id, limit, name, page, sort_by, sort_order, search, slug } = data;
    const andConditions: CategoryWhereInput[] = [];
    if (id) {
      andConditions.push({
        id: {
          contains: id,
        },
      });
    }
    if (name) {
      andConditions.push({
        name: {
          contains: name,
        },
      });
    }
    if (slug) {
      andConditions.push({
        slug: {
          contains: slug,
        },
      });
    }
    if (search) {
      andConditions.push({
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            slug: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      });
    }
    const total = await prisma.category.count({
      where: {
        AND: andConditions,
      },
    });
    const paginationSortData = paginationSortingHelper({
      allowedFields: Object.values(CommonSortFields),
      defaultSortBy: CommonSortFields.CREATED_AT,
      sort_by,
      sort_order,
      limit,
      page,
    });
console.log(andConditions)
    return {
      data: await prisma.category.findMany({
        where: {
          AND: andConditions,
        },
        orderBy: {
          [paginationSortData.sort_by]: paginationSortData.sort_order,
        },
        take: paginationSortData.take,
        skip: paginationSortData.skip,
      }),
      pagination: {
        total: total,
        limit: paginationSortData.take,
        page: paginationSortData.page,
      },
    };
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
  getCategories,
};
export default categoryService;
